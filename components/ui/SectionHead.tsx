import { SplitWords } from "./SplitWords";
import s from "./SectionHead.module.css";

interface Props {
  index: string;
  label: string;
  heading: string;
  intro?: string;
  id?: string;
}

/** Chapter opener shared by every section: index + label rule, headline, optional intro. */
export function SectionHead({ index, label, heading, intro, id }: Props) {
  return (
    <header className={s.head}>
      <div className={`${s.rule} mono`} data-reveal>
        <span className="accent">{index}</span>
        <span>{label}</span>
      </div>
      <h2 id={id} className={s.heading} data-reveal-lines>
        <SplitWords text={heading} />
      </h2>
      {intro && (
        <p className={s.intro} data-reveal>
          {intro}
        </p>
      )}
    </header>
  );
}
