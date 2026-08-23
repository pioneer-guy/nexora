import {NextResponse} from 'next/server';
import {generateAIResponse,parseAIJson} from '../../../lib/ai/provider';
import {understandIntent} from '../../../lib/intent';

export async function POST(req){
  try{
    const {message,career='Data Analyst',skills=[]}=await req.json();
    if(!message?.trim())return NextResponse.json({error:'Ask a NEXORA career question.'},{status:400});
    const intent=understandIntent({message,career,skills,currentPage:'ai'});
    if(intent.needsClarification)return NextResponse.json({intent,clarification:'Python ke baare mein kya chahiye — learning roadmap, project idea, ya assessment?'},{status:200});
    const prompt=`You are NEXORA, an evidence-based career assistant. Stay strictly within the user's selected context: ${career}. Discuss only career skills, roadmap, learning, projects, assessments, or resume evidence. Politely redirect unrelated requests back to ${career}. Respond naturally in the user's language (${intent.language}). Return JSON: {"answer":"string","suggestedNextStep":"string"}. Intent: ${JSON.stringify(intent)}. User skills: ${skills.join(', ')||'not provided'}. Original user question: ${message.trim()}`;
    const response=await generateAIResponse({messages:[{role:'system',content:prompt}],temperature:.4});
    const result=parseAIJson(response);
    if(response.mode==='demo')return NextResponse.json({mode:'demo',message:response.text},{status:200});
    if(!result)throw Error('Invalid AI response.');
    return NextResponse.json(result);
  }catch{return NextResponse.json({error:'AI service temporarily unavailable. Try again.'},{status:503})}
}
