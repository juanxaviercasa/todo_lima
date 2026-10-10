import posts from '../data/blog/posts.json';
export * from './blogTaxonomy.js';
export {filterPosts,paginatePosts} from './blogUtils.js';
export const BLOG_POSTS = [...posts].sort((a,b) => b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug));
export function summarizePosts(items) { return items.map(({blocks,...post}) => post); }
