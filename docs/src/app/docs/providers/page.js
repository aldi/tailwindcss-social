import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import DocsCallout from '@/components/DocsCallout';
import Link from 'next/link';
import { socialProviders } from '@/data/socialProviders';

export const metadata = {
  title: 'Providers - TailwindCSS-Social Docs',
};

export default function ProvidersPage() {
  const breadcrumbItems = [
    { label: 'TailwindCSS-Social', href: '/' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Providers', active: true },
  ];

  return (
    <>
      <Hero title="Providers" subtitle="Select a provider to view its styles and code examples" />
      <section className="section py-12 px-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap -mx-3">
            <div className="px-3 w-full lg:w-11/12 lg:mx-auto">
              <Breadcrumb items={breadcrumbItems} />
              <div className="flex flex-wrap -mx-3 mt-4">
                {socialProviders.map((provider) => (
                  <div key={provider.code} className="px-3 w-full md:w-1/3 mb-6">
                    <Link
                      href={`/docs/providers/${provider.code}`}
                      className="block text-center p-6 rounded-lg border border-gray-200 bg-white shadow-sm provider-card"
                    >
                      <span
                        className={`inline-flex items-center justify-center w-12 h-12 tw-social-text-${provider.code}`}
                      >
                        <i className={`fa-brands ${provider.icon} fa-2x`}></i>
                      </span>
                      <p className="provider-card-name text-xl font-semibold mt-3">{provider.name}</p>
                      <button
                        className={`tw-social-btn tw-social-provider-${provider.code} mt-3`}
                      >
                        <i className={`fa-brands ${provider.icon}`}></i>
                        <span>View Styles</span>
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
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
