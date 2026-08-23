const model=process.env.GEMINI_MODEL||'gemini-3.6-flash';
const baseUrl=process.env.GEMINI_API_URL||'https://generativelanguage.googleapis.com/v1beta/models';

export async function generateGeminiJson(prompt,{temperature=.4,timeoutMs=30000}={}){
  if(!process.env.GEMINI_API_KEY)throw new Error('Gemini API key is not configured.');
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),timeoutMs);
  try{
    const response=await fetch(`${baseUrl}/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature,responseMimeType:'application/json'}})});
    const data=await response.json();
    if(response.status===429)throw new Error('Gemini rate limit reached.');
    if(!response.ok)throw new Error(data?.error?.message||'Gemini request failed.');
    const text=data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if(!text)throw new Error('Gemini returned an empty response.');
    try{return JSON.parse(text)}catch{throw new Error('Gemini returned invalid JSON.')}
  }catch(error){if(error.name==='AbortError')throw new Error('Gemini request timed out.');throw error}
  finally{clearTimeout(timeout)}
}
