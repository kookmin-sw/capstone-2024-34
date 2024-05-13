-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "time" DATETIME NOT NULL,
    "filename" TEXT NOT NULL,
    "analysis" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "result" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    CONSTRAINT "Analysis_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_id_key" ON "Analysis"("id");
