"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TagsDropDown } from "./tags-dropdown"
import { InputType, NoteItem } from "@/lib/types"
import CountDown from "./countdown-timer"
import EditableInput from "./editable-input"
import { useState } from "react"
import AddNoteModal, { AddNoteComponent } from "./add-note-modal"
import { doneTags } from "@/lib/data"
import { cn } from "@/lib/utils"

const data = [
  {
    id: "1",
    name: "alinmagureanu19",
    noteLink: [
      {
        id: "1",
        type: "link",
        content: "https://maps.app.goo.gl/h8Z3yXmArNUG15jt5",
        title: "Client Location",
      },
      {
        id: "2",
        type: "note",
        content: "Need to take client to the next step",
      }
    ],
    latestTag: "ARP Tag update",
    timerStatus: "active",
    remainingTime: 31,
    lastUpdated: "2023-10-01T12:00:00Z",
    lastTagUpdate: "2023-10-01T12:00:00Z",
    status: "In Progress",
    tags:[
        {tag1: "asking for review"},
        {tag2: "do the analysis"},
        {tag3: "analysis sent"},
        {tag4: "sent package details"},
        {tag5: "waiting for response"},
        {tag6: "order accepted"},
        {tag7: "do not take order"},
        {tag8: "asking for review"}
      ]
    
  },
  {
    id: "2",
    name: "alinmagureanu19",
    noteLink: [
      {
        id: "1",
        type: "link",
        content: "https://maps.app.goo.gl/h8Z3yXmArNUG15jt5",
        title: "Client Location",
      },
      {
        id: "2",
        type: "note",
        content: "Need to take client to the next step",
      },
    ],
    latestTag: "ARP Tag update",
    timerStatus: "active",
    remainingTime: 39,
    lastUpdated: "2023-10-01T12:00:00Z",
    lastTagUpdate: "2023-10-01T12:00:00Z",
    status: "In Progress",
    tags:[
        {tag1: "asking for review"},
        {tag2: "do the analysis"},
        {tag3: "analysis sent"},
        {tag4: "sent package details"},
        {tag5: "waiting for response"},
        {tag6: "order accepted"},
        {tag7: "do not take order"},
        {tag8: "asking for review"}
      ]
    
  },
  {
    id: "3",
    name: "alinmagureanu19",
    noteLink: [
      {
        id: "1",
        type: "link",
        content: "https://maps.app.goo.gl/h8Z3yXmArNUG15jt5",
        title: "Client Location",
      },
      {
        id: "2",
        type: "note",
        content: "Need to take client to the next step",
      },
    ],
    latestTag: "ARP Tag update",
    timerStatus: "active",
    remainingTime: 39,
    lastUpdated: "2023-10-01T12:00:00Z",
    lastTagUpdate: "2023-10-01T12:00:00Z",
    status: "Overdue",
    tags:[
        {tag1: "asking for review"},
        {tag2: "do the analysis"},
        {tag3: "analysis sent"},
        {tag4: "sent package details"},
        {tag5: "waiting for response"},
        {tag6: "order accepted"},
        {tag7: "do not take order"},
        {tag8: "asking for review"}
      ]
    
  },
]

