import {generateGeminiJson} from '../gemini.js';

const groqUrl=process.env.GROQ_API_URL||'https://api.groq.com/openai/v1/chat/completions';
const cooldownMs=Number(process.env.AI_PROVIDER_COOLDOWN_MS||30000);
const health={groq:{until:0},gemini:{until:0}};

function retryable(error){
  const status=error.status||0;
  const message=String(error.message||error).toLowerCase();
  return status===408||status===429||status>=500||/quota|rate.?limit|timeout|network|unavailable|temporar|fetch failed/.test(message);
}
function logFailure(provider,error,next){
  const reason=error.reason||(/quota|rate.?limit/.test(String(error.message).toLowerCase())?'rate_limit':retryable(error)?'temporary_failure':'provider_error');
  console.warn(`[NEXORA AI] Provider: ${provider} Status: failed Reason: ${reason} Fallback: ${next}`);
}
function markCooldown(provider,error){if(retryable(error))health[provider].until=Date.now()+cooldownMs}

async function callGroq(messages,temperature){
  if(!process.env.GROQ_API_KEY)throw Object.assign(new Error('Groq key unavailable.'),{reason:'unavailable'});
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),30000);
  try{
    const response=await fetch(groqUrl,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.GROQ_API_KEY}`},signal:controller.signal,body:JSON.stringify({model:process.env.GROQ_MODEL||'llama-3.3-70b-versatile',temperature,response_format:{type:'json_object'},messages})});
    const data=await response.json();
    if(!response.ok)throw Object.assign(new Error(data?.error?.message||'Groq request failed.'),{status:response.status});
    return {text:data?.choices?.[0]?.message?.content||'',usage:data?.usage||{}};
  }catch(error){if(error.name==='AbortError')throw Object.assign(new Error('Groq request timed out.'),{reason:'timeout'});throw error}finally{clearTimeout(timer)}
}

async function callGemini(messages,temperature){
  if(!process.env.GEMINI_API_KEY)throw Object.assign(new Error('Gemini key unavailable.'),{reason:'unavailable'});
  const prompt=messages.map(message=>`${message.role.toUpperCase()}: ${message.content}`).join('\n\n');
  const data=await generateGeminiJson(prompt,{temperature});
  return {text:JSON.stringify(data),usage:{}};
}

export async function generateAIResponse({messages,prompt,temperature=.4,demoText='AI services are temporarily unavailable. Demo mode is active.'}={}){
  const normalizedMessages=messages||[{role:'user',content:prompt||''}];
  const providers=[['Groq', 'groq', callGroq],['Gemini','gemini',callGemini]];
  let lastError;
  for(let index=0;index<providers.length;index++){
    const [label,name,call]=providers[index];
    if(health[name].until>Date.now())continue;
    try{
      const response=await call(normalizedMessages,temperature);
      return {provider:name,text:response.text,usage:response.usage,fallbackUsed:index>0};
    }catch(error){
      lastError=error;
      markCooldown(name,error);
      if(index<providers.length-1){logFailure(label,error,providers[index+1][0]);continue}
      logFailure(label,error,'none');
    }
  }
  return {provider:null,text:demoText,usage:{},fallbackUsed:true,mode:'demo',error:lastError?.message||'No AI provider available.'};
}

export function parseAIJson(response){
  try{return JSON.parse(response.text)}catch{return null}
}
