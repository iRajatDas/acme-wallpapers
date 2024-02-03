import {
  getWallpapers,
  getWallpapersWithPagination,
} from "@/actions/wallpaper";
import { GetWallpapersOptions } from "@/types/wallpaper";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useWallpapersQuery = () => {
  return useQuery({
    queryKey: ["getWallpapers"],
    queryFn: async () => getWallpapers(),
  });
};

export const useWallpapersWithOptionsQuery = (
  options: GetWallpapersOptions
) => {
  return useInfiniteQuery({
    queryKey: ["getWallpapersWithOptions"],
    queryFn: ({ pageParam }) => {
      // console.log({
      //   ...options,
      //   pagination: {
      //     pageSize: 3 * 8,
      //     page: pageParam,
      //   },
      // });
      return getWallpapersWithPagination({
        ...options,
        pagination: {
          pageSize: 3 * 8,
          page: pageParam,
        },
      });
    },
    initialPageParam: 1,
    ...options,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      // console.log({ lastPage });
      return lastPage?.nextCursor;
    },

    getPreviousPageParam: (
      firstPage,
      allPages,
      firstPageParam,
      allPageParams
    ) => {
      return firstPage?.prevCursor;
    },
  });
};
