# TailwindCSS-Social Changelog

## [1.1.0](https://github.com/aldi/tailwindcss-social/tree/1.1.0) - (2026-07-20)

### Added

- Twitch provider
- CSS-first plugin loading via `@plugin "tailwindcss-social"` for Tailwind CSS v4
- Single provider name as a string for the `providers` option
- `prefers-reduced-motion` support for button transitions and hover states

### Changed

- Focus indication now uses the browser default `:focus-visible` outline
- Peer dependency range for `tailwindcss` capped at `<5.0.0`
- Generated CSS (`css/`, `docs/public/all.min.css`) is no longer tracked in git; it is built at publish time, so npm and CDN consumers are unaffected

### Removed

- `--tw-social-btn-ring` variable and the custom focus ring styles

## [1.0.0](https://github.com/aldi/tailwindcss-social/tree/1.0.0) - (2026-03-01)

- Initial release
