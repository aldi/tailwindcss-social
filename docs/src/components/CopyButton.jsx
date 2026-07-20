'use client';

import { useEffect, useRef, useState } from 'react';

export default function CopyButton({ code }) {
  const [status, setStatus] = useState('idle');
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('copied');
    } catch {
      setStatus('error');
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus('idle'), 2000);
  };

  const copied = status === 'copied';
  const message =
    status === 'copied'
      ? 'Code copied'
      : status === 'error'
        ? 'Unable to copy code'
        : '';

  return (
    <button
      className="button is-small bd-copy"
      onClick={handleCopy}
      type="button"
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? 'Copied!' : 'Copy'}
      <span className="sr-only" role="status" aria-live="polite">
        {message}
      </span>
    </button>
  );
}
