import {NextResponse} from 'next/server';
import {generateAIResponse,parseAIJson} from '../../../lib/ai/provider';

const jobs=[
  {role:'AI / ML Engineer',demandIndicator:'Rising',geography:'Global'},
  {role:'Cybersecurity Analyst',demandIndicator:'Rising',geography:'Global'},
  {role:'Cloud / DevOps Engineer',demandIndicator:'High',geography:'Global'},
  {role:'Data Analyst',demandIndicator:'High',geography:'Global'},
  {role:'Music Producer',demandIndicator:'Growing',geography:'Global'},
  {role:'Sound Designer',demandIndicator:'Growing',geography:'Global'},
  {role:'UI/UX Designer',demandIndicator:'Steady',geography:'Global'},
  {role:'Digital Marketing Specialist',demandIndicator:'Steady',geography:'Global'}
];

export async function GET(req){
  const data={source:'Prototype Snapshot',lastUpdated:'2026-08-22',isLive:false,notice:'Market Pulse — Prototype Snapshot. Configure a verified market data provider for live demand.',jobs};
  if(new URL(req.url).searchParams.get('summarize')!=='1')return NextResponse.json(data);
  const response=await generateAIResponse({messages:[{role:'system',content:'Summarize why these roles may be trending based only on the supplied snapshot. Do not invent live statistics. Return JSON: {"summary":"string"}.'},{role:'user',content:JSON.stringify(jobs)}],temperature:.3});
  return NextResponse.json({...data,summary:parseAIJson(response)?.summary||response.text,mode:response.mode});
}