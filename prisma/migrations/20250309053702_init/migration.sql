/*
  Warnings:

  - A unique constraint covering the columns `[reference]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `transaction` MODIFY `type` ENUM('AIRTIME', 'DATA', 'ELECTRICITY', 'GIFT_CARD', 'CRYPTO', 'WALLET_TOPUP') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Transaction_reference_key` ON `Transaction`(`reference`);
