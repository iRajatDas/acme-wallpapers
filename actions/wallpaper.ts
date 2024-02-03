"use server";
import db from "@/lib/prisma/db";
import { GetWallpapersOptions, WithPagination } from "@/types/wallpaper";
import { Category, Wallpaper } from "@prisma/client";

// Get all wallpapers

export const getWallpapers = async (): Promise<Wallpaper[]> => {
  const wallpapers = await db.wallpaper.findMany();

  if (wallpapers?.length === 0) {
    return [];
  }

  return wallpapers;
};

// get all wallpapers with pagination and sorting by views, downloads, impressions, orientation, category, tag, etc

export async function getWallpapersWithPagination(
  options: GetWallpapersOptions
): Promise<WithPagination> {
  const {
    pagination: { page, pageSize },
    sort,
    orientation,
  } = options;

  // Build Prisma query object
  const prismaQuery = {
    take: pageSize,
    skip: (page - 1) * pageSize,
    where: {
      orientation,
    },
    orderBy: sort?.map((s) => ({ [s.field]: s.order })),
  };

  // Get total number of wallpapers without pagination
  const totalWallpapersCount = await db.wallpaper.count({
    where: {
      orientation,
    },
  });

  // Fetch wallpapers with pagination and sorting
  const wallpapers = await db.wallpaper.findMany(prismaQuery);

  // Calculate next and previous cursor values
  const totalPages = Math.ceil(totalWallpapersCount / pageSize);
  const nextCursor = page <= totalPages ? page + 1 : null;
  const prevCursor = page >= 1 ? page - 1 : null;

  const withPagination: WithPagination = {
    wallpapers,
    nextCursor,
    prevCursor,
    allPages: totalPages,
  };

  return withPagination;
}

// Get a single wallpaper
export const getWallpaper = async (id: string): Promise<Wallpaper | null> => {
  const wallpaper = await db.wallpaper.findUnique({
    where: { id },
  });

  if (!wallpaper) {
    return null;
  }

  return wallpaper;
};

// Create a new wallpaper
export const createWallpaper = async (data: Wallpaper): Promise<Wallpaper> => {
  const wallpaper = await db.wallpaper.create({
    data,
  });

  return wallpaper;
};

// Update a wallpaper
export const updateWallpaper = async (
  id: string,
  data: Wallpaper
): Promise<Wallpaper | null> => {
  const wallpaper = await db.wallpaper.update({
    where: { id },
    data,
  });

  if (!wallpaper) {
    return null;
  }

  return wallpaper;
};

// Delete a wallpaper
export const deleteWallpaper = async (
  id: string
): Promise<Wallpaper | null> => {
  const wallpaper = await db.wallpaper.delete({
    where: { id },
  });

  if (!wallpaper) {
    return null;
  }

  return wallpaper;
};

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  const categories = await db.category.findMany();

  if (categories?.length === 0) {
    return [];
  }

  return categories;
};

// Get a single category
export const getCategory = async (id: string): Promise<Category | null> => {
  const category = await db.category.findUnique({
    where: { id },
  });

  if (!category) {
    return null;
  }

  return category;
};

// Create a new category

export const createCategory = async (data: Category): Promise<Category> => {
  const category = await db.category.create({
    data,
  });

  return category;
};

// Update a category
export const updateCategory = async (
  id: string,
  data: Category
): Promise<Category | null> => {
  const category = await db.category.update({
    where: { id },
    data,
  });

  if (!category) {
    return null;
  }

  return category;
};

// Delete a category
export const deleteCategory = async (id: string): Promise<Category | null> => {
  const category = await db.category.delete({
    where: { id },
  });

  if (!category) {
    return null;
  }

  return category;
};

// Get wallpapers by category
export const getWallpapersByCategoryId = async (
  category: string
): Promise<Wallpaper[]> => {
  const wallpapers = await db.wallpaper.findMany({
    where: {
      id: category,
    },
  });

  if (wallpapers?.length === 0) {
    return [];
  }

  return wallpapers;
};

// Get wallpapers by tag
export const getWallpapersByTagId = async (
  tag: string
): Promise<Wallpaper[]> => {
  const wallpapers = await db.wallpaper.findMany({
    where: {
      id: tag,
    },
  });

  if (wallpapers?.length === 0) {
    return [];
  }

  return wallpapers;
};

