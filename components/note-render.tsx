import { CopyIcon, Globe, Pencil } from 'lucide-react';
import React from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface NoteRenderProps {
  note: string[] | undefined
}

const TextToLink = ({text}: {text:string}) => {
    const arr = text.split(" ");
    const url = arr.find((word) => word.startsWith("https://"))
    if (!url) {
      return <span>{text}</span>;
    }
    return (
      <span className="flex items-center gap-1">
        {arr.map((word, idx) => (
          word.startsWith("https://") ? (
            <span key={idx}></span>
          ) : (
            <span key={idx}>{word}</span>
          )
        ))}
        <span
          className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
        >
          {url}
        </span>
      </span>
    )
  }
  
const textToUrl = (text: string) => {
  const arr = text.split(" ");
  const url = arr.find((word) => word.startsWith("https://"))
  if (url) {
    return url;
  }
  return null;
};

const NoteRender = (props: NoteRenderProps) => {
  const { note } = props;
  if (!note || note.length === 0) {
    return <div>No notes available</div>;
  }
  return (
    <div>
      {note.map((n, idx) => (
          <HoverCard key={idx}>
            <HoverCardTrigger asChild>
              <span className="flex items-center gap-1">
                <TextToLink text={n} />
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="w-full text-sm">
              <div className="flex items-center gap-2">
                <span className=""><Globe size={14}/></span>
                <span className="">
                  <a
                    key={idx}
                    href={textToUrl(n) || ""}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                  >
                    {textToUrl(n) || n}
                  </a>
                </span>
                <span className="cursor-pointer" onClick={
                  () => navigator.clipboard.writeText(textToUrl(n) || n)
                }><CopyIcon size={14}/></span>             
              </div>
            </HoverCardContent>
          </HoverCard>
        ) 
      )}
    </div>
  );
}

const AddNoteComponent = ({ note }: NoteRenderProps) => {
  
}

export default NoteRender