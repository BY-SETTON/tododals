interface Props {
  footNote: FootnoteInterface,
}

export interface FootnoteInterface {
  id: string;
  body: string;
}

export function Footnote({footNote}: Props) {
  return <div className={"flex max-w-xl bg-neutral-100 p-4"}>{footNote.body}</div>
}