// Get all tags
export const getTags = async (): Promise<Category[]> => {
  const tags = await db.tag.findMany();

  if (tags?.length === 0) {
    return [];
  }

  return tags;
};

// Get a single tag
export const getTag = async (id: string): Promise<Category | null> => {
  const tag = await db.tag.findUnique({
    where: { id },
  });

  if (!tag) {
    return null;
  }

  return tag;
};

// Create a new tag

export const createTag = async (data: Category): Promise<Category> => {
  const tag = await db.tag.create({
    data,
  });

  return tag;
};

// Update a tag
export const updateTag = async (
  id: string,
  data: Category
): Promise<Category | null> => {
  const tag = await db.tag.update({
    where: { id },
    data,
  });

  if (!tag) {
    return null;
  }

  return tag;
};

// Delete a tag
export const deleteTag = async (id: string): Promise<Category | null> => {
  const tag = await db.tag.delete({
    where: { id },
  });

  if (!tag) {
    return null;
  }

  return tag;
};

// Get wallpapers by views
export const getMostViewedWallpapers = async (): Promise<Wallpaper[]> => {
  const wallpapers = await db.wallpaper.findMany({
    orderBy: {
      views: "desc",
    },
  });

  if (wallpapers?.length === 0) {
    return [];
  }

  return wallpapers;
};

// Add a view to a wallpaper
export const addViewToWallpaper = async (id: string): Promise<Wallpaper> => {
  const wallpaper = await db.wallpaper.update({
    where: { id },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  return wallpaper;
};

export const getMostDownloadedWallpapers = async (): Promise<Wallpaper[]> => {
  const wallpapers = await db.wallpaper.findMany({
    orderBy: {
      downloads: "desc",
    },
  });

  if (wallpapers?.length === 0) {
    return [];
  }

  return wallpapers;
};

// Add a download to a wallpaper
export const addDownloadToWallpaper = async (
  id: string
): Promise<Wallpaper> => {
  const wallpaper = await db.wallpaper.update({
    where: { id },
    data: {
      downloads: {
        increment: 1,
      },
    },
  });

  return wallpaper;
};

export const getWallpapersWithMostImpressions = async (): Promise<
  Wallpaper[]
> => {
  const wallpapers = await db.wallpaper.findMany({
    orderBy: {
      impressions: "desc",
    },
  });

  if (wallpapers?.length === 0) {
    return [];
  }

  return wallpapers;
};

// Add an impression to a wallpaper
export const addImpressionToWallpaper = async (
  id: string
): Promise<Wallpaper> => {
  const wallpaper = await db.wallpaper.update({
    where: { id },
    data: {
      impressions: {
        increment: 1,
      },
    },
  });

  return wallpaper;
};

/** Statastical Data **/

// Get total number of wallpapers
export const getTotalWallpapers = async (): Promise<number> => {
  const totalWallpapers = await db.wallpaper.count();

  return totalWallpapers;
};

// Get total number of views

export const getTotalViews = async (): Promise<number> => {
  const totalViews = await db.wallpaper.aggregate({
    _sum: {
      views: true,
    },
  });

  return totalViews._sum.views ?? 0;
};

// Get total number of downloads
export const getTotalDownloads = async (): Promise<number> => {
  const totalDownloads = await db.wallpaper.aggregate({
    _sum: {
      downloads: true,
    },
  });

  return totalDownloads._sum.downloads ?? 0;
};

// Get total number of impressions
export const getTotalImpressions = async (): Promise<number> => {
  const totalImpressions = await db.wallpaper.aggregate({
    _sum: {
      impressions: true,
    },
  });

  return totalImpressions._sum.impressions ?? 0;
};

// Get total number of wallpapers by category
export const getTotalWallpapersByCategory = async (
  category: string
): Promise<number> => {
  const totalWallpapers = await db.wallpaper.count({
    where: {
      id: category,
    },
  });

  return totalWallpapers;
};

// Get total number of wallpapers by tag
export const getTotalWallpapersByTag = async (tag: string): Promise<number> => {
  const totalWallpapers = await db.wallpaper.count({
    where: {
      id: tag,
    },
  });

  return totalWallpapers;
};
