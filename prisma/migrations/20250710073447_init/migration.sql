-- CreateEnum
CREATE TYPE "Status" AS ENUM ('in_progress', 'completed', 'overdue');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserClient" (
    "userId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "UserClient_pkey" PRIMARY KEY ("userId","clientId")
);

-- CreateTable
CREATE TABLE "ClientEntry" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "note" TEXT,
    "tag1" TEXT,
    "tag2" TEXT,
    "tag3" TEXT,
    "tag4" TEXT,
    "tag5" TEXT,
    "tag6" TEXT,
    "tag7" TEXT,
    "tag8" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagTimer" (
    "id" TEXT NOT NULL,
    "clientEntryId" TEXT NOT NULL,
    "tagField" INTEGER NOT NULL,
    "tagValue" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "durationMins" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagTimer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientEntry" ADD CONSTRAINT "ClientEntry_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagTimer" ADD CONSTRAINT "TagTimer_clientEntryId_fkey" FOREIGN KEY ("clientEntryId") REFERENCES "ClientEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
