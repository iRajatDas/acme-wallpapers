import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var globalPrisma: PrismaClient; // <- Name it whatever you want, except "prisma".
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.globalPrisma) {
    global.globalPrisma = new PrismaClient({
      errorFormat: "pretty",
      log: ["query", "info", "warn"],
    });
  }

  prisma = global.globalPrisma;
}

const db = prisma;
export default db;
