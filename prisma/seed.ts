import db from "../lib/prisma/db";

const sizes = {
  HORIZONTAL: { width: 1920, height: 1080 },
  VERTICAL: { width: 1080, height: 1920 },
};

async function getRandomImage(
  orientation: "HORIZONTAL" | "VERTICAL"
): Promise<string> {
  const { width, height } = sizes[orientation];
  const response = await fetch(`https://picsum.photos/${width}/${height}`);
  return response.url;
}

async function createTag(
  name: string,
  description: string
): Promise<{ id: string }> {
  const existingTag = await db.tag.upsert({
    where: { name },
    create: { name, description },
    update: { name, description },
  });

  return { id: existingTag.id };
}

async function createCategory(
  name: string,
  description: string
): Promise<{ id: string }> {
  const existingCategory = await db.category.upsert({
    where: { name },
    create: { name, description },
    update: { name, description },
  });

  return { id: existingCategory.id };
}

async function main() {
  try {
    // Insert tags
    const tags = await Promise.all(
      [
        "Landscape",
        "Sunset",
        "Mountains",
        "Forest",
        "Geometric",
        "Minimalistic",
        "Colorful",
        "Digital Art",
        "Nebula",
        "Galaxy",
        "Celestial",
        "Planets",
        "Wildlife",
        "Birds",
        "Underwater",
        "Pets",
        "Cyberpunk",
        "Futuristic",
        "Digital",
        "Sci-fi",
        "Cityscape",
        "Architecture",
        "Adventure",
        "Beach",
        "Mythical Creatures",
        "Dragons",
        "Magical Realms",
        "Fairytale",
        "Retro",
        "Classic",
        "Old-fashioned",
        "Nostalgic",
      ].map(async (name, i) => {
        return createTag(
          name,
          `Check out our collection of ${name.toLowerCase()} tag wallpapers.`
        );
      })
    );

    // Insert categories
    const categories = await Promise.all(
      [
        "Nature",
        "Abstract",
        "Space",
        "Animals",
        "Technology",
        "Travel",
        "Fantasy",
        "Vintage",
      ].map(async (name, i) => {
        return createCategory(
          name,
          `Check out our collection of ${name.toLowerCase()} wallpapers.`
        );
      })
    );

    // Insert wallpapers
    const wallpapers = await Promise.all(
      [...Array(160)].map(async (_, i) => {
        const orientation = i < 60 ? "HORIZONTAL" : "VERTICAL";
        const randImg = await getRandomImage(orientation);
        const newWallpaper = await db.wallpaper.create({
          data: {
            title: `Wallpaper ${orientation} ${i + 1}`,
            url: randImg,
            orientation,
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
