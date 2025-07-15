import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash } from "lucide-react"
import NoteRender from './note-render';
import axios from "axios"

interface AddNoteProps {
  entryId: string
  clientNotes: string[]
  isAddnoteOpen?: boolean
  setIsAddNoteOpen?: (isOpen: boolean) => void
}

const AddNote = ({entryId, clientNotes, isAddnoteOpen, setIsAddNoteOpen}:AddNoteProps) => {
  const [notes, setNotes] = useState<string[]>(clientNotes || []);
  const [newNote, setNewNote] = useState("");
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const handleNote = async () => {
    if (newNote.trim() !== "") {
      setNotes([newNote, ...notes]);
      setNewNote("");
      const response = await axios.post('/api/client/create/note', { 
        id: entryId,
        newNote,
      });
      if (response.status !== 200) {
        console.error("Failed to add note", response.data);
      }
      console.log("Note added successfully", response.data);
    }
  }
  const handleDeleteNote = async (note: string) => {
    setNotes(notes.filter(n => n !== note));
    const response = await axios.post('/api/client/delete/note', { 
      id: entryId,
      noteToDelete: note,
    });
    if (response.status !== 200) {
      console.error("Failed to delete note", response.data);
    }
    console.log("Note deleted successfully", response.data);
  }
  const handleEditStart = (idx: number, value: string) => {
    setEditIdx(idx);
    setEditValue(value);
  };

  const handleEditSave = async (oldValue: string) => {
    // Call API to update note
    const response = await axios.post('/api/client/update/note', { 
      id: entryId,
      oldNote: notes[editIdx!],
      newNote: editValue,
    });
    if (response.status === 200) {
      const updatedNotes = [...notes];
      updatedNotes[editIdx!] = editValue;
      setNotes(updatedNotes);
      setEditIdx(null);
      setEditValue("");
    } else {
      console.error("Failed to update note", response.data);
    }
  };
  return (
    <div>
      <NoteRender note={notes} />
      <AddNoteDialog 
        isDialogOpen={isAddnoteOpen || false} 
        newLink={newNote} 
        links={notes} 
        setIsDialogOpen={setIsAddNoteOpen || (() => {})} 
        setNewLink={setNewNote} 
        handleAddLink={handleNote}      
        handleDeleteLink={handleDeleteNote}    
        handleEditStart={handleEditStart}
        handleEditSave={handleEditSave}
        editIdx={editIdx}
        editValue={editValue}
        setEditValue={setEditValue}
        setEditIdx={setEditIdx}
      />
    </div>
  )
}

interface AddNoteDialogProps {
  isDialogOpen: boolean
  newLink: string
  links: string[]
  setIsDialogOpen: (isOpen: boolean) => void
  setNewLink: (link: string) => void
  handleAddLink: () => void,
  handleDeleteLink: (link: string) => void
  handleEditStart: (idx: number, value: string) => void
  handleEditSave: (oldValue: string) => void
  editIdx: number | null
  editValue: string
  setEditValue: (value: string) => void
  setEditIdx: (idx: number | null) => void
}

const AddNoteDialog = ({
    isDialogOpen, 
    newLink,
    links,
    setIsDialogOpen,
    setNewLink,
    handleAddLink,
    handleDeleteLink,
    handleEditStart,
    handleEditSave,
    editIdx,
    editValue,
    setEditValue,
    setEditIdx
  }:AddNoteDialogProps) => {
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <form>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add Note</DialogTitle>
            </DialogHeader>
            <div className="">
              <Label htmlFor="note" className="mb-2">Add New Note</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="note"
                  name="note"
                  placeholder="Enter your note here..."
                  className=""
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                />
                <Button 
                  variant={"outline"} 
                  disabled={newLink.trim() === ""} 
                  className="hover:bg-zinc-200 cursor-pointer"
                  onClick={handleAddLink}
                ><Plus/></Button>
              </div>
            </div>
            <div className="grid gap-4">
              {links.length === 0 ? (
                <div className="text-gray-500">No notes available</div>
              ) : (
                <>
                  <Label htmlFor="links" className="mt-4">Current Links</Label>              
                  <>
                    {links.map((link, idx) => (
                      <div className="flex items-center gap-2" key={idx}>
                        {editIdx === idx ? (
                          <>
                            <Input
                              value={editValue}
                              onChange={e => setEditValue(e.target.value)}
                            />
                            <Button onClick={() => handleEditSave(link)}>Save</Button>
                            <Button onClick={() => setEditIdx(null)}>Cancel</Button>
                          </>
                        ) : (
                          <>
                            <Input
                              value={link}
                              readOnly
                            />
                            <Button onClick={() => handleEditStart(idx, link)}>Edit</Button>
                            <Button onClick={() => handleDeleteLink(link)}><Trash/></Button>
                          </>
                        )}
                      </div>
                    ))}
                  </>
                </>
              )              
            }
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={()=>{
                setIsDialogOpen(false)
                handleAddLink();
              }}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default AddNote