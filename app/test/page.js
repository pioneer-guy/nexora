import {Suspense} from 'react';
import TopicTestClient from './TopicTestClient';

export default function TopicTest(){
  return <Suspense fallback={<main className="workspace topicTest"><p>Loading skill check...</p></main>}><TopicTestClient /></Suspense>;
}
