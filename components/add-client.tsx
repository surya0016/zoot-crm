"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader, Plus } from 'lucide-react'
import axios from 'axios';
import { useClientContext } from '@/context/clientContext';

function AddClient() {
  const [name, setName] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addClient, dataLoading } = useClientContext();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      addClient(name);
    } catch (error) {
      console.error("Error creating client:", error);
    } finally {
      setIsDialogOpen(false);
    }
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <form onSubmit={handleSubmit} className="w-full">
        <DialogTrigger asChild>
          <Button className='cursor-pointer' variant="outline"><Plus/> Create</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Client</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input 
                id="name-1" 
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}  
                onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent form submission
                  handleSubmit(e);
                } else if (e.key === 'Escape') {
                  setIsDialogOpen(false); // Exit editing mode
                }
              }}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit} disabled={dataLoading}>Save changes {dataLoading ? <Loader className='animate-spin'/> : ''}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}


export default AddClient