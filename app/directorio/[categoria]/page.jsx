import { permanentRedirect, notFound } from 'next/navigation';
import { getCategory, getDirectory } from '../../../lib/directory.js';
export const dynamicParams = false;
export function generateStaticParams() { return getDirectory().map(c => ({ categoria: c.meta.slug })); }
export default function LegacyCategory({ params }) {
  if (!getCategory(params.categoria)) notFound();
  permanentRedirect(`/${params.categoria}`);
}
