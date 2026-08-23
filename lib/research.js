const cache=new Map();
const cacheMs=Number(process.env.CAREER_RESEARCH_CACHE_MS||3600000);

function cleanQuery(query){return query.toLowerCase().replace(/\b(bhai|please|kya|ka|ki|ke|banna|banne|bata|batao|h|hai|want|become|career|job|roadmap)\b/g,' ').replace(/\s+/g,' ').trim()}

async function wikiSearch(query){
  const response=await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=4&format=json&origin=*`,{headers:{accept:'application/json'},signal:AbortSignal.timeout(10000)});
  if(!response.ok)throw new Error('Search provider unavailable.');
  const data=await response.json();
  return (data.query?.search||[]).slice(0,3).map(item=>({title:item.title,snippet:item.snippet.replace(/<[^>]+>/g,'')}));
}

async function wikiSummary(title){
  const response=await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,{headers:{accept:'application/json'},signal:AbortSignal.timeout(10000)});
  if(!response.ok)return null;
  const data=await response.json();
  return data.extract?{title:data.title,description:data.extract,url:data.content_urls?.desktop?.page||`https://en.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g,'_'))}`}:null;
}

export async function researchCareer(query){
  const key=cleanQuery(query)||query.trim().toLowerCase();
  const cached=cache.get(key);
  if(cached&&cached.expiresAt>Date.now())return {...cached,value:{...cached.value,cached:true}};
  const results=await wikiSearch(key);
  const summaries=(await Promise.all(results.map(result=>wikiSummary(result.title)))).filter(Boolean);
  const value={query,researchedAt:new Date().toISOString(),sources:summaries.map(source=>({title:source.title,source:'Wikipedia',url:source.url,description:source.description}))};
  cache.set(key,{value,expiresAt:Date.now()+cacheMs});
  return value;
}
