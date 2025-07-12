import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined;
};

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// const A = {
//   id: '884bf3be-51cc-4b4d-918e-46a35a301df3',
//   name: 'Surya',
//   createdAt: '2025-07-10T11:18:29.126Z',
//   entries: null,
//   entry: {
//     id: '6637ed46-c5c2-45f2-9630-07a29ac794ea',
//     clientId: '884bf3be-51cc-4b4d-918e-46a35a301df3',
//     status: null,
//     note: [],
//     tag1: null,
//     tag2: null,
//     tag3: null,
//     tag4: null,
//     tag5: null,
//     tag6: null,
//     tag7: null,
//     tag8: null,
//     tags: [
//       { tag: null },
//       { tag: null },
//       { tag: null },
//       { tag: null },
//       { tag: null },
//       { tag: null },
//       { tag: null },
//       { tag: null }
//     ],
//     createdAt: '2025-07-10T11:18:29.205Z',
//     updatedAt: '2025-07-10T11:18:29.205Z'
//   }
// }