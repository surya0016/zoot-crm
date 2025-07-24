import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const clientTags: {
    [clientId: string]: (string | null)[];
} = {
    "client1": [
        "asking for review",
        "do the analysis",
        "analysis sent",
        "sent package details",
        "waiting for response",
        "order accepted",
        "do not take order",
        "asking for review"
    ]
};

export const getClientTags = (clientId: string) => {
  if (!clientTags[clientId]) {
    return [null, null, null, null, null, null, null, null];
  }
  console.log("client tags: ",clientTags[1])
  return clientTags[clientId];
};

// Get current step for specific client
export const getCurrentStep = (clientId: string) => {
  const tags = getClientTags(clientId);
  const step = tags.findIndex((tag) => tag === null);
  return step === -1 ? tags.length : step;
};

// Get latest tag for specific client
export const getLatestTag = (clientId: string) => {
  const tags = getClientTags(clientId);
  for (let i = tags.length - 1; i >= 0; i--) {
    if (tags[i] !== null) return tags[i];
  }
  return "";
};

export function getSecondsSpent(startTime: string) {
  if (!startTime) {
    return 0; // or handle as needed
  }
  const start = new Date(startTime).getTime();
  const end = Date.now();
  const diffMs = end - start; // difference in milliseconds
  const diffSecs = Math.floor(diffMs / 1000); // convert to seconds
  return diffSecs;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export function dateFormatter (date:string) {
  const dateArr = date.split("-");
  const year = dateArr[0];
  const month = months[parseInt(dateArr[1], 10) - 1];
  const day = parseInt(dateArr[2], 10);
  return `${month} ${day}, ${year}`;
}

export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


export const filterStatusOptions = [
  { name: "All", value: "all" },
  { name: "Pending", value: "in_progress" },
  { name: "Completed", value: "completed" },
  { name: "Overdue", value: "overdue" },    
]

export const filterTagOptions =  [
  {
    value: "first message",
    name: "first message"
  },
  {
    value: "1st Zoom meet followup taken",
    name: "1st Zoom meet followup taken"
  },
  {
    value: "2nd Zoom meet followup taken",
    name: "2nd Zoom meet followup taken"
  },
  {
    value: "1st ARP Followup Taken",
    name: "1st ARP Followup Taken"
  },
  {
    value: "2nd ARP Followup Taken",
    name: "2nd ARP Followup Taken"
  },
  {
    value: "1st Custom offer followup taken",
    name: "1st Custom offer followup taken"
  },
  {
    value: "2nd Custom offer followup taken",
    name: "2nd Custom offer followup taken"
  },
  {
    value: "3rd Custom offer followup taken",
    name: "3rd Custom offer followup taken"
  },
  {
    value: "custom offer followup taken",
    name: "custom offer followup taken"
  },
  {
    value: "ARP followup taken",
    name: "ARP followup taken"
  },
  {
    value: "asking for review",
    name: "asking for review"
  },
  {
    value: "ask for link",
    name: "ask for link"
  },
  {
    value: "do the analysis",
    name: "do the analysis"
  },
  {
    value: "analysis sent",
    name: "analysis sent"
  },
  {
    value: "sent package details",
    name: "sent package details"
  },
  {
    value: "waiting for response",
    name: "waiting for response"
  },
  {
    value: "order accepted",
    name: "order accepted"
  },
  {
    value: "do not take order",
    name: "do not take order"
  },
  {
    value: "less budget",
    name: "less budget"
  },
  {
    value: "custom offer sent",
    name: "custom offer sent"
  },
  {
    value: "wrongly pitched",
    name: "wrongly pitched"
  },
  {
    value: "next followup date set",
    name: "next followup date set"
  },
  {
    value: "suspended/closed",
    name: "suspended/closed"
  },
  {
    value: "asking zoom meet",
    name: "asking zoom meet"
  },
  {
    value: "zoom analysis",
    name: "zoom analysis"
  },
  {
    value: "send arp template",
    name: "send arp template"
  },
  {
    value: "pitched for paid maintenance",
    name: "pitched for paid maintenance"
  },
  {
    value: "need to send ubersuggest",
    name: "need to send ubersuggest"
  },
  {
    value: "offline",
    name: "offline"
  },
  {
    value: "send keywords",
    name: "send keywords"
  },
  {
    value: "ready to order",
    name: "ready to order"
  },
  {
    value: "follow up taken",
    name: "follow up taken"
  },
  {
    value: "not found",
    name: "not found"
  },
  {
    value: "business registration",
    name: "business registration"
  },
  {
    value: "not interested",
    name: "not interested"
  },
  {
    value: "will place the order later",
    name: "will place the order later"
  },
  {
    value: "client waiting for answer",
    name: "client waiting for answer"
  },
  {
    value: "create arp",
    name: "create arp"
  },
  {
    value: "if not replied send arp",
    name: "if not replied send arp"
  },
  {
    value: "pitched for zoom meet",
    name: "pitched for zoom meet"
  },
  {
    value: "incomplete analysis",
    name: "incomplete analysis"
  },
  {
    value: "arp ready to send",
    name: "arp ready to send"
  },
  {
    value: "pitched for website",
    name: "pitched for website"
  },
  {
    value: "arp follwup reply",
    name: "arp follwup reply"
  },
  {
    value: "arp sent",
    name: "arp sent"
  },
  {
    value: "keyword analysis required",
    name: "keyword analysis required"
  },
  {
    value: "package details required by client",
    name: "package details required by client"
  },
  {
    value: "custom offer accepted",
    name: "custom offer accepted"
  },
  {
    value: "waiting for response 2",
    name: "waiting for response 2"
  },
  {
    value: "hard question",
    name: "hard question"
  },
  {
    value: "phase 1 question solved",
    name: "phase 1 question solved"
  },
  {
    value: "package details questions solved",
    name: "package details questions solved"
  },
  {
    value: "aishwarya zoom sheet updating",
    name: "aishwarya zoom sheet updating"
  },
  {
    value: "zoom meeting done",
    name: "zoom meeting done"
  },
  {
    value: "convinced for average order",
    name: "convinced for average order"
  },
  {
    value: "suspended pitched for web",
    name: "suspended pitched for web"
  },
  {
    value: "dead",
    name: "dead"
  },
  {
    value: "fake",
    name: "fake"
  },
  {
    value: "location confirmation",
    name: "location confirmation"
  },
  {
    value: "ubersuggest taking time",
    name: "ubersuggest taking time"
  },
  {
    value: "customize package",
    name: "customize package"
  },
  {
    value: "need to take followup",
    name: "need to take followup"
  },
  {
    value: "query answered - waiting",
    name: "query answered - waiting"
  },
  {
    value: "created analysis",
    name: "created analysis"
  },
  {
    value: "cron job test",
    name: "cron job test"
  }
]

export const filterCreatedDateOptions = [
  { name: "All", value: "all" },
  { name: "Today", value: "today" },
  { name: "Last 7 Days", value: "last_7_days" },
  { name: "Last 30 Days", value: "last_30_days" },
  { name: "This Month", value: "this_month" },
  { name: "Last Month", value: "last_month" }
];