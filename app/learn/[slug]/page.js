import {Suspense} from 'react';
import LearningClient from './LearningClient';
export default async function LearnPage({params}){return <Suspense fallback={<main className="workspace"><p>Loading learning studio...</p></main>}><LearningClient slug={(await params).slug}/></Suspense>}
