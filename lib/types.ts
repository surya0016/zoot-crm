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

interface Tag {
  tag: string
}

import { Status } from "@prisma/client"

export interface Entry {
  id: string
  clientId: string
  status: Status
  note?: string[]
  tag1?: string
  tag2?: string
  tag3?: string
  tag4?: string
  tag5?: string
  tag6?: string
  tag7?: string
  tag8?: string
  tags?: { [key: string]: string | null }[];
  tagTimers?: TagTimerProps[];
  createdAt?: string
  updatedAt?: string
}

export interface ClientData {
  id: string
  name: string
  createdAt?: string
  entries?: null
  entry: Entry
}

export interface TagTimerProps {
  id: string
  countDownMins: number
  clientEntryId: string
  tagField: number // 1-8 for tag1 to tag8
  // tagStatus: Status // Assuming you have a Status enum with ACTIVE, INACTIVE, etc.
  tagValue: string
  startTime: string
  endTime?: string // Optional, if you want to track when the timer ends
  createdAt?: string
}

export interface TagUpdateProps {
  entryId: string
  tagIndex: number
  tag: { label: string; value: number } | null
}