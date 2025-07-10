import { PrismaClient, Status } from '@prisma/client';
import { sampleData } from '../lib/data';

const prisma = new PrismaClient();

async function main() {
  // Clear all data (order matters due to FKs)
  console.log('Clearing TagTimer...');
  await prisma.tagTimer.deleteMany({});
  console.log('Clearing ClientEntry...');
  await prisma.clientEntry.deleteMany({});
  console.log('Clearing UserClient...');
  await prisma.userClient.deleteMany({});
  console.log('Clearing Client...');
  await prisma.client.deleteMany({});
  console.log('Clearing User...');
  await prisma.user.deleteMany({});

  console.log('Seeding sampleData...');
  for (const [i, client] of sampleData.entries()) {
    console.log(`Creating client: ${client.name}`);
    const createdClient = await prisma.client.create({
      data: {
        name: client.name,
        entries: {
          create: [{
            status: (client.status?.toLowerCase().replace(' ', '_') as Status) || 'in_progress',
            note: Array.isArray(client.noteLink) ? (client.noteLink[1] || null) : null,
            tag1: client.tags?.[0]?.tag1 || null,
            tag2: client.tags?.[1]?.tag2 || null,
            tag3: client.tags?.[2]?.tag3 || null,
            tag4: client.tags?.[3]?.tag4 || null,
            tag5: client.tags?.[4]?.tag5 || null,
            tag6: client.tags?.[5]?.tag6 || null,
            tag7: client.tags?.[6]?.tag7 || null,
            tag8: client.tags?.[7]?.tag8 || null,
            createdAt: client.lastUpdated ? new Date(client.lastUpdated) : undefined,
            updatedAt: client.lastTagUpdate ? new Date(client.lastTagUpdate) : undefined,
          }],
        },
        createdAt: client.lastUpdated ? new Date(client.lastUpdated) : undefined,
      },
    });
    console.log(`Client created: ${createdClient.id}`);
  }
  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
