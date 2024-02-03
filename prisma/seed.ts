import db from "../lib/prisma/db";

async function getRandomImage(): Promise<string> {
  const response = await fetch("https://picsum.photos/1080/1920");
  return response.url;
}

async function main() {
  try {
    // Insert tags
    const tags = await Promise.all(
      [...Array(3)].map(async (_, i) => {
        const newTag = await db.tag.create({
          data: { name: `Tag Vert ${i + 1}`, description: "Sample Vert tag" },
        });
        return { id: newTag.id };
      })
    );

    // Insert categories
    const categories = await Promise.all(
      [...Array(5)].map(async (_, i) => {
        const newCategory = await db.category.create({
          data: {
            name: `Category Vert ${i + 1}`,
            description: "Sample Vert category",
          },
        });
        return { id: newCategory.id };
      })
    );

    // Insert wallpapers
    const wallpapers = await Promise.all(
      [...Array(160)].map(async (_, i) => {
        const randImg = await getRandomImage();
        const newWallpaper = await db.wallpaper.create({
          data: {
            title: `Wallpaper Vert ${i + 1}`,
            url: randImg,
            tags: {
              connect: tags
                .sort(() => Math.random() - 0.5)
                .slice(0, Math.floor(Math.random() * 3) + 1),
            },
            categories: {
              connect: categories
                .sort(() => Math.random() - 0.5)
                .slice(0, Math.floor(Math.random() * 3) + 1),
            },
          },
        });
        return newWallpaper;
      })
    );

    console.log("Tags created:", tags.length);
    console.log("Categories created:", categories.length);
    console.log("Wallpapers created:", wallpapers.length);

    console.log("Seed data created successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await db.$disconnect();
    process.exit(0);
  }
}

main();

async function deSeed() {
  try {
    await db.wallpaper.deleteMany();
    await db.tag.deleteMany();
    await db.category.deleteMany();
    console.log("Seed data deleted successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

// deSeed();
