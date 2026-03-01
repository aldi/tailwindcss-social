import Link from 'next/link';

export default function Breadcrumb({ items }) {
  return (
    <nav className="docs-breadcrumb flex items-center gap-2 text-sm" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="breadcrumb-separator">/</span>}
          {item.active ? (
            <span className="breadcrumb-current docs-text-strong font-medium" aria-current="page">
              {item.label}
            </span>
          ) : item.href ? (
            <Link href={item.href} className="breadcrumb-link transition-colors">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
