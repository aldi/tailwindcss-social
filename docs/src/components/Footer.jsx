export default function Footer() {
  return (
    <footer className="footer has-text-centered">
      <p>
        Developed with{' '}
        <i
          className="fa-solid fa-heart fa-fw heart-icon"
          aria-hidden="true"
        ></i>{' '}
        by{' '}
        <a href="https://aldi.st" target="_blank" rel="noopener noreferrer">
          aldi
        </a>
      </p>
      <p>
        The source code is licensed under{' '}
        <a
          href="https://opensource.org/licenses/mit-license.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          MIT
        </a>
        .
      </p>
      <p>
        Available in{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/aldi/tailwindcss-social"
          aria-label="TailwindCSS-Social on GitHub"
        >
          <i className="fa-brands fa-github" aria-hidden="true"></i>
        </a>{' '}
        and{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.npmjs.com/package/tailwindcss-social"
          aria-label="TailwindCSS-Social on npm"
        >
          <i className="fa-brands fa-npm" aria-hidden="true"></i>
        </a>
      </p>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/aldi/tailwindcss-social/blob/main/CHANGELOG.md"
        >
          View Changelog
        </a>
      </p>
    </footer>
  );
}
