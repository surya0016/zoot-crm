"use client"

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

const ClientDataTable = () => {
  const { clientData, error, loading, dataLoading, fetchClientData, updateTag } = useClientContext();
  const [clients, setClients] = useState(clientData || []);
  const [clientTags, setClientTags] = useState<{ [key: string]: (string | null)[] }>({});

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
    // Find the client by id
    const client = clients.find((c) => c.id === clientId);
    if (!client || !client.entry || !Array.isArray(client.entry.tags)) {
      return [null, null, null, null, null, null, null, null];
    }
    // Map to array of tag values (or null)
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
      <Table>
        <TableHeader>
            <TableRow className="text-red-500">
              <TableHead className="border-l border-t text-center">No.</TableHead>
              <TableHead className="border-l border-t text-center">Client Name</TableHead>
              <TableHead className="border-l border-t text-center">Note/Link</TableHead>
              <TableHead className="border-l border-t text-center">Latest Tag</TableHead>
              <TableHead className="border-l border-t text-center">Timer</TableHead>
              <TableHead className="border-l border-t text-center">Status</TableHead>
              {Array.from({ length: 8 }, (_, index) => (
                <TableHead key={index} className="border-l border-t text-center">
                  Tag {index + 1}
                </TableHead>
              ))}
              <TableHead className="border-x border-t  text-center">Actions</TableHead>
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
                <TableCell className="border text-center"><NoteRender note={client.entry.note}/></TableCell>
                <TableCell className="border text-center">{latestTag}</TableCell>
                <TableCell className="border text-center">{123}</TableCell>
                <TableCell className="border text-center">{123}</TableCell>
                {Array.from({ length: 8 }, (_, tagIndex) => (
                  <TableCell key={tagIndex} className="border text-center">
                    <TagsDropDown
                      index={tagIndex}
                      value={clientTagsArray[tagIndex]}
                      isEnabled={tagIndex === currentStep || tagIndex < currentStep}
                      onTagSelect={(tag) =>{
                        handleTagChange({ entryId: client.entry.id, tagIndex: tagIndex, tag})
                      }}
                      currentStep={currentStep}
                      
                    />
                  </TableCell>
                ))}
                <TableCell className="border text-center"><Button><Trash2/></Button></TableCell>
              </TableRow>)    
            })}
        </TableBody>
      </Table>
    </div>
  )
}
export default ClientDataTable