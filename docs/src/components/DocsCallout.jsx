import Link from 'next/link';

/**
 * Shared CTA card used across docs pages.
 * Keeps cross-page promo links visually consistent.
 */
export default function DocsCallout({
  title,
  description,
  href,
  ctaLabel,
  ctaIcon = 'fa-solid fa-arrow-right',
}) {
  return (
    <div className="docs-callout">
      <p className="docs-callout-title">{title}</p>
      <p className="docs-callout-description">{description}</p>
      <Link className="docs-callout-cta" href={href}>
        <span>{ctaLabel}</span>
        <i className={ctaIcon}></i>
      </Link>
    </div>
  );
}
