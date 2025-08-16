'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  className?: string;
  fallbackHref?: string;   // where to go if there's no history
  label?: string;
};

export default function BackArrow({
  className = '',
  fallbackHref = '/blog',
  label = 'Back',
}: Readonly<Props>) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // If user landed directly on this page, history length is usually 1
    setCanGoBack(typeof window !== 'undefined' && window.history.length > 1);
  }, []);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (canGoBack) router.back();
    else router.push(fallbackHref);
  };

  return (
    <a
      href={fallbackHref}
      onClick={onClick}
      aria-label={label}
      className={`group inline-flex items-center gap-2 text-sm
                  text-neutral-600 dark:text-neutral-400
                  hover:text-neutral-900 dark:hover:text-neutral-100
                  ${className}`}
    >
      <svg
        className="h-5 w-5 transition-transform group-hover:-translate-x-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      <span className="underline decoration-transparent group-hover:decoration-inherit">
        {label}
      </span>
    </a>
  );
}
