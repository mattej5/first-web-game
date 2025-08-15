// components/MDXContent.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeExternalLinks from "rehype-external-links";
import Image from "next/image";
import Link from "next/link";

function MdxImage(props: React.ComponentProps<"img">) {
  // next/image needs dimensions; set sensible defaults (override in MDX if you want)
  const { alt = "", width = 1200, height = 675, src = "", ...rest } = props;
  return (
    <Image
      src={src as string}
      alt={alt}
      width={typeof width === "string" ? parseInt(width, 10) : width}
      height={typeof height === "string" ? parseInt(height, 10) : height}
      className="rounded-lg"
      {...rest}
    />
  );
}

function MdxLink({
  href = "",
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string; children?: React.ReactNode }) {
  if (href.startsWith("/")) return <Link href={href} {...rest}>{children}</Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
}

const components = {
  img: MdxImage, // if your MDX uses <img>
  a: MdxLink,
};

export function MDXContent({ source, extraComponents = {} }: Readonly<{ source: string; extraComponents?: Record<string, React.ComponentType<unknown>> }>) {
  return (
    <MDXRemote
      source={source}
      components={{ ...components, ...extraComponents }}
      // Configure the “already-existing” behavior via plugins:
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: "anchor" } }],
            [rehypePrettyCode, { theme: { dark: "github-dark", light: "github-light" } }],
            [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
          ],
        },
      }}
    />
  );
}
