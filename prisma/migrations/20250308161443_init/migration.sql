-- DropIndex
DROP INDEX `Projects_id_key` ON `projects`;

-- AlterTable
ALTER TABLE `projects` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;
