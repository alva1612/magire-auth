/*
  Warnings:

  - You are about to drop the column `phone_country` on the `User` table. All the data in the column will be lost.
  - Added the required column `phoneCountry` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone_country",
ADD COLUMN     "phoneCountry" TEXT NOT NULL;
