import db from "../lib/prisma/db";

async function main() {
  // Create tags

  const tag1 = await db.tag.create({ data: { name: "Nature" } });
  const tag2 = await db.tag.create({ data: { name: "Abstract" } });

  // Create categories
  const category1 = await db.category.create({
    data: { name: "Landscapes" },
  });
  const category2 = await db.category.create({
    data: { name: "Digital Art" },
  });

  // Create wallpapers with tags and categories
  const wallpaper1 = await db.wallpaper.create({
    data: {
      url: "https://example.com/wallpaper1.jpg",
      tags: { connect: [{ id: tag1.id }] },
      categories: { connect: [{ id: category1.id }] },
    },
  });

  const wallpaper2 = await db.wallpaper.create({
    data: {
      url: "https://example.com/wallpaper2.jpg",
      tags: { connect: [{ id: tag2.id }] },
      categories: { connect: [{ id: category2.id }] },
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await db.$disconnect();
    process.exit();
  });
