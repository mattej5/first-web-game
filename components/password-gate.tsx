"use client";

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

type PasswordGateProps = {
  isProtected: boolean;
  password?: string;
  contactEmail?: string;
  passwordHint?: string;
  storageKey: string;
  title: string;
  children: ReactNode;
};

export function PasswordGate({
  isProtected,
  password,
  contactEmail,
  passwordHint,
  storageKey,
  title,
  children,
}: Readonly<PasswordGateProps>) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(() => !isProtected);

  const requestAccessLink = useMemo(() => {
    if (!contactEmail) return null;

    const subject = encodeURIComponent(`Password request for "${title}"`);
    const body = encodeURIComponent(
      `Hi Vin,\n\nI'd love to read "${title}". Could you share the password with me?\n\nThanks!`
    );

    return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }, [contactEmail, title]);

  useEffect(() => {
    if (!isProtected) return;

    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored === "unlocked") {
        setIsUnlocked(true);
      }
    } catch {
      // Ignore storage access issues (private browsing, disabled storage, etc.)
    }
  }, [isProtected, storageKey]);

  useEffect(() => {
    if (!isProtected) return;
    if (!isUnlocked) return;

    try {
      window.localStorage.setItem(storageKey, "unlocked");
    } catch {
      // Ignore storage write failures
    }
  }, [isProtected, isUnlocked, storageKey]);

  if (!isProtected) {
    return <>{children}</>;
  }

  if (isUnlocked) {
    return <>{children}</>;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password) {
      setErrorMessage("The password must be requested from the author.");
      return;
    }

    if (inputValue.trim() === password.trim()) {
      setIsUnlocked(true);
      setErrorMessage(null);
      return;
    }

    setErrorMessage("That password was not quite right. Please try again.");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="password-dialog-heading"
      className="space-y-6 rounded-2xl border border-gray-700 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 p-8 text-gray-100 shadow-xl"
    >
      <div>
        <h2
          id="password-dialog-heading"
          className="text-2xl font-semibold text-white"
        >
          This story is password protected.
        </h2>
        <p className="mt-2 text-gray-300">
          Enter the secret phrase to continue, or reach out and I&rsquo;ll send
          it your way.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label
          className="block text-sm font-medium text-gray-300"
          htmlFor="password-entry"
        >
          Password
        </label>
        <input
          id="password-entry"
          name="password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-base text-white placeholder-gray-500 focus:border-green-400 focus:ring-2 focus:ring-green-500/40 focus:outline-none"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Enter password"
          disabled={!password}
        />
        {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
        {passwordHint && (
          <p className="text-sm text-gray-400">Hint: {passwordHint}</p>
        )}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
            disabled={!password}
          >
            Unlock story
          </button>
          {requestAccessLink && (
            <a
              href={requestAccessLink}
              className="inline-flex items-center justify-center rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-white transition hover:border-green-400 hover:text-green-300 focus:border-green-400 focus:outline-none"
            >
              Request the password
            </a>
          )}
        </div>
      </form>
    </div>
  );
}
