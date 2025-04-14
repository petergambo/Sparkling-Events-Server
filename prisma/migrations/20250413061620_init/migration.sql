/*
  Warnings:

  - A unique constraint covering the columns `[otp]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `phone` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `User_otp_key` ON `User`(`otp`);
