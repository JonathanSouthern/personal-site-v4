import * as runtime from "react/jsx-runtime";
import type { ComponentPropsWithoutRef } from "react";

// Velite compiles MDX to a function-body string; evaluate it with the JSX runtime.
function getMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

// MDX wraps a standalone image in a <p>, so the wrapper must be a span
// (block-styled in CSS) to keep the HTML valid.
function MediaFigure({ alt = "", ...props }: ComponentPropsWithoutRef<"img">) {
  return (
    <span className="media-figure">
      <img alt={alt} loading="lazy" decoding="async" {...props} />
      {alt && <span className="media-caption">{alt}</span>}
    </span>
  );
}

const components = {
  img: MediaFigure,
};

export function MDXContent({ code }: { code: string }) {
  const Component = getMDXComponent(code);
  return <Component components={components} />;
}
