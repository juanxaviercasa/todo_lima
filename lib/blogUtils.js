export function formatBlogDate(value) {
  return new Intl.DateTimeFormat('es-PE',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(value+'T12:00:00Z'));
}
export function filterPosts(posts, {query='',category='',tag=''} = {}) {
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  return posts.filter(p => (!category || p.category === category) && (!tag || p.tags.includes(tag)) && normalize(p.title+' '+p.description).includes(normalize(query)));
}
export function paginatePosts(posts, page=1, size=6) {
  if(!Number.isInteger(size)||size<1)throw new Error('Invalid page size');
  const count = Math.max(1, Math.ceil(posts.length/size));
  const current = Math.max(1, Math.min(Number.isInteger(page)?page:1,count));
  return {items:posts.slice((current-1)*size,current*size),count,current};
}
