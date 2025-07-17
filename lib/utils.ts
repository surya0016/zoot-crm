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