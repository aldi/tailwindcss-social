import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import CodeBlock from '@/components/CodeBlock';
import DocsCallout from '@/components/DocsCallout';

export const metadata = {
  title: 'Customize - TailwindCSS-Social Docs',
};

export default function CustomizePage() {
  const breadcrumbItems = [
    { label: 'TailwindCSS-Social', href: '/' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Customization', active: true },
  ];

  return (
    <>
      <Hero title="Customization" subtitle="Tune provider output, tokens, and generated CSS" />
      <section className="section py-12 px-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap -mx-3">
            <div className="px-3 w-full lg:w-11/12 lg:mx-auto">
              <Breadcrumb items={breadcrumbItems} />
              <div className="my-4">
                <p className="docs-text-muted text-lg mb-3">
                  TailwindCSS-Social is generated from JavaScript source files (no SASS layer).
                </p>
                <ul className="docs-text-muted text-base mb-4 list-disc list-inside">
                  <li className="pb-3">
                    <code>src/providers.js</code> — provider names + HSL source colors
                  </li>
                  <li className="pb-3">
                    <code>src/tokens.js</code> + <code>src/styles.js</code> — derived tokens and class generation
                  </li>
                  <li className="pb-3">
                    <code>scripts/build.js</code> — outputs <code>css/all.min.css</code> and <code>css/single/*</code>
                  </li>
                </ul>
                <p className="docs-text-strong text-3xl font-bold mb-2">Customize in plugin mode</p>
                <p className="docs-text-muted text-lg mb-3">
                  Use the plugin options to emit only the providers you need.
                </p>
                <CodeBlock className="mb-4" language="javascript">{`import tailwindcssSocial from 'tailwindcss-social';

export default {
  plugins: [
    tailwindcssSocial({
      providers: ['github', 'linkedin', 'youtube'],
    }),
  ],
};`}</CodeBlock>

                <p className="docs-text-strong text-3xl font-bold mb-2">Customize in standalone CSS mode</p>
                <p className="docs-text-muted text-lg mb-3">
                  Import the full bundle or only provider files.
                </p>
                <CodeBlock className="mb-4" language="javascript">{`import 'tailwindcss-social/css/all.min.css';

// or per-provider files:
import 'tailwindcss-social/css/single/github/github.min.css';
import 'tailwindcss-social/css/single/linkedin/linkedin.min.css';`}</CodeBlock>

                <p className="docs-text-strong text-3xl font-bold mb-2">Customize source colors and rebuild</p>
                <ol className="docs-text-muted text-lg list-decimal list-inside">
                  <li className="pb-2">
                    Open <code>src/providers.js</code>
                  </li>
                  <li className="pb-2">
                    Update a provider HSL color (or add/remove a provider)
                  </li>
                  <li className="pb-2">
                    Run <code className="bg-gray-800 text-white px-2 py-1 rounded">npm run build</code>
                  </li>
                  <li className="pb-4">
                    Generated artifacts are updated in <code>css/</code>
                  </li>
                </ol>
                <CodeBlock className="mb-3" language="javascript">{`// src/providers.js
export const providers = {
  github: {
    name: 'GitHub',
    color: 'hsl(210, 12.2%, 16.1%)',
  },
  linkedin: {
    name: 'LinkedIn',
    color: 'hsl(210, 90.2%, 40%)',
  },
};`}</CodeBlock>
                <p className="docs-text-muted text-base mb-4">
                  You can also override button runtime variables in your app CSS:
                </p>
                <CodeBlock className="mb-3" language="css">{`.tw-social-provider-github {
  --tw-social-btn-border: color-mix(in srgb, var(--tw-social-color) 55%, white);
}

.tw-social-btn {
  border-radius: 9999px;
}`}</CodeBlock>
                <DocsCallout
                  title="Not sure which providers to include?"
                  description="Preview every provider and style variant before deciding your output."
                  href="/docs/providers"
                  ctaLabel="Explore All Providers"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
