import {NextResponse} from 'next/server';

const trustedSources = {
  programming: [{title:'MDN Learn Web Development',source:'MDN',url:'https://developer.mozilla.org/en-US/docs/Learn',type:'Documentation'}],
  python: [{title:'Python 3 Tutorial',source:'Python.org',url:'https://docs.python.org/3/tutorial/',type:'Official documentation'}],
  sql: [{title:'SQL Tutorial',source:'PostgreSQL',url:'https://www.postgresql.org/docs/current/tutorial-sql.html',type:'Official documentation'}],
  statistics: [{title:'OpenIntro Statistics',source:'OpenIntro',url:'https://www.openintro.org/book/os/',type:'Open textbook'}],
  machine: [{title:'Machine Learning Crash Course',source:'Google Developers',url:'https://developers.google.com/machine-learning/crash-course',type:'Course'}],
  design: [{title:'Human Interface Guidelines',source:'Apple',url:'https://developer.apple.com/design/human-interface-guidelines/',type:'Guidelines'}],
  marketing: [{title:'Google SEO Starter Guide',source:'Google Search Central',url:'https://developers.google.com/search/docs/fundamentals/seo-starter-guide',type:'Guide'}]
};

function officialResources(topic) {
  const key=topic.toLowerCase();
  const match=Object.keys(trustedSources).find(item=>key.includes(item));
  return trustedSources[match]||[{title:'Google Search Education',source:'Google',url:`https://www.google.com/search?q=${encodeURIComponent(`${topic} official documentation course`)}`,type:'Discovery'}];
}

async function youtubePlaylists(topic,career,language) {
  if(!process.env.YOUTUBE_API_KEY)return [];
  const query=encodeURIComponent(`${career} ${topic} complete course playlist ${language}`);
  const response=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&maxResults=5&order=relevance&q=${query}&key=${process.env.YOUTUBE_API_KEY}`,{next:{revalidate:3600}});
  if(!response.ok)throw new Error('YouTube request failed.');
  const data=await response.json();
  return (data.items||[]).map(item=>({title:item.snippet.title,source:item.snippet.channelTitle,url:`https://www.youtube.com/playlist?list=${item.id.playlistId}`,type:'YouTube playlist',language}));
}

export async function GET(request){
  const params=new URL(request.url).searchParams;
  const topic=params.get('topic')?.trim();
  const career=params.get('career')?.trim()||'career skills';
  const language=params.get('language')?.trim()||'English';
  if(!topic)return NextResponse.json({error:'A learning topic is required.'},{status:400});
  try {
    const playlists=await youtubePlaylists(topic,career,language);
    return NextResponse.json({topic,career,language,resources:officialResources(topic),playlists,live:Boolean(process.env.YOUTUBE_API_KEY),notice:playlists.length?'Playlists are ranked by YouTube relevance. Review the creator and syllabus before starting.':'Add YOUTUBE_API_KEY to discover current YouTube playlists. Trusted reading is still available.'},{headers:{'Cache-Control':'public, s-maxage=3600, stale-while-revalidate=86400'}});
  } catch {
    return NextResponse.json({topic,career,language,resources:officialResources(topic),playlists:[],live:false,notice:'YouTube data is temporarily unavailable. Trusted reading is still available.'},{status:200});
  }
}