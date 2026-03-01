"use client";

import { useState } from "react";

export default function CopyInstallButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard errors (e.g. missing permissions).
    }
  };

  return (
    <button
      className="copy-btn"
      onClick={handleCopy}
      type="button"
      aria-label={copied ? "Copied" : "Copy install command"}
      title={copied ? "Copied" : "Copy"}
    >
      <i className={copied ? "fa-solid fa-check" : "fa-solid fa-copy"}></i>
    </button>
  );
}

