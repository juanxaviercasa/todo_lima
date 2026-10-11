import Link from 'next/link';

/**
 * Renderiza texto con enlaces markdown [texto](url) y negritas **texto**
 * soportando tanto rutas internas de Next.js como enlaces externos.
 */
export default function AtlasFormattedText({ text }) {
  if (!text) return null;

  // Regex para enlaces markdown [label](url) y negritas **bold**
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  const elements = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(
        <span key={`txt-${key++}`}>
          {text.substring(lastIndex, match.index)}
        </span>
      );
    }

    if (match[1] && match[2]) {
      const label = match[1];
      const url = match[2];
      const isInternal = url.startsWith('/') || url.startsWith('#');

      if (isInternal) {
        elements.push(
          <Link
            key={`link-${key++}`}
            href={url}
            className="text-sky-600 dark:text-sky-400 font-semibold underline underline-offset-2 hover:text-sky-800 dark:hover:text-sky-300 transition-colors"
          >
            {label}
          </Link>
        );
      } else {
        elements.push(
          <a
            key={`ext-${key++}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 dark:text-sky-400 font-semibold underline underline-offset-2 hover:text-sky-800 dark:hover:text-sky-300 transition-colors"
          >
            {label}
          </a>
        );
      }
    } else if (match[3]) {
      elements.push(
        <strong key={`bld-${key++}`} className="font-bold text-slate-900 dark:text-white">
          {match[3]}
        </strong>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(
      <span key={`txt-end-${key++}`}>
        {text.substring(lastIndex)}
      </span>
    );
  }

  return <>{elements}</>;
}
