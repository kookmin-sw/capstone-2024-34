-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Signature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "signature" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0 -- 기본값을 0으로 설정
);
INSERT INTO "new_Signature" ("createdAt", "id", "signature", "updatedAt", "count") 
    SELECT "createdAt", "id", "signature", "updatedAt", 0 FROM "Signature"; -- count 값을 0으로 설정하여 데이터 이동
DROP TABLE "Signature";
ALTER TABLE "new_Signature" RENAME TO "Signature";
CREATE UNIQUE INDEX "Signature_id_key" ON "Signature"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
