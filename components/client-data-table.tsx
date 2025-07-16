"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useClientContext } from '@/context/clientContext';
import { useEffect, useState } from 'react'
import NoteRender from "./note-render";
import { TagsDropDown } from "./tags-dropdown";
import { TagUpdateProps } from "@/lib/types";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import EditableInput from "./editable-input";
import CountDown from "./countdown-timer";
import StatusComponent from "./status-component";
import AddClient from "./add-client";
import AddNote from "./add-note";

const ClientDataTable = () => {
  const { clientData, error, loading, updateTag } = useClientContext();
  const [clients, setClients] = useState(clientData || []);
  const [clientTags, setClientTags] = useState<{ [key: string]: (string | null)[] }>({});
  const [openNoteEntryId, setOpenNoteEntryId] = useState<string | null>(null);
  console.log("Client Tag Timer: ", clientData.map(c => c.entry?.tagTimers));
  useEffect(() => {
    setClients(clientData || []);
    console.log("Client Data Updated: ", clientData);
    console.log(!clientTags[0])
  }, [clientData])

  useEffect(()=>{
    console.log("Client Tags Updated: ", clientTags);
  },[clientTags])

  const getLatestTag = (clientId: string) => {
    const tags = getClientTags(clientId);
    for (let i = tags.length - 1; i >= 0; i--) {
      if (tags[i] !== null) return tags[i];
    }
    return "";
  };

  const getClientTags = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    if (!client || !client.entry || !Array.isArray(client.entry.tags)) {
      return [null, null, null, null, null, null, null, null];
    }
    return client.entry.tags.map(tagObj => tagObj.tag ?? null);
  }

  const getCurrentStep = (clientId: string) => {
    const tags = getClientTags(clientId);
    const step = tags.findIndex((tag) => tag === null);
    return step === -1 ? tags.length : step;
  };
  
  const handleTagChange = ({entryId, tag, tagIndex:index}:TagUpdateProps) => {
    if (!entryId || index === undefined || tag === undefined) {
      console.error("Invalid tag change request", { entryId, index, tag });
      return;
    }
    try {
      updateTag({entryId, tagIndex:index, tag});
    } catch (error) {
      console.error("Error updating tag:", error);
    }
  };

  if (error) {
    return <div>Error loading clients: {error}</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-2xl">CRM </div>
        <div className="">
          <AddClient/>
        </div>
      </div>
      <Table>
        <TableHeader>
            <TableRow>
              <TableHead className="border-l border-t text-center font-bold">No.</TableHead>
              <TableHead className="border-l border-t text-center font-bold">Client Name</TableHead>
              <TableHead className="border-l border-t text-center font-bold">Note/Link</TableHead>
              <TableHead className="border-l border-t text-center font-bold">Latest Tag</TableHead>
              <TableHead className="border-l border-t text-center font-bold min-w-25">Timer</TableHead>
              <TableHead className="border-l border-t text-center font-bold">Status</TableHead>
              {Array.from({ length: 8 }, (_, index) => (
                <TableHead key={index} className="border-l border-t text-center font-bold">
                  Tag {index + 1}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        <TableBody>
          {clients.map((client, index)=>{
            const clientTagsArray = getClientTags(client.id);
            const currentStep = getCurrentStep(client.id);
            const latestTag = getLatestTag(client.id);
            return (
              <TableRow key={client.id} className="hover:bg-gray-100 dark:hover:bg-gray-800" >
                <TableCell className="border text-center">{index+1}</TableCell>
                <TableCell className="border text-center"><EditableInput value={client.name} id={client.id}/></TableCell>
                <TableCell
                  className="border text-center"
                  onDoubleClick={() => setOpenNoteEntryId(client.entry.id)}
                >
                  <AddNote
                    clientNotes={client.entry.note || []}
                    isAddnoteOpen={openNoteEntryId === client.entry.id}
                    setIsAddNoteOpen={(isOpen) => setOpenNoteEntryId(isOpen ? client.entry.id : null)}
                    entryId={client.entry.id}
                  />
                </TableCell>
                <TableCell className="border text-center font-semibold">{latestTag ? latestTag : "No Tag Selected"}</TableCell>
                <TableCell className="border text-center"><CountDown entryId={client.entry.id} tagName={latestTag || ""} /></TableCell>
                <TableCell className="border text-center"><StatusComponent entryId={client.entry.id} tagName={latestTag || ""}/></TableCell>
                {Array.from({ length: 8 }, (_, tagIndex) => (
                  <TableCell key={tagIndex} className="border text-center">
                    <TagsDropDown
                      index={tagIndex}
                      value={clientTagsArray[tagIndex]}
                      tagStatus={client.entry.tagTimers?.find(timer => timer.tagField === tagIndex + 1)?.tagStatus || "inactive"}
                      isEnabled={tagIndex === currentStep || tagIndex < currentStep}
                      onTagSelect={(tag) =>{
                        handleTagChange({ entryId: client.entry.id, tagIndex: tagIndex, tag})
                      }}
                      currentStep={currentStep}
                    />
                  </TableCell>
                ))}
              </TableRow>)    
            })}
        </TableBody>
      </Table>
    </div>
  )
}
export default ClientDataTable