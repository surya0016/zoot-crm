export const tags = [
  {
    value: "1440",
    label: "first message"
  },
  {
    value: "1440",
    label: "1st Zoom meet followup taken"
  },
  {
    value: "1440",
    label: "2nd Zoom meet followup taken"
  },
  {
    value: "1440",
    label: "1st ARP Followup Taken"
  },
  {
    value: "1440",
    label: "2nd ARP Followup Taken"
  },
  {
    value: "1440",
    label: "1st Custom offer followup taken"
  },
  {
    value: "1440",
    label: "2nd Custom offer followup taken"
  },
  {
    value: "1440",
    label: "3rd Custom offer followup taken"
  },
  {
    value: "1440",
    label: "custom offer followup taken"
  },
  {
    value: "1440",
    label: "ARP followup taken"
  },
  {
    value: "60",
    label: "asking for review"
  },
  {
    value: "1440",
    label: "ask for link"
  },
  {
    value: "1440",
    label: "do the analysis"
  },
  {
    value: "1440",
    label: "analysis sent"
  },
  {
    value: "720",
    label: "sent package details"
  },
  {
    value: "1440",
    label: "waiting for response"
  },
  {
    value: "0",
    label: "order accepted"
  },
  {
    value: "0",
    label: "do not take order"
  },
  {
    value: "360",
    label: "less budget"
  },
  {
    value: "1440",
    label: "custom offer sent"
  },
  {
    value: "1440",
    label: "wrongly pitched"
  },
  {
    value: "60",
    label: "next followup date set"
  },
  {
    value: "1440",
    label: "suspended/closed"
  },
  {
    value: "1440",
    label: "asking zoom meet"
  },
  {
    value: "180",
    label: "zoom analysis"
  },
  {
    value: "1440",
    label: "send arp template"
  },
  {
    value: "60",
    label: "pitched for paid maintenance"
  },
  {
    value: "120",
    label: "need to send ubersuggest"
  },
  {
    value: "1440",
    label: "offline"
  },
  {
    value: "60",
    label: "send keywords"
  },
  {
    value: "1440",
    label: "ready to order"
  },
  {
    value: "1440",
    label: "follow up taken"
  },
  {
    value: "60",
    label: "not found"
  },
  {
    value: "1440",
    label: "business registration"
  },
  {
    value: "60",
    label: "not interested"
  },
  {
    value: "60",
    label: "will place the order later"
  },
  {
    value: "1440",
    label: "client waiting for answer"
  },
  {
    value: "1440",
    label: "create arp"
  },
  {
    value: "1440",
    label: "if not replied send arp"
  },
  {
    value: "1440",
    label: "pitched for zoom meet"
  },
  {
    value: "120",
    label: "incomplete analysis"
  },
  {
    value: "180",
    label: "arp ready to send"
  },
  {
    value: "1440",
    label: "pitched for website"
  },
  {
    value: "1440",
    label: "arp follwup reply"
  },
  {
    value: "1440",
    label: "arp sent"
  },
  {
    value: "60",
    label: "keyword analysis required"
  },
  {
    value: "120",
    label: "package details required by client"
  },
  {
    value: "60",
    label: "custom offer accepted"
  },
  {
    value: "2880",
    label: "waiting for response 2"
  },
  {
    value: "1440",
    label: "hard question"
  },
  {
    value: "720",
    label: "phase 1 question solved"
  },
  {
    value: "60",
    label: "package details questions solved"
  },
  {
    value: "120",
    label: "aishwarya zoom sheet updated"
  },
  {
    value: "720",
    label: "zoom meeting done"
  },
  {
    value: "240",
    label: "convinced for average order"
  },
  {
    value: "720",
    label: "suspended pitched for web"
  },
  {
    value: "0",
    label: "dead"
  },
  {
    value: "0",
    label: "fake"
  },
  {
    value: "1440",
    label: "location confirmation"
  },
  {
    value: "240",
    label: "ubersuggest taking time"
  },
  {
    value: "1440",
    label: "customize package"
  },
  {
    value: "60",
    label: "need to take followup"
  },
  {
    value: "1440",
    label: "query answered - waiting"
  },
  {
    value: "60",
    label: "created analysis"
  }
]

export const doneTags = ["order accepted", "dead", "fake", "not interested", "aishwarya zoom sheet updated", "next followup date set", "do not take order","added to quality pitch","added to recent sheet","moved to next sheet","3rd tier country"];

const DEFAULT_TAG_TIME_LIMITS = {
  "first message": 1440,
  "1st Zoom meet followup taken": 1440,
  "2nd Zoom meet followup taken": 1440,
  "1st ARP Followup Taken": 1440,
  "2nd ARP Followup Taken": 1440,
  "1st Custom offer followup taken": 1440,
  "2nd Custom offer followup taken": 1440,
  "3rd Custom offer followup taken": 1440,
  "custom offer followup taken": 1440,
  "ARP followup taken": 1440,
  "asking for review": 60,
  "ask for link": 1440,
  "do the analysis": 1440,
  "analysis sent": 1440,
  "sent package details": 720,
  "waiting for response": 1440,
  "order accepted": 0,
  "do not take order": 0,
  "less budget": 360,
  "custom offer sent": 1440,
  "wrongly pitched": 1440,
  "next followup date set": 60,
  "suspended/closed": 1440,
  "asking zoom meet": 1440,
  "zoom analysis": 180,
  "send arp template": 1440,
  "pitched for paid maintenance": 60,
  "need to send ubersuggest": 120,
  "offline": 1440,
  "send keywords": 60,
  "ready to order": 1440,
  "follow up taken": 1440,
  "not found": 60,
  "business registration": 1440,
  "not interested": 60,
  "will place the order later": 60,
  "client waiting for answer": 1440,
  "create arp": 1440,
  "if not replied send arp": 1440,
  "pitched for zoom meet": 1440,
  "incomplete analysis": 120,
  "arp ready to send": 180,
  "pitched for website": 1440,
  "arp follwup reply": 1440,
  "arp sent": 1440,
  "keyword analysis required": 60,
  "package details required by client": 120,
  "custom offer accepted": 60,
  "waiting for response 2": 2880,
  "hard question": 1440,
  "phase 1 question solved": 720,
  "package details questions solved": 60,
  "aishwarya zoom sheet updated": 120,
  "zoom meeting done": 720,
  "convinced for average order": 240,
  "suspended pitched for web": 720,
  dead: 0,
  fake: 0,
  "location confirmation": 1440,
  "ubersuggest taking time": 240,
  "customize package": 1440,
  "need to take followup": 60,
  "query answered - waiting": 1440,
  "created analysis": 60,
}

export const sampleData = [
  {
    name: "alinmagureanu19",
    noteLink: ["https://maps.app.goo.gl/h8Z3yXmArNUG15jt5","Need to take client to the next step"],
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
    name: "alinmagureanu19",
    noteLink: ["https://maps.app.goo.gl/h8Z3yXmArNUG15jt5", "Need to take client to the next step"],
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
    noteLink: ["https://maps.app.goo.gl/h8Z3yXmArNUG15jt5", "Need to take client to the next step"],
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