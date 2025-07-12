import { ExternalLink, FileText } from 'lucide-react';
import React from 'react'

interface NoteRenderProps {
  note: string[] | undefined
}


const isLink = (text: string) => {
  // Simple URL regex
  return /^https?:\/\//i.test(text);
};

const NoteRender = (props: NoteRenderProps) => {
  const { note } = props;
  if (!note || note.length === 0) {
    return <div>No notes available</div>;
  }
  return (
    <div>
      {note.map((n, idx) =>
        isLink(n) ? (
          <a
            key={idx}
            href={n}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            {n}
          </a>
        ) : (
          <span className="flex items-center gap-1" key={idx}>
            <FileText className="h-3 w-3 text-muted-foreground" />
            {n}
          </span>
        )
      )}
    </div>
  );
}

export default NoteRender