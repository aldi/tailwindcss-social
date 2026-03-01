import { cache } from 'react';
import { getSingletonHighlighter } from 'shiki';
import CopyButton from './CopyButton';

const getHighlighter = cache(async () => {
  return getSingletonHighlighter({
    themes: ['github-dark'],
    langs: ['html', 'bash', 'javascript', 'scss'],
  });
});

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export default async function CodeBlock({ children, className, language = "html" }) {
  let highlightedCode;
  const code = typeof children === 'string' ? children : String(children ?? '');
  
  try {
    const highlighter = await getHighlighter();
    highlightedCode = highlighter.codeToHtml(code, {
      lang: language,
      theme: 'github-dark',
    });
  } catch (error) {
    console.error("Shiki highlighting error:", error);
    highlightedCode = `<pre><code>${escapeHtml(code)}</code></pre>`;
  }

  return (
    <figure className={`highlight ${className || ""}`}>
      <CopyButton code={code} />
      <div
        className="shiki-wrapper"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </figure>
  );
}
