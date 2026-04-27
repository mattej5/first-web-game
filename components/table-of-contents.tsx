"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract all headings from the article
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = article.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const headingData: Heading[] = [];

    headingElements.forEach((heading) => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent || "";

      // Create ID from text if it doesn't have one
      let id = heading.id;
      if (!id) {
        id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        heading.id = id;
      }

      headingData.push({ id, text, level });
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(headingData);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66%" }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="rounded-lg border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
      <h2 className="mb-3 font-mono text-xs tracking-widest text-[#a5e446] uppercase">
        On this page
      </h2>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-1 transition-colors duration-200 hover:text-[#a5e446] ${
                activeId === heading.id
                  ? "font-medium text-[#a5e446]"
                  : "text-white/40"
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
