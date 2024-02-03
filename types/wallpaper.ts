import { Wallpaper } from "@prisma/client";

export type SortField =
  | "views"
  | "downloads"
  | "impressions"
  | "orientation"
  | "category"
  | "tag";

export type SortOrder = "asc" | "desc";

export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface SortOptions {
  field: SortField;
  order: SortOrder;
}

export interface FilterOptions {}

type Orientation = "VERTICAL" | "HORIZONTAL" | "SQUARE";
export interface GetWallpapersOptions {
  nextCursor?: number;
  prevCursor?: number;
  allPages?: number;

  pagination: PaginationOptions;
  sort?: SortOptions[];
  filter?: FilterOptions;
  orientation?: Orientation;
}

export interface WithPagination {
  nextCursor?: number | null;
  prevCursor?: number | null;
  allPages?: number;
  wallpapers: Wallpaper[];
}
