import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import { SafeImage } from "./SafeImage";

type InlineImage = { url?: string; alt?: string; caption?: string; width?: number; height?: number };

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-6 leading-[1.85] text-charcoal/90">{children}</p>,
    h2: ({ children }) => <h2 className="mt-14 text-3xl sm:text-4xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-10 text-2xl">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-sage pl-6 font-serif text-2xl italic text-sage-dark">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-6 list-disc space-y-2 pl-6 marker:text-sage">{children}</ul>,
    number: ({ children }) => <ol className="mt-6 list-decimal space-y-2 pl-6 marker:text-sage">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-sage underline underline-offset-4 hover:text-sage-dark"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: InlineImage }) =>
      value?.url ? (
        <figure className="my-12">
          <SafeImage
            src={value.url}
            alt={value.alt || ""}
            width={value.width || 1600}
            height={value.height || 1067}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full"
          />
          {value.caption && <figcaption className="mt-3 text-center text-sm text-muted">{value.caption}</figcaption>}
        </figure>
      ) : null,
  },
};

export function PortableTextBody({ value }: { value: TypedObject[] }) {
  return <PortableText value={value} components={components} />;
}
