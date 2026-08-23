const definitions = [
  ['software-developer','Software Developer','Build reliable products and systems.','Technology',['Programming','Data structures','Git','APIs'],['VS Code','GitHub','Postman']],
  ['data-analyst','Data Analyst','Turn raw information into decisions.','Technology',['SQL','Statistics','Python','Visualization'],['Excel','SQL','Power BI']],
  ['data-scientist','Data Scientist','Use data, models, and experiments to answer hard questions.','Technology',['Python','Statistics','Machine learning','SQL'],['Jupyter','pandas','scikit-learn']],
  ['ai-ml-engineer','AI / ML Engineer','Turn machine learning ideas into useful systems.','Technology',['Python','Machine learning','APIs','MLOps'],['Python','PyTorch','Docker']],
  ['cybersecurity-analyst','Cybersecurity Analyst','Protect systems by finding and responding to threats.','Technology',['Networking','Linux','Threat analysis','Incident response'],['Linux','Wireshark','SIEM']],
  ['cloud-engineer','Cloud Engineer','Design and operate scalable cloud infrastructure.','Technology',['Linux','Networking','Cloud','Infrastructure as code'],['AWS','Terraform','Docker']],
  ['devops-engineer','DevOps Engineer','Make software delivery faster, safer, and repeatable.','Technology',['Linux','CI/CD','Containers','Observability'],['GitHub Actions','Docker','Kubernetes']],
  ['ui-ux-designer','UI/UX Designer','Shape digital experiences around real user needs.','Design',['Research','Wireframing','Interaction design','Accessibility'],['Figma','FigJam','Maze']],
  ['product-manager','Product Manager','Connect customer problems, strategy, and delivery.','Business',['User research','Prioritization','Analytics','Communication'],['Notion','Jira','Figma']],
  ['digital-marketing-specialist','Digital Marketing Specialist','Grow useful products through measurable channels.','Business',['SEO','Content','Analytics','Campaign planning'],['Google Analytics','Search Console','Mailchimp']],
  ['financial-analyst','Financial Analyst','Turn financial information into sound decisions.','Business',['Financial modeling','Excel','Accounting','Communication'],['Excel','Google Sheets','Power BI']],
  ['business-analyst','Business Analyst','Translate business needs into clearer processes and solutions.','Business',['Requirements','Process mapping','SQL','Documentation'],['Jira','Miro','SQL']],
  ['content-writer','Content Writer','Make complex ideas useful, clear, and engaging.','Creative',['Research','Writing','Editing','Audience strategy'],['Google Docs','Notion','CMS']],
  ['technical-writer','Technical Writer','Help people use products through precise documentation.','Creative',['Information architecture','Editing','Product knowledge','Empathy'],['Markdown','Git','Docs platforms']],
  ['video-editor','Video Editor','Shape footage, sound, and pacing into a story.','Creative',['Storytelling','Editing','Audio','Color'],['Premiere Pro','DaVinci Resolve','After Effects']],
  ['graphic-designer','Graphic Designer','Communicate ideas through visual systems and composition.','Design',['Typography','Layout','Color','Visual identity'],['Figma','Illustrator','Photoshop']],
  ['motion-designer','Animation / Motion Designer','Bring visual ideas to life through movement.','Design',['Timing','Composition','Storyboarding','Design systems'],['After Effects','Blender','Figma']],
  ['game-developer','Game Developer','Build interactive worlds, systems, and play experiences.','Creative',['Programming','Game systems','Debugging','Level design'],['Unity','Godot','Git']],
  ['game-designer','Game Designer','Design rules, challenge, and player experience.','Creative',['Systems thinking','Prototyping','Playtesting','Narrative'],['Unity','Miro','Figma']],
  ['music-producer','Music Producer','Turn musical ideas into arranged, recorded, finished tracks.','Creative',['Arrangement','Recording','Mixing','Sound design'],['Ableton Live','Logic Pro','FL Studio']],
  ['songwriter','Songwriter','Develop lyrics, melody, and structure with intention.','Creative',['Lyrics','Melody','Structure','Collaboration'],['Logic Pro','Ableton Live','Spreadsheets']],
  ['composer','Composer','Write music for scenes, performances, or interactive experiences.','Creative',['Harmony','Orchestration','Notation','Storytelling'],['Sibelius','MuseScore','Logic Pro']],
  ['recording-engineer','Recording Engineer','Capture performances with clarity, character, and technical control.','Creative',['Microphones','Signal flow','Acoustics','Session workflow'],['Pro Tools','Logic Pro','Console']],
  ['mixing-engineer','Mixing Engineer','Shape recorded tracks into balanced, expressive mixes.','Creative',['Balance','EQ','Compression','Spatial audio'],['Pro Tools','Ableton Live','Waves']],
  ['mastering-engineer','Mastering Engineer','Prepare finished music for consistent release across platforms.','Creative',['Critical listening','Dynamics','Loudness','Delivery formats'],['Sequoia','iZotope RX','Pro Tools']],
  ['sound-designer','Sound Designer','Create and edit sound for film, games, products, and experiences.','Creative',['Foley','Synthesis','Editing','Storytelling'],['Ableton Live','Reaper','Native Instruments']],
  ['audio-engineer','Audio Engineer','Design dependable recording and playback systems for productions.','Creative',['Signal flow','Live sound','Acoustics','Troubleshooting'],['Yamaha consoles','Dante','Pro Tools']],
  ['music-director','Music Director','Lead musical direction, rehearsal, and performance decisions.','Creative',['Rehearsal','Leadership','Arrangement','Performance'],['Logic Pro','MuseScore','Notation tools']],
  ['orchestrator','Orchestrator','Adapt musical ideas for ensembles, instruments, and performance.','Creative',['Instrumentation','Score reading','Arrangement','Notation'],['Dorico','Sibelius','MuseScore']],
  ['lyricist','Lyricist','Craft words, imagery, rhythm, and emotional point of view for songs.','Creative',['Wordcraft','Rhyme','Meter','Storytelling'],['Google Docs','Notion','Voice memos']],
  ['vocal-producer','Vocal Producer','Guide vocal performance, comping, tuning, and expressive delivery.','Creative',['Performance coaching','Comping','Pitch','Arrangement'],['Melodyne','Logic Pro','Pro Tools']],
  ['film-score-composer','Film Score Composer','Write music that supports picture, emotion, pacing, and narrative.','Creative',['Picture spotting','Orchestration','Themes','Timing'],['Cubase','Logic Pro','Dorico']],
  ['game-audio-designer','Game Audio Designer','Build interactive music and sound systems for games.','Creative',['Interactive audio','Middleware','Sound design','Implementation'],['FMOD','Wwise','Unity']],
  ['music-supervisor','Music Supervisor','Curate and clear music that strengthens visual storytelling.','Creative',['Curation','Licensing','Briefs','Negotiation'],['Music libraries','Spreadsheets','Rights platforms']],
  ['artist-manager','Artist Manager','Help artists plan sustainable creative careers and releases.','Creative',['Planning','Communication','Negotiation','Release strategy'],['Notion','Spreadsheets','Analytics']],
  ['a-and-r-manager','A&R Manager','Discover artists, develop their work, and connect it to audiences.','Creative',['Talent scouting','Feedback','Industry knowledge','Networking'],['Streaming platforms','CRM','Spreadsheets']],
  ['music-marketer','Music Marketing Specialist','Build campaigns that help music reach the right listeners.','Creative',['Audience strategy','Content','Analytics','Campaigns'],['Meta Ads','TikTok','Spotify for Artists']],
  ['music-publisher','Music Publisher','Support songwriting rights, licensing, and creative opportunities.','Creative',['Copyright','Licensing','Catalog management','Relationships'],['Rights databases','Spreadsheets','PRO portals']],
  ['concert-producer','Concert Producer','Plan the creative, technical, and operational delivery of live shows.','Creative',['Production planning','Budgets','Vendors','Risk management'],['Production schedules','Budgets','Ticketing platforms']],
  ['dj','DJ','Select, mix, and read music for a live audience or broadcast.','Creative',['Beatmatching','Music selection','Crowd reading','Transitions'],['Rekordbox','Serato','Traktor']],
  ['music-teacher','Music Teacher','Help learners build musical understanding, technique, and confidence.','Creative',['Pedagogy','Technique','Listening','Feedback'],['Notation software','DAWs','Video calls']],
  ['music-journalist','Music Journalist','Research and communicate meaningful stories about music and culture.','Creative',['Interviewing','Research','Critical writing','Editing'],['CMS','Audio recorder','Google Docs']]
];
export const careers = definitions.map(([slug,title,description,category,skills,tools]) => ({
  slug, title, description, category, skills, tools,
  beginner: ['Learn the fundamentals','Practice with small briefs','Share work for feedback'],
  responsibilities: ['Solve role-specific problems','Communicate decisions and tradeoffs','Create evidence through repeatable work'],
  stages: ['Understand','Learn','Practice','Build','Prove'].map((stage,index) => ({
    stage,
    topics: index === 0 ? skills.slice(0,2) : index === 1 ? skills.slice(2).concat(tools[0]) : index === 2 ? ['Guided exercises','Feedback and iteration'] : index === 3 ? ['A portfolio-ready project'] : ['ProofWork skill assessment']
  }))
}));
export const getCareer = slug => careers.find(career => career.slug === slug);
const musicCareerSlugs=new Set(['music-producer','songwriter','composer','recording-engineer','mixing-engineer','mastering-engineer','sound-designer','audio-engineer','music-director','orchestrator','lyricist','vocal-producer','film-score-composer','game-audio-designer','music-supervisor','artist-manager','a-and-r-manager','music-marketer','music-publisher','concert-producer','dj','music-teacher','music-journalist']);
export const searchCareers = query => { const terms=query.toLowerCase().split(/\s+/).filter(Boolean); return careers.map(career=>({career,score:terms.reduce((score,term)=>score+((term==='music'&&musicCareerSlugs.has(career.slug))||[career.title,career.description,career.category,...career.skills,...career.tools].join(' ').toLowerCase().includes(term)?1:0),0)})).filter(item=>item.score).sort((a,b)=>b.score-a.score).map(item=>item.career); };