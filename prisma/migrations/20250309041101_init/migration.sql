/*
  Warnings:

  - A unique constraint covering the columns `[walletId]` on the table `Pin` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `pin` DROP FOREIGN KEY `Pin_walletId_fkey`;

-- DropIndex
DROP INDEX `Pin_walletId_fkey` ON `pin`;

-- CreateIndex
CREATE UNIQUE INDEX `Pin_walletId_key` ON `Pin`(`walletId`);

-- AddForeignKey
ALTER TABLE `Pin` ADD CONSTRAINT `Pin_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `Wallet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
