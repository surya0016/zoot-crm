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
import { AddNoteModalProps, InputType, NoteItem } from "@/lib/types"



const AddNoteComponent = (item: NoteItem) => {
  if (item.type === "link") {
    const url = item.content.startsWith("http") ? item.content : `https://${item.content}` || `https://${item.content}`
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
      >
        <ExternalLink className="h-3 w-3" />
        {item.title || item.content}
      </a>
    )
  }
  return (
    <span className="flex items-center gap-1">
      <FileText className="h-3 w-3 text-muted-foreground" />
      {item.content}
    </span>
  )
}

const RenderItem = (item: NoteItem) => {
  if (item.type === "link") {
    const url = item.content.startsWith("http") ? item.content : `https://${item.content}`
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
      >
        <ExternalLink className="h-3 w-3" />
        {item.title || item.content}
      </a>
    )
  }
  return (
    <span className="flex items-center gap-1">
      <FileText className="h-3 w-3 text-muted-foreground" />
      {item.content}
    </span>
  )
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ onAddItem }) => { 
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [itemType, setItemType] = useState<InputType>("note")
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  
  const handleSubmit = () => {
    // Validate content
    if (!content.trim()) {
      alert("Please enter content")
      return
    }
    
    // Create the item
    const newItem: Omit<NoteItem, 'id'> = {
      type: itemType,
      content: content.trim(),
      ...(itemType === "link" && title.trim() && { title: title.trim() })
    }
    
    // Call the callback
    onAddItem?.(newItem)
    
    // Reset form and close dialog
    setContent("")
    setTitle("")
    setItemType("note")
    setIsDialogOpen(false)
  }
  
  const handleCancel = () => {
    // Reset form and close dialog
    setContent("")
    setTitle("")
    setItemType("note")
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
            <RadioGroup value={itemType} onValueChange={(value) => setItemType(value as InputType)}>
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
              <Label htmlFor="content">{itemType === "note" ? "Note Content" : "URL"}</Label>
              <Input
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={itemType === "note" ? "Enter your note..." : "https://example.com"}
              />
            </div>

            {itemType === "link" && (
              <div className="space-y-2">
                <Label htmlFor="title">Link Title (optional)</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Display name for the link"
                />
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                Add {itemType === "note" ? "Note" : "Link"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddNoteModal
export { AddNoteComponent, RenderItem }
