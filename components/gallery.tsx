"use client";
import { cn } from "@/lib/utils";
import { useWallpapersWithOptionsQuery } from "@/queries/use-wallpapers";
import { GetWallpapersOptions } from "@/types/wallpaper";
import { Skeleton } from "@nextui-org/react";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

import React, { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedNextImage from "./animated-next-image";

export default function Gallery() {
  const DEF: GetWallpapersOptions = {
    pagination: {
      page: 1,
      pageSize: 3 * 8,
    },
    sort: [
      { field: "views", order: "desc" },
      { field: "downloads", order: "asc" },
      { field: "orientation", order: "asc" },
    ],
    filter: {},
    orientation: "VERTICAL",
  };
  const [options, setOptions] = useState<GetWallpapersOptions>(DEF);

  const {
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    data: wallpapers,
  } = useWallpapersWithOptionsQuery(options);

  return (
    <div
      className={cn(
        "mx-auto max-w-2xl py-4 lg:py-8 px-4 sm:px-6 lg:max-w-7xl space-y-6 lg:space-y-8",
        // 2nd div
        "[&>*:nth-child(2)]:overflow-hidden-"
      )}
    >
      <div className="space-y-2.5">
        {isLoading ? (
          <Skeleton
            isLoaded={!isLoading}
            className="rounded-lg shrink-0 w-fit dark:!bg-default-500/20"
          >
            <div className="w-56 h-10"></div>
          </Skeleton>
        ) : (
          <h2 className="text-3xl font-bold tracking-tight text-neutral-100 sm:text-4xl">
            Explore Wallpapers
          </h2>
        )}

        {isLoading ? (
          <Skeleton
            isLoaded={!isLoading}
            className="rounded-lg shrink-0 w-1/3 dark:!bg-default-500/20"
          >
            <div className="h-6 w-1/4"></div>
          </Skeleton>
        ) : (
          <p className="text-neutral-300 text-sm lg:text-base">
            Here are some wallpapers that you can use for your desktop or mobile
          </p>
        )}
      </div>
      {/* Gallery */}

      {/* {isLoading &&
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((tag) => (
            <Skeleton
              isLoaded={!isLoading}
              className="rounded-lg shrink-0 dark:!bg-default-500/20"
              key={tag}
            >
              <div
                className={cn(
                  "hover:bg-default-500/30 snap-start w-full h-full whitespace-nowrap inline-flex justify-center items-center bg-default-500/20 rounded-small px-4 transition-all duration-200 animate-appearance-in cursor-pointer font-semibold text-sm",
                  options.orientation === "VERTICAL"
                    ? "aspect-[2/3]"
                    : "aspect-[4/2]"
                )}
              >
                <span
                  className="h-4"
                  style={
                    {
                      // random width
                      // width: `${Math.floor(Math.random() * 100) + 20}px`,
                    }
                  }
                ></span>
              </div>
            </Skeleton>
          ))} */}

      <InfiniteScroll
        scrollThreshold={0.9}
        dataLength={wallpapers?.pages.length ?? 0}
        next={fetchNextPage}
        hasMore={isFetching || hasNextPage}
        className={cn(
          "grid gap-4 md:gap-6 lg:gap-8 !overflow-hidden",
          options.orientation === "VERTICAL"
            ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}
        loader={
          <GalleryLoaderState
            options={options}
            isLoading={isFetching || !isFetchingNextPage}
          />
        }
        endMessage={
          <AnimatePresence>
            <motion.div
              key="end-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="p-4 sm:p-8 grid place-items-center w-full col-span-full">
                <div className="max-w-7xl relative mx-auto py-8 md:py-16 px-4 w-full text-center">
                  <h1 className="text-2xl md:text-5xl font-bold dark:text-white">
                    No more wallpapers, huh?
                  </h1>
                  <p className="max-w-lg mx-auto text-sm sm:text-lg md:text-xl mt-2.5 md:mt-8 dark:text-neutral-200">
                    Guess you&apos;ve seen it all. Time to go outside and
                    experience the real pixels of life!
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        }
        initialScrollY={0}
        // refreshFunction={refetch}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        // }
      >
        {wallpapers?.pages.map((page) => (
          <React.Fragment key={page.nextCursor}>
            {page?.wallpapers.map((image) => (
              <Link
                key={image.id}
                href={`/wallpapers/${image.id}`}
                className={cn(
                  options.orientation === "VERTICAL"
                    ? "aspect-[2/3]"
                    : "aspect-[4/2]"
                )}
              >
                <AnimatedNextImage
                  image={image.url}
                  alt={image.title ?? image.description ?? "image"}
                  orientation={options.orientation ?? "VERTICAL"}
                />
                {/* <Image
                  // as={NextImage}
                  alt={image.title ?? image.description ?? "image"}
                  key={image.id}
                  src={image.url}
                  height={
                    options.orientation === "VERTICAL" ? 3 * 100 : 2 * 100
                  }
                  width={options.orientation === "VERTICAL" ? 2 * 100 : 4 * 100}
                  classNames={{
                    wrapper: "!max-w-full h-full",
                  }}
                  // loading="lazy"
                  isBlurred
                  className={cn(
                    "object-cover origin-center h-full w-full",
                    options.orientation === "VERTICAL"
                      ? "aspect-[2/3]"
                      : "aspect-[4/2]"
                  )}
                /> */}
              </Link>
            ))}
          </React.Fragment>
        ))}
      </InfiniteScroll>

      {/* <div className="p-4 sm:p-8 grid place-items-center" ref={ref}>
        {!isFetchingNextPage && hasNextPage ? (
          <Spinner />
        ) : (
          <>
            {!isLoading && !isFetchingNextPage && (
              <div className="max-w-7xl relative mx-auto py-8 md:py-16 px-4 w-full text-center">
                <h1 className="text-2xl md:text-5xl font-bold dark:text-white">
                  No more wallpapers, huh?
                </h1>
                <p className="max-w-lg mx-auto text-sm sm:text-lg md:text-xl mt-2.5 md:mt-8 dark:text-neutral-200">
                  Guess you&apos;ve seen it all. Time to go outside and
                  experience the real pixels of life!
                </p>
              </div>
            )}
          </>
        )}
      </div> */}
    </div>
  );
}

interface GalleryLoaderProps {
  options: GetWallpapersOptions;
  isLoading: boolean;
}

const GalleryLoaderState: FC<GalleryLoaderProps> = ({ options, isLoading }) => {
  return (
    <>
      {[...Array(16)].map((tag, index) => (
        <Skeleton
          isLoaded={!isLoading}
          className="rounded-lg shrink-0 dark:!bg-default-500/20"
          key={index}
        >
          <div
            className={cn(
              "hover:bg-default-500/30 snap-start w-full h-full whitespace-nowrap inline-flex justify-center items-center bg-default-500/20 rounded-small px-4 transition-all duration-200 animate-appearance-in cursor-pointer font-semibold text-sm",
              options.orientation === "VERTICAL"
                ? "aspect-[2/3]"
                : "aspect-[4/2]"
            )}
          >
            <span
              className="h-4"
              style={
                {
                  // random width
                  // width: `${Math.floor(Math.random() * 100) + 20}px`,
                }
              }
            ></span>
          </div>
        </Skeleton>
      ))}
    </>
  );
};