const ClientTable = () => {
  // Create state for each client - object with client ID as key
  const [clientTags, setClientTags] = useState<{[clientId: string]: (string | null)[]}>({});
  const [noteLinks, setNoteLinks] = useState<NoteItem[]>([]);
  const [timer, setTimer] = useState<{[clientId: string]: number}>({});

  const handleAddNote = (newItem: Omit<NoteItem, 'id'>) => {
    const itemWithId: NoteItem = {
    ...newItem,
    id: Date.now().toString() // Simple ID generation
  }
    setNoteLinks(prev => [...prev, itemWithId])
  }

  // Initialize state for each client if not exists
  const getClientTags = (clientId: string) => {
    if (!clientTags[clientId]) {
      return [null, null, null, null, null, null, null, null];
    }
    console.log("client tags: ",clientTags[1])
    return clientTags[clientId];
  };

  // Get current step for specific client
  const getCurrentStep = (clientId: string) => {
    const tags = getClientTags(clientId);
    const step = tags.findIndex((tag) => tag === null);
    return step === -1 ? tags.length : step;
  };

  // Get latest tag for specific client
  const getLatestTag = (clientId: string) => {
    const tags = getClientTags(clientId);
    for (let i = tags.length - 1; i >= 0; i--) {
      if (tags[i] !== null) return tags[i];
    }
    return "";
  };

  // Handle tag change for specific client
  const handleTagChange = (clientId: string, index: number, tag: { label: string; value: number } | null) => {
    setClientTags(prev => {
      const clientTagsCopy = getClientTags(clientId);
      const newTags = [...clientTagsCopy];
      newTags[index] = tag ? tag.label : null;
      
      return {
        ...prev,
        [clientId]: newTags
      };
    });
  };

  const handleStatus = (clientId: string) => {
    if (!clientTags[clientId]) {
      return;
    }
    clientTags[clientId].forEach((tag, index) => {
      if (tag && doneTags.includes(tag)) {
        data[parseInt(clientId)-1].status = "Done";
        data[parseInt(clientId)-1].remainingTime = 0;
      } 
    })
  }

  return (
    <div>
      <Table className="border rounded-md dark:bg-zinc-950 text-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="border-l text-center">Client ID</TableHead>
            <TableHead className="border-l text-center">Client Name</TableHead>
            <TableHead className="border-l text-center">Note/Link</TableHead>
            <TableHead className="border-l text-center">Latest Tag</TableHead>
            <TableHead className="border-l text-center">Timer</TableHead>
            <TableHead className="border-l text-center">Status</TableHead>
            {data[0].tags.map((tag, index) => (
              <TableHead key={index} className="border-l text-center">
                Tag {index + 1}
              </TableHead>
            ))}
            <TableHead className="border-l text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((client, clientIndex) => {
            const clientTagsArray = getClientTags(client.id);
            const currentStep = getCurrentStep(client.id);
            const latestTag = getLatestTag(client.id);
            handleStatus(client.id);
            return (
              <TableRow key={client.id}>
                <TableCell className="border-l text-center">{client.id}</TableCell>
                <TableCell className="border-l text-center">
                  <EditableInput value={client.name}/>
                </TableCell>
                <TableCell className="border-l text-center">
                  {client.noteLink.map((note, index)=>(
                    <div key={index}>
                      <AddNoteComponent {...note} type={note.type as InputType} />
                    </div>
                  ))}
                  <AddNoteModal onAddItem={handleAddNote} />
                </TableCell>
                <TableCell className="border-l text-center">{latestTag || "None"}</TableCell>
                <TableCell className="border-l text-center">
                  <CountDown initialTime={client.remainingTime}/>
                </TableCell>
                <TableCell className={cn(
                    "w-24 border-l text-center",
                    client.status === "Done" ?  "text-green-800 bg-green-300 dark:bg-green-900 dark:text-green-300" : 
                    client.status === "Overdue" ? "text-red-800 bg-red-300 dark:bg-red-900 dark:text-red-300" : "")}>
                  <div >
                    {client.status} {
                      client.status === "Done" ? "✅"  : 
                      client.status === "Overdue" ? "❌" : ""
                    }
                  </div>
                </TableCell>
                {client.tags.map((tag, tagIndex) => (
                  <TableCell key={tagIndex} className="border-l text-center">
                    <TagsDropDown
                      index={tagIndex}
                      value={clientTagsArray[tagIndex]}
                      isEnabled={tagIndex === currentStep || tagIndex < currentStep}
                      onTagSelect={(tag) => {
                        handleTagChange(client.id, tagIndex, tag)
                        console.log("Tag:", tag, "Tag Index:", tagIndex, "Client ID:", client.id)
                      }}
                      currentStep={currentStep}
                    />
                  </TableCell>
                ))}
                <TableCell className="text-right">Actions</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ClientTable

