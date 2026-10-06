import { Fragment } from "react";

/** Renders text as masked words so it can be revealed word-by-word (`.wi` is the moving part). */
export function SplitWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="w">
              <span className="wi">{w}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
