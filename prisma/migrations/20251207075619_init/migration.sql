-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "previewImage" TEXT,
    "favicon" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT,
    "subdomain" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_subdomain_key" ON "Page"("subdomain");

-- CreateIndex
CREATE INDEX "Page_id_userId_idx" ON "Page"("id", "userId");
