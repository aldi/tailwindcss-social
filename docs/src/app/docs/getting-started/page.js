import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import CodeBlock from '@/components/CodeBlock';
import DocsCallout from '@/components/DocsCallout';

export const metadata = {
  title: "Getting Started - TailwindCSS-Social Docs",
};

export default function StartPage() {
  const breadcrumbItems = [
    { label: "TailwindCSS-Social", href: "/" },
    { label: "Documentation", href: "/docs" },
    { label: "Getting Started", active: true },
  ];

  return (
    <>
      <Hero title="Getting Started" subtitle="Use as a Tailwind plugin or standalone CSS" />
      <section className="section py-12 px-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap -mx-3">
            <div className="px-3 w-full lg:w-11/12 lg:mx-auto">
              <Breadcrumb items={breadcrumbItems} />
              <p className="docs-text-muted text-lg my-4">
                Install once, then choose your preferred integration mode:
              </p>

              <article className="flex gap-4 mb-6">
                <div className="flex-shrink-0">
                  <p className="docs-text-strong text-xl font-semibold">1</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="docs-text-strong text-xl font-semibold">
                    Install with your package manager <em>(npm default)</em>:
                  </p>
                  <div className="highlight-full header-code mt-2">
                    <CodeBlock language="bash">
                      {`npm install tailwindcss-social
pnpm add tailwindcss-social
yarn add tailwindcss-social
bun add tailwindcss-social`}
                    </CodeBlock>
                  </div>
                </div>
              </article>

              <article className="flex gap-4 mb-6">
                <div className="flex-shrink-0">
                  <p className="docs-text-strong text-xl font-semibold">2</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="docs-text-strong text-xl font-semibold">
                    Use as a <strong>Tailwind plugin</strong>:
                  </p>
                  <div className="mt-2">
                    <CodeBlock language="javascript">{`import tailwindcssSocial from 'tailwindcss-social';

export default {
  plugins: [tailwindcssSocial()],
};`}</CodeBlock>
                  </div>
                  <p className="docs-text-muted text-base mt-3 mb-2">
                    Limit output to selected providers:
                  </p>
                  <CodeBlock language="javascript">{`import tailwindcssSocial from 'tailwindcss-social';

export default {
  plugins: [
    tailwindcssSocial({
      providers: ['github', 'linkedin', 'youtube'],
    }),
  ],
};`}</CodeBlock>
                </div>
              </article>

              <article className="flex gap-4 mb-6">
                <div className="flex-shrink-0">
                  <p className="docs-text-strong text-xl font-semibold">3</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="docs-text-strong text-xl font-semibold">
                    Use as <strong>standalone CSS</strong> with npm imports:
                  </p>
                  <div className="mt-2">
                    <CodeBlock language="javascript">{`import 'tailwindcss-social/css/all.min.css';

// Or import only specific providers:
import 'tailwindcss-social/css/single/github/github.min.css';
import 'tailwindcss-social/css/single/linkedin/linkedin.min.css';`}</CodeBlock>
                  </div>
                </div>
              </article>

              <article className="flex gap-4 mb-6">
                <div className="flex-shrink-0">
                  <p className="docs-text-strong text-xl font-semibold">4</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="docs-text-strong text-xl font-semibold">
                    Use the{" "}
                    <a
                      className="docs-inline-link"
                      href="https://www.jsdelivr.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      jsDelivr
                    </a>{" "}
                    <strong>CDN</strong>
                    <br />
                    <a
                      className="docs-inline-link"
                      href="https://www.jsdelivr.com/package/npm/tailwindcss-social"
                    >
                      https://www.jsdelivr.com/package/npm/tailwindcss-social
                    </a>
                  </p>
                  <div className="mt-2">
                    <CodeBlock language="html">{`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss-social@1/css/all.min.css">`}</CodeBlock>
                  </div>
                </div>
              </article>

              <article className="flex gap-4 mb-6">
                <div className="flex-shrink-0">
                  <p className="docs-text-strong text-xl font-semibold">5</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="docs-text-strong text-xl font-semibold">
                    Download from the <strong>repository</strong>
                    <br />
                    <a
                      className="docs-inline-link"
                      href="https://github.com/aldi/tailwindcss-social/tree/main/css"
                    >
                      https://github.com/aldi/tailwindcss-social/tree/main/css
                    </a>
                  </p>
                </div>
              </article>

              <hr className="docs-divider my-6" />

              <div className="docs-info-banner overflow-hidden mb-6">
                <div className="docs-info-banner-title px-4 py-2 font-semibold">Font Awesome icons</div>
                <div className="docs-info-banner-body border border-t-0 px-4 py-3">
                  <p>
                    To display icons, include{" "}
                    <a className="docs-inline-link" href="https://fontawesome.com">
                      Font Awesome 7
                    </a>:
                  </p>
                  <div className="highlight-full header-code mt-2">
                    <CodeBlock language="html">{`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/css/all.min.css">`}</CodeBlock>
                  </div>
                </div>
              </div>

              <hr className="docs-divider my-6" />

              <p className="docs-text-strong text-3xl font-bold pt-5">Starter Template</p>
              <p className="docs-text-muted text-lg mt-2 mb-4">
                Copy this template to start right away:
              </p>
              <div className="bd-snippet highlight-full header-code">
                <CodeBlock language="html">{`<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Social Buttons and Colors for TailwindCSS!</title>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>
<!-- Your preferred icon library here -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/css/all.min.css">
<!-- Import all social provider styles from TailwindCSS-Social -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss-social@1/css/all.min.css">
</head>`}</CodeBlock>
              </div>

              <hr className="docs-divider my-6" />

              <DocsCallout
                title="Want a smaller bundle?"
                description="Import only the providers you need."
                href="/docs/modularity"
                ctaLabel="Explore Modularity"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
