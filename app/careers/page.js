'use client';
import {useState} from 'react';
import Link from 'next/link';
import {careers,searchCareers} from '../../lib/careers';

export default function Careers(){
  const [query,setQuery]=useState('');
  const results=query.trim()?searchCareers(query):careers;
  return <><nav><Link className="logo" href="/">NEX<span>ORA</span></Link><div className="links"><Link href="/careers">Careers</Link><Link href="/trending">Trending</Link><Link href="/journey">My Journey</Link><Link href="/proofwork">ProofWork</Link></div></nav><main className="workspace"><Link className="back" href="/">← Back home</Link><small>CAREER MAP</small><h1>Find work worth <i>learning.</i></h1><p className="lead left">Search roles by title, skill, category, or the kind of work you want to do.</p><div className="careerSearch"><span>⌕</span><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search music, design, Python, data..." aria-label="Search the career map"/></div><div className="careerDirectory">{results.map(career=><Link className="directoryItem" href={`/careers/${career.slug}`} key={career.slug}><small>{career.category}</small><h2>{career.title}</h2><p>{career.description}</p><span>{career.skills.slice(0,3).join(' · ')} →</span></Link>)}</div>{!results.length&&<div className="emptySearch"><h3>No matching careers yet.</h3><p>Try a broader role, skill, or category.</p></div>}</main><footer><div><b>NEX<span>ORA</span></b><p>Know the path. Prove the skill.</p></div><div><small>ABOUT NEXORA</small><p>Created by ABHI RAI</p><p>Career intelligence · learning paths · skill proof · market signals</p></div></footer></>;
}