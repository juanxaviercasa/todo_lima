import BlogImage from './BlogImage.js';
import BlogTable from './BlogTable.js';
function inline(text) {
  return text.split(/(\[[^\]]+\]\((?:https?:\/\/[^\s)]+|\/[^\s)]*)\)|\*\*[^*]+\*\*)/g).map((part,i)=>{
    const link=part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if(link)return <a key={i} href={link[2]} className="text-sky-700 dark:text-sky-300 underline underline-offset-4">{link[1]}</a>;
    if(part.startsWith('**'))return <strong key={i}>{part.slice(2,-2)}</strong>;
    return part;
  });
}
export default function BlogContent({post}) {
  let headingCount=0;
  return <div className="space-y-6 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300">{post.blocks.map((b,i)=>{
    let node;
    if(b.type==='h2'){headingCount++;node=<h2 id={b.id} className="text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white pt-6 scroll-mt-28">{b.text}</h2>;}
    else if(b.type==='h3')node=<h3 id={b.id} className="text-xl font-bold text-slate-950 dark:text-white pt-3 scroll-mt-28">{b.text}</h3>;
    else if(b.type==='table')node=<BlogTable block={b}/>;
    else if(b.type==='ul'||b.type==='ol'){const Tag=b.type;node=<Tag className={(b.type==='ul'?'list-disc':'list-decimal')+' pl-6 space-y-3'}>{b.items.map((x,j)=><li key={j}>{inline(x)}</li>)}</Tag>;}
    else if(b.type==='quote')node=<blockquote className="border-l-4 border-sky-500 bg-sky-50 dark:bg-slate-900 p-6 rounded-r-xl">{inline(b.text)}</blockquote>;
    else node=<p>{inline(b.text)}</p>;
    const image=b.type==='h2'&&[3,6].includes(headingCount)?post.internal[headingCount===3?0:1]:null;
    return <div key={i}>{image&&<div className="mb-8"><BlogImage id={image}/></div>}{node}</div>;
  })}</div>;
}
