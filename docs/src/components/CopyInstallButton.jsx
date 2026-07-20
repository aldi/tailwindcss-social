'use client';

import { useEffect, useRef, useState } from 'react';

export default function CopyInstallButton({ text }) {
  const [status, setStatus] = useState('idle');
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const resetStatus = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setStatus('idle'), 2000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch {
      setStatus('error');
    }

    resetStatus();
  };

  const copied = status === 'copied';
  const message =
    status === 'copied'
      ? 'Install command copied'
      : status === 'error'
        ? 'Unable to copy install command'
        : '';

  return (
    <button
      className="copy-btn"
      onClick={handleCopy}
      type="button"
      aria-label={copied ? 'Copied' : 'Copy install command'}
      title={copied ? 'Copied' : 'Copy'}
    >
      <i
        className={copied ? 'fa-solid fa-check' : 'fa-solid fa-copy'}
        aria-hidden="true"
      ></i>
      <span className="sr-only" role="status" aria-live="polite">
        {message}
      </span>
    </button>
  );
}
