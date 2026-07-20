'use client';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    const currentTheme =
      resolvedTheme ??
      (theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme);

    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <i className="fa-solid fa-sun icon-sun" aria-hidden="true"></i>
      <i className="fa-solid fa-moon icon-moon" aria-hidden="true"></i>
    </button>
  );
}
