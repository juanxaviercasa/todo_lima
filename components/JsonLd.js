import { serializeSchema } from '../lib/seo.js';
export default function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(data) }} />;
}
