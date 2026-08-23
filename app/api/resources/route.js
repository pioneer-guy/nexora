import {NextResponse} from 'next/server';

const resources=[
  {career:'Data Analyst',skill:'SQL',title:'SQL Fundamentals',description:'Queries, filtering, joins, and aggregation.',source:'PostgreSQL Documentation',url:'https://www.postgresql.org/docs/current/tutorial-sql.html',type:'Documentation',difficulty:'Foundation'},
  {career:'Data Analyst',skill:'Python',title:'Python Data Analysis',description:'Use pandas to inspect, clean, and analyze data.',source:'pandas Documentation',url:'https://pandas.pydata.org/docs/getting_started/intro_tutorials/',type:'Documentation',difficulty:'Foundation'},
  {career:'Data Analyst',skill:'Statistics',title:'OpenIntro Statistics',description:'An open textbook covering core statistical reasoning.',source:'OpenIntro',url:'https://www.openintro.org/book/os/',type:'Open textbook',difficulty:'Foundation'},
  {career:'Data Analyst',skill:'Visualization',title:'Data Visualization',description:'Build clear, honest charts and communicate findings.',source:'Observable Plot Documentation',url:'https://observablehq.com/plot/',type:'Documentation',difficulty:'Applied'},
  {career:'Data Analyst',skill:'Projects',title:'Public Datasets',description:'Practice analysis with openly available datasets.',source:'U.S. Government Open Data',url:'https://data.gov/',type:'Public datasets',difficulty:'Applied'}
];

export async function GET(req){
  const career=new URL(req.url).searchParams.get('career');
  return NextResponse.json({resources:career?resources.filter(resource=>resource.career===career):resources});
}
