import type { ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";

const renderToString = (children: ReactNode) => {
  const div = document.createElement("div");

  flushSync(() => {
    createRoot(div).render(children);
  });
  return div.innerHTML;
};

export default renderToString;
