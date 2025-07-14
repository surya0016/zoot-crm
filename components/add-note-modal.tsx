import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, Plus } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface NoteRenderProps {
  note: string[] | undefined
}


const AddNoteModal = (note: string) => { 
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [noteType, setNoteType] = useState<"note"|"link">("note") // Default to note
  const [content, setContent] = useState(note || "")
  
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
//   const AddNoteComponent = () => {
//   if(noteType === "link") {
//     const note = content.trim()
//     if (!note.startsWith("http://") && !note.startsWith("https://"))
//       return <span className="text-red-500">Please enter a valid URL</span>
//     const url = content.startsWith("http") ? content : `https://${note}` 
//     return (
//       <a
//         href={url}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
//       >
//         <ExternalLink className="h-3 w-3" />
//         {content}
//       </a>
//     )
//   }
//   return (
//     <span className="flex items-center gap-1">
//       <FileText className="h-3 w-3 text-muted-foreground" />
//       {content}
//     </span>
//   )
// }
  
  const handleSubmit = () => {
    // Validate content
    if (!content.trim()) {
      alert("Please enter content")
      return
    }
    setIsDialogOpen(false)
  }
  
  const handleCancel = () => {
    // Reset form and close dialog
    setContent("")
    setIsDialogOpen(false)
  }
  
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="ghost">
            <Plus className="h-3 w-3 mr-1" />
            Add
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Note or Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <RadioGroup value={noteType} onValueChange={value => setNoteType(value as "note" | "link")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="note" id="note" />
                <Label htmlFor="note">Text Note</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="link" id="link" />
                <Label htmlFor="link">Hyperlink</Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="content">
                {noteType === "link" ? "Link URL" : "Note Content"}
              </Label>
              <Input
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={"Enter your note or link..."}
              />
            </div>
            <div className="flex justify-end space-x-2"> 
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Add 
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddNoteModal
