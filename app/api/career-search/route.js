import {NextResponse} from 'next/server';
import {generateAIResponse,parseAIJson} from '../../../lib/ai/provider';
import {researchCareer} from '../../../lib/research';

const schema=`Return only valid JSON with this shape:
{"career":"string","category":"string","summary":"string","whatTheyDo":"string","workEnvironment":"string","commonEmployers":["string"],"responsibilities":["string"],"skills":["string"],"tools":["string"],"educationPath":"string","entryRoutes":["string"],"experienceLevels":["string"],"portfolioRequirements":["string"],"marketInformation":"string","relatedCareers":["string"],"roadmap":[{"level":"FOUNDATION|CORE SKILLS|APPLIED SKILLS|ADVANCED|PORTFOLIO / REAL WORK|PROOFWORK","whatToLearn":"string","whyItMatters":"string","topics":["string"],"practice":"string","miniProject":"string","expectedOutcome":"string"}],"resources":[{"title":"string","source":"string","url":"string","type":"string","relevance":"string","difficulty":"string"}],"projects":["string"],"proofwork":{"competencies":["string"],"task":"string"}}`;
function demo(query,research){return {mode:'demo',message:'Career research is temporarily unavailable.',career:query,summary:'No reliable live profile is available yet.',sources:research?.sources||[]}}

export async function POST(req){
  try{
    const {query}=await req.json();
    if(!query?.trim())return NextResponse.json({error:'Tell me which career to explore.'},{status:400});
    let research;
    try{research=await researchCareer(query)}catch{return NextResponse.json(demo(query,null))}
    const prompt=`You are NEXORA's career intelligence engine. Build a profile for the user's career query using ONLY the supplied research sources. Do not invent current demand, employers, statistics, URLs, or facts not supported by sources. For missing reliable information say "Current information unavailable." Keep the roadmap practical and complete. For comparison or discovery queries, return the relevant careers in relatedCareers and explain differences in summary. ${schema}
USER QUERY: ${query.trim()}
RESEARCH SOURCES: ${JSON.stringify(research.sources)}`;
    const response=await generateAIResponse({messages:[{role:'system',content:prompt}],temperature:.35});
    const result=parseAIJson(response);
    if(response.mode==='demo'||!result)return NextResponse.json(demo(query,research));
    return NextResponse.json({...result,why:result.summary,fit:result.category||'Career profile',path:(result.roadmap||[]).map(stage=>({stage:stage.level,focus:stage.whatToLearn,project:stage.miniProject})),firstStep:result.roadmap?.[0]?.whatToLearn||'Review the researched career profile.',sources:research.sources,researchUpdated:research.researchedAt,cached:Boolean(research.cached)});
  }catch{return NextResponse.json({mode:'demo',message:'Career research is temporarily unavailable.'},{status:200})}
}
