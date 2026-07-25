import * as runtime from "react/jsx-runtime";

// Velite compiles MDX to a function-body string; evaluate it with the JSX runtime.
function getMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function MDXContent({ code }: { code: string }) {
  const Component = getMDXComponent(code);
  return <Component />;
}
