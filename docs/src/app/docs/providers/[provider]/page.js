import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import CodeBlock from '@/components/CodeBlock';
import DocsCallout from '@/components/DocsCallout';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { socialProviders, getProviderByCode } from '@/data/socialProviders';

export async function generateStaticParams() {
  return socialProviders.map((provider) => ({
    provider: provider.code,
  }));
}

export async function generateMetadata({ params }) {
  const { provider } = await params;
  const providerData = getProviderByCode(provider);
  if (!providerData) return { title: 'Not Found' };
  return {
    title: `${providerData.name} - TailwindCSS-Social Docs`,
  };
}

export default async function ProviderPage({ params }) {
  const { provider } = await params;
  const providerData = getProviderByCode(provider);

  if (!providerData) {
    notFound();
  }

  const { icon, name } = providerData;

  const breadcrumbItems = [
    { label: 'TailwindCSS-Social', href: '/' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Providers', href: '/docs/providers' },
    { label: name, active: true },
  ];
  const cardClassName = 'provider-doc-card mt-6';
  const sectionTitleClassName = 'provider-doc-title text-2xl font-bold mb-2';
  const sectionDescriptionClassName = 'provider-doc-description text-base mb-4';

  return (
    <>
      <Hero
        title={name}
        subtitle={
          <>
            Styles and examples for <strong><code>.tw-social-btn</code></strong>{' '}
            +{' '}
            <strong><code>{`.tw-social-provider-${provider}`}</code></strong>
          </>
        }
      />
      <section className="section py-12 px-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap -mx-3">
            <div className="px-3 w-full lg:w-11/12 lg:mx-auto">
              <Breadcrumb items={breadcrumbItems} />

              <div className={cardClassName}>
                <p className={sectionTitleClassName}>Button Variants</p>
                <p className={sectionDescriptionClassName}>
                  Available variant modifiers:
                  <br />
                  <code>.tw-social-variant-outline</code>
                  <br />
                  <code>.tw-social-variant-light</code>
                  <br />
                  <code>.tw-social-variant-dark</code>
                  <br />
                  <code>.tw-social-variant-inverted</code>
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <a className={`tw-social-btn tw-social-provider-${provider}`}>
                    <i className={`fa-brands ${icon}`}></i>

                    <span>{name}</span>
                  </a>
                  <a className={`tw-social-btn tw-social-provider-${provider} tw-social-variant-outline`}>
                    <i className={`fa-brands ${icon}`}></i>
                    <span>Outlined</span>
                  </a>
                  <a className={`tw-social-btn tw-social-provider-${provider} tw-social-variant-light`}>
                    <i className={`fa-brands ${icon}`}></i>
                    <span>Light</span>
                  </a>
                  <a className={`tw-social-btn tw-social-provider-${provider} tw-social-variant-dark`}>
                    <i className={`fa-brands ${icon}`}></i>
                    <span>Dark</span>
                  </a>
                  <a className={`tw-social-btn tw-social-provider-${provider} tw-social-variant-inverted`}>
                    <i className={`fa-brands ${icon}`}></i>
                    <span>Inverted</span>
                  </a>
                </div>

                <CodeBlock language="html">{`<a class="tw-social-btn tw-social-provider-${provider}">
  <span class="icon">
    <i class="fa-brands ${icon}"></i>
  </span>
  <span>${name}</span>
</a>
<a class="tw-social-btn tw-social-provider-${provider} tw-social-variant-outline">
  <span class="icon">
    <i class="fa-brands ${icon}"></i>
  </span>
  <span>Outlined</span>
</a>
<a class="tw-social-btn tw-social-provider-${provider} tw-social-variant-light">
  <span class="icon">
    <i class="fa-brands ${icon}"></i>
  </span>
  <span>Light</span>
</a>
<a class="tw-social-btn tw-social-provider-${provider} tw-social-variant-dark">
  <span class="icon">
    <i class="fa-brands ${icon}"></i>
  </span>
  <span>Dark</span>
</a>
<a class="tw-social-btn tw-social-provider-${provider} tw-social-variant-inverted">
  <span class="icon">
    <i class="fa-brands ${icon}"></i>
  </span>
  <span>Inverted</span>
</a>`}</CodeBlock>
              </div>

              <div className={cardClassName}>
                <p className={sectionTitleClassName}>Icon Buttons</p>
                <p className={sectionDescriptionClassName}>
                  Icon-only buttons, no text label.
                  <br />
                  Required class:
                  <br />
                  <code>.tw-social-icon-only</code>
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <a className={`tw-social-btn tw-social-provider-${provider} tw-social-icon-only`} aria-label={name}>
                    <i className={`fa-brands ${icon} fa-lg`}></i>
                  </a>
                  <a
                    className={`tw-social-btn tw-social-provider-${provider} tw-social-variant-outline tw-social-icon-only`}
                    aria-label={`${name} outlined`}
                  >
                    <i className={`fa-brands ${icon} fa-lg`}></i>
                  </a>
                  <a
                    className={`tw-social-btn tw-social-provider-${provider} tw-social-variant-light tw-social-icon-only`}
                    aria-label={`${name} light`}
                  >
                    <i className={`fa-brands ${icon} fa-lg`}></i>
                  </a>
                  <a
                    className={`tw-social-btn tw-social-provider-${provider} tw-social-variant-dark tw-social-icon-only`}
                    aria-label={`${name} dark`}
                  >
                    <i className={`fa-brands ${icon} fa-lg`}></i>
                  </a>
                  <a
                    className={`tw-social-btn tw-social-provider-${provider} tw-social-variant-inverted tw-social-icon-only`}
                    aria-label={`${name} inverted`}
                  >
                    <i className={`fa-brands ${icon} fa-lg`}></i>
                  </a>
                </div>

                <CodeBlock language="html">{`<a class="tw-social-btn tw-social-provider-${provider} tw-social-icon-only" aria-label="${name}">
  <i class="fa-brands ${icon} fa-lg"></i>
</a>
<a class="tw-social-btn tw-social-provider-${provider} tw-social-variant-outline tw-social-icon-only" aria-label="${name} outlined">
  <i class="fa-brands ${icon} fa-lg"></i>
</a>
<a class="tw-social-btn tw-social-provider-${provider} tw-social-variant-light tw-social-icon-only" aria-label="${name} light">
  <i class="fa-brands ${icon} fa-lg"></i>
</a>
<a class="tw-social-btn tw-social-provider-${provider} tw-social-variant-dark tw-social-icon-only" aria-label="${name} dark">
  <i class="fa-brands ${icon} fa-lg"></i>
</a>
<a class="tw-social-btn tw-social-provider-${provider} tw-social-variant-inverted tw-social-icon-only" aria-label="${name} inverted">
  <i class="fa-brands ${icon} fa-lg"></i>
</a>`}</CodeBlock>
              </div>

              <div className={cardClassName}>
                <p className={sectionTitleClassName}>Icon Placement</p>
                <p className={sectionDescriptionClassName}>
                  Use <code>.tw-social-icon-left</code> / <code>.tw-social-icon-right</code> for single-icon buttons.
                  <br />
                  Use <code>data-icon=&quot;inline-start&quot;</code> / <code>data-icon=&quot;inline-end&quot;</code> for per-icon control (e.g., icons on both sides).
                </p>

                <p className="text-sm font-semibold mb-2">Class modifiers (single-icon buttons)</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <a className={`tw-social-btn tw-social-provider-${provider} tw-social-icon-left`}>
                    <i className={`fa-brands ${icon}`}></i>
                    <span>Start</span>
                  </a>
                  <a className={`tw-social-btn tw-social-provider-${provider} tw-social-icon-right`}>
                    <span>End</span>
                    <i className={`fa-brands ${icon}`}></i>
                  </a>
                </div>

                <p className="text-sm font-semibold mb-2">Data attribute markers (per-icon control)</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <a className={`tw-social-btn tw-social-provider-${provider}`}>
                    <i
                      className={`fa-brands ${icon}`}
                      data-icon="inline-start"
                    ></i>
                    <span>Marker Start</span>
                  </a>
                  <a className={`tw-social-btn tw-social-provider-${provider}`}>
                    <span>Marker End</span>
                    <i className={`fa-brands ${icon}`} data-icon="inline-end"></i>
                  </a>
                </div>

                <CodeBlock language="html">{`<!-- Class modifiers (single-icon buttons) -->
<a class="tw-social-btn tw-social-provider-${provider} tw-social-icon-left">
  <i class="fa-brands ${icon}"></i>
  <span>Start</span>
</a>
<a class="tw-social-btn tw-social-provider-${provider} tw-social-icon-right">
  <span>End</span>
  <i class="fa-brands ${icon}"></i>
</a>

<!-- Data attribute markers (per-icon control) -->
<a class="tw-social-btn tw-social-provider-${provider}">
  <i class="fa-brands ${icon}" data-icon="inline-start"></i>
  <span>Marker Start</span>
</a>
<a class="tw-social-btn tw-social-provider-${provider}">
  <span>Marker End</span>
  <i class="fa-brands ${icon}" data-icon="inline-end"></i>
</a>`}</CodeBlock>
              </div>

              <div className={cardClassName}>
                <p className={sectionTitleClassName}>Button Sizes</p>
                <p className={sectionDescriptionClassName}>
                  Available sizes:
                  <br />
                  <code>.tw-social-size-sm</code>
                  <br />
                  <code>.tw-social-size-md</code>
                  <br />
                  <code>.tw-social-size-lg</code>
                </p>

                <div className="flex flex-wrap gap-2 mb-4 items-center">
                  <a className={`tw-social-btn tw-social-provider-${provider} tw-social-size-sm`}>
                    <span className="icon">
                      <i className={`fa-brands ${icon}`}></i>
                    </span>
                    <span>Small</span>
                  </a>
                  <a className={`tw-social-btn tw-social-provider-${provider}`}>
                    <span className="icon">
                      <i className={`fa-brands ${icon}`}></i>
                    </span>
                    <span>Normal</span>
                  </a>
                  <a className={`tw-social-btn tw-social-provider-${provider} tw-social-size-md`}>
                    <span className="icon">
                      <i className={`fa-brands ${icon}`}></i>
                    </span>
                    <span>Medium</span>
                  </a>
                  <a className={`tw-social-btn tw-social-provider-${provider} tw-social-size-lg`}>
                    <span className="icon">
                      <i className={`fa-brands ${icon}`}></i>
                    </span>
                    <span>Large</span>
                  </a>
                </div>

                <CodeBlock language="html">{`<a class="tw-social-btn tw-social-provider-${provider} tw-social-size-sm">
  <span class="icon">
    <i class="fa-brands ${icon}"></i>
  </span>
  <span>Small</span>
</a>
<a class="tw-social-btn tw-social-provider-${provider}">
  <span class="icon">
    <i class="fa-brands ${icon}"></i>
  </span>
  <span>Normal</span>
</a>
<a class="tw-social-btn tw-social-provider-${provider} tw-social-size-md">
  <span class="icon">
    <i class="fa-brands ${icon}"></i>
  </span>
  <span>Medium</span>
</a>
<a class="tw-social-btn tw-social-provider-${provider} tw-social-size-lg">
  <span class="icon">
    <i class="fa-brands ${icon}"></i>
  </span>
  <span>Large</span>
</a>`}</CodeBlock>
              </div>

              <div className={cardClassName}>
                <p className={sectionTitleClassName}>Text Colors</p>
                <p className={sectionDescriptionClassName}>Apply the provider color to any text</p>

                <div>
                  <p className={`text-xl tw-social-text-${provider} mb-0`}>
                    .tw-social-text-{provider}
                  </p>
                  <p className={`text-xl tw-social-text-${provider}-light mb-0`}>
                    .tw-social-text-{provider}-light
                  </p>
                  <p className={`text-xl tw-social-text-${provider}-dark mb-0`}>
                    .tw-social-text-{provider}-dark
                  </p>
                </div>

                <CodeBlock language="html">{`<p class="tw-social-text-${provider}">Text with ${name} color</p>
<p class="tw-social-text-${provider}-light">Text with ${name} light color</p>
<p class="tw-social-text-${provider}-dark">Text with ${name} dark color</p>`}</CodeBlock>
              </div>

              <div className={cardClassName}>
                <p className={sectionTitleClassName}>Background Colors</p>
                <p className={sectionDescriptionClassName}>Apply the provider color as a background</p>

                <div className="mb-4">
                  <div className={`p-3 mb-1 rounded-sm tw-social-bg-${provider} text-white`}>
                    .tw-social-bg-{provider}
                  </div>
                  <div className={`p-3 mb-1 rounded-sm tw-social-bg-${provider}-light`}>
                    .tw-social-bg-{provider}-light
                  </div>
                  <div className={`p-3 mb-1 rounded-sm tw-social-bg-${provider}-dark text-white`}>
                    .tw-social-bg-{provider}-dark
                  </div>
                </div>

                <CodeBlock language="html">{`<div class="rounded-sm tw-social-bg-${provider} text-white">
  .tw-social-bg-${provider}
</div>
<div class="rounded-sm tw-social-bg-${provider}-light">
  .tw-social-bg-${provider}-light
</div>
<div class="rounded-sm tw-social-bg-${provider}-dark text-white">
  .tw-social-bg-${provider}-dark
</div>`}</CodeBlock>
              </div>

              <div className={cardClassName}>
                <p className={sectionTitleClassName}>Border, Ring, and SVG Utilities</p>
                <p className={sectionDescriptionClassName}>
                  Use these helpers for borders, focus rings, and SVG coloring.
                </p>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className={`px-3 py-2 rounded border-2 tw-social-border-${provider}`}>
                    .tw-social-border-{provider}
                  </div>
                  <div className={`px-3 py-2 rounded border-2 tw-social-border-${provider}-light`}>
                    .tw-social-border-{provider}-light
                  </div>
                  <div className={`px-3 py-2 rounded border-2 tw-social-border-${provider}-dark`}>
                    .tw-social-border-{provider}-dark
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <button
                    type="button"
                    className={`px-3 py-2 rounded ring-2 tw-social-ring-${provider}`}
                  >
                    .tw-social-ring-{provider}
                  </button>
                  <svg
                    className={`w-6 h-6 tw-social-fill-${provider}`}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  <svg
                    className={`w-6 h-6 tw-social-stroke-${provider}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9"></circle>
                  </svg>
                </div>

                <CodeBlock language="html">{`<div class="tw-social-border-${provider} border-2"></div>
<div class="tw-social-border-${provider}-light border-2"></div>
<div class="tw-social-border-${provider}-dark border-2"></div>

<button class="tw-social-ring-${provider} ring-2">Ring utility</button>
<svg class="tw-social-fill-${provider}" viewBox="0 0 24 24"></svg>
<svg class="tw-social-stroke-${provider}" viewBox="0 0 24 24"></svg>`}</CodeBlock>
              </div>

              <div className="mt-8">
                <DocsCallout
                  title="Need multiple providers in one file?"
                  description="Build a custom CSS bundle with only the providers you need."
                  href="/docs/customization"
                  ctaLabel="Explore Customization"
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <Link
                  className="inline-flex items-center gap-2 px-4 py-2 border border-indigo-500 text-indigo-600 rounded font-medium hover:bg-indigo-50 transition"
                  href="/docs/providers"
                >
                  <span className="inline-flex items-center justify-center">
                    <i className="fa-solid fa-arrow-left"></i>
                  </span>
                  <span>Back to Providers</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
