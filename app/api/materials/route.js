import {NextResponse} from 'next/server';
import {generateAIResponse,parseAIJson} from '../../../lib/ai/provider';

export async function GET(req){
	const career=new URL(req.url).searchParams.get('career')||'Data Analyst';
	const response=await generateAIResponse({messages:[{role:'system',content:`For ${career}, return JSON with materials: [{"career":"string","skill":"string","title":"string","description":"string","source":"string","url":"string","type":"string","difficulty":"FOUNDATION|APPLIED|ADVANCED"}]. Use only official documentation, reputable educational resources, open educational resources, or public datasets. Do not invent URLs.`},{role:'user',content:'Return a concise learning-material list.'}],temperature:.2});
	const result=parseAIJson(response);
	if(result)return NextResponse.json({career,source:'AI suggestions require link review',materials:result.materials||[]});
	return NextResponse.json({mode:'demo',message:response.text,materials:[]});
}
