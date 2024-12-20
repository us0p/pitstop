/*
  Warnings:

  - Added the required column `delivered` to the `VehicleMessageOutbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VehicleMessageOutbox" ADD COLUMN     "delivered" BOOLEAN NOT NULL;
