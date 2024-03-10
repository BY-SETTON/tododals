import {Footnote, FootnoteInterface} from "@/app/(authenticated)/task/(components)/Footnote";
import React from "react";

interface Props {
  footnotes: FootnoteInterface[];
}

export default function FootnoteList({footnotes}: Props) {
  return (footnotes.map((footnote) => {
    return footnote && <div key={footnote.id} className="mb-2">
      <Footnote footNote={footnote}/>
    </div>
  }));
}
