export interface Client {
  id: string
  name: string
  noteLink: string
  noteDescription?: string
  tag1: string
  tag2: string
  tag3: string
  tag4: string
  tag5: string
  tag6: string
  tag7: string
  tag8: string
  tag1Timestamp?: string
  tag2Timestamp?: string
  tag3Timestamp?: string
  tag4Timestamp?: string
  tag5Timestamp?: string
  tag6Timestamp?: string
  tag7Timestamp?: string
  tag8Timestamp?: string
  latestTag: string
  status: "Done" | "In Progress" | "Overdue" | "Pending"
  lastUpdated: string
  lastTagUpdate: string
  timerStatus: "active" | "overdue" | "done"
  remainingTime: number
}

export interface ARPEntry {
  id: string
  clientName: string
  tagName: string
  timestamp: string
  clientId: string
}

export interface TagConfig {
  name: string
  timeLimit: number
  isCustom: boolean
}

export type InputType = "note" | "link"

export interface NoteItem {
  id: string
  type: InputType
  content: string
  title?: string
}

import { Status } from "@prisma/client"

interface Entry {
  id: string
  clientId: string
  status: Status
  note?: string
  tag1?: string
  tag2?: string
  tag3?: string
  tag4?: string
  tag5?: string
  tag6?: string
  tag7?: string
  tag8?: string
  createdAt?: string
  updatedAt?: string
}

interface ClientData {
  id: string
  name: string
  createdAt?: string
  entries?: null
  entry: Entry
}

//  {
//     id: '884bf3be-51cc-4b4d-918e-46a35a301df3',
//     name: 'Surya',
//     createdAt: 2025-07-10T11:18:29.126Z,
//     entries: null,
//     entry: Entry
//   }

export interface AddNoteModalProps {
  onAddItem?: (item: Omit<NoteItem, 'id'>) => void
}