/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `WaitList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `WaitList_email_key` ON `WaitList`(`email`);
