import fs from 'node:fs';
const env=fs.readFileSync('/Users/joyboy/Documents/WARWIKI/warwiki/.env','utf8');
const KEY=env.match(/^YT_API_KEY=(.*)$/m)[1].trim().replace(/^["']|["']$/g,'');
const ids=JSON.parse(fs.readFileSync('ids.json'));
const out={};
for(let i=0;i<ids.length;i+=50){
  const u=new URL('https://www.googleapis.com/youtube/v3/videos');
  u.searchParams.set('key',KEY);u.searchParams.set('part','snippet');u.searchParams.set('id',ids.slice(i,i+50).join(','));
  const r=await fetch(u); if(!r.ok){console.error(r.status,await r.text());process.exit(1)}
  const d=await r.json();
  for(const v of d.items) out[v.id]={title:v.snippet.title,channel:v.snippet.channelTitle,description:v.snippet.description,tags:v.snippet.tags??[]};
}
fs.writeFileSync('meta.json',JSON.stringify(out,null,1));
console.log(Object.keys(out).length,'of',ids.length);
