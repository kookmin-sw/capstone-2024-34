/*
  Warnings:

  - You are about to drop the `CustomRule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `time` on the `Analysis` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CustomRule_ruleid_key";

-- DropIndex
DROP INDEX "CustomRule_id_key";

-- DropIndex
DROP INDEX "Rule_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CustomRule";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Rule";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "YaraRule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "rulename" TEXT NOT NULL,
    "rule" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    CONSTRAINT "YaraRule_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Signature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "signature" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Analysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "filename" TEXT NOT NULL,
    "analysis" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "result" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    CONSTRAINT "Analysis_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Analysis" ("analysis", "filename", "id", "reason", "result", "score", "userid") SELECT "analysis", "filename", "id", "reason", "result", "score", "userid" FROM "Analysis";
DROP TABLE "Analysis";
ALTER TABLE "new_Analysis" RENAME TO "Analysis";
CREATE UNIQUE INDEX "Analysis_id_key" ON "Analysis"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "YaraRule_id_key" ON "YaraRule"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Signature_id_key" ON "Signature"("id");
