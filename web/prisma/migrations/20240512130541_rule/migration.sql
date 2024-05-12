-- CreateTable
CREATE TABLE "CustomRule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userid" TEXT NOT NULL,
    "ruleid" TEXT NOT NULL,
    CONSTRAINT "CustomRule_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CustomRule_ruleid_fkey" FOREIGN KEY ("ruleid") REFERENCES "Rule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "time" DATETIME NOT NULL,
    "rulename" TEXT NOT NULL,
    "rule" TEXT NOT NULL,
    "isuser" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomRule_id_key" ON "CustomRule"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomRule_ruleid_key" ON "CustomRule"("ruleid");

-- CreateIndex
CREATE UNIQUE INDEX "Rule_id_key" ON "Rule"("id");
