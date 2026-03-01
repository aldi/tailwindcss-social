import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import CodeBlock from '@/components/CodeBlock';
import DocsCallout from '@/components/DocsCallout';
import Link from 'next/link';

export const metadata = {
  title: 'Modularity - TailwindCSS-Social Docs',
};

export default function ModularityPage() {
  const breadcrumbItems = [
    { label: 'TailwindCSS-Social', href: '/' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Modularity', active: true },
  ];

  return (
    <>
      <Hero title="Modularity" subtitle="Import only the standalone CSS files you use" />
      <section className="section py-12 px-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap -mx-3">
            <div className="px-3 w-full lg:w-11/12 lg:mx-auto">
              <Breadcrumb items={breadcrumbItems} />
              <div className="my-4">
                <p className="docs-text-muted text-lg">
                  This page covers <strong>standalone CSS mode</strong>. Instead of
                  loading <code>css/all.min.css</code>, import only the provider files
                  your UI actually uses.
                </p>
                <p className="docs-text-muted text-lg mt-2">
                  Use this package path pattern:
                </p>
              </div>
              <CodeBlock language="javascript">{`import 'tailwindcss-social/css/single/<provider>/<provider>.min.css';`}</CodeBlock>
              <p className="docs-text-muted text-lg mt-4">Example imports:</p>
              <CodeBlock language="javascript">{`import 'tailwindcss-social/css/single/github/github.min.css';
import 'tailwindcss-social/css/single/linkedin/linkedin.min.css';
import 'tailwindcss-social/css/single/youtube/youtube.min.css';`}</CodeBlock>
              <p className="docs-text-muted text-lg mt-4">
                Or use the same pattern from a <strong>CDN</strong>:
              </p>
              <CodeBlock language="html">{`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss-social@1/css/single/<provider>/<provider>.min.css">`}</CodeBlock>
              <p className="docs-text-muted text-lg mt-4">Example CDN links:</p>
              <CodeBlock language="html">{`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss-social@1/css/single/github/github.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss-social@1/css/single/linkedin/linkedin.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss-social@1/css/single/youtube/youtube.min.css">`}</CodeBlock>
              <p className="docs-text-muted text-base mt-4">
                Need provider codes?{' '}
                <Link className="docs-inline-link" href="/docs/providers">
                  Browse all providers
                </Link>
                .
              </p>
              <hr className="docs-divider my-6" />
              <DocsCallout
                title="Need multiple providers in one file?"
                description="Build a custom CSS bundle with only the providers you need."
                href="/docs/customization"
                ctaLabel="Explore Customization"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
