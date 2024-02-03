"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useTagsQuery } from "@/queries/use-tags";
import { ScrollShadow, Skeleton } from "@nextui-org/react";

const Tags = () => {
  const container = useRef<HTMLDivElement>(null);
  const { data: tags, isLoading, isError, isRefetching } = useTagsQuery();

  // console.log({
  //   tags,
  //   isLoading,
  //   isError,
  // });

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl sticky top-0 z-50 backdrop-blur-md">
      <ScrollShadow
        orientation="horizontal"
        ref={container}
        id="tags"
        offset={16}
        className="flex items-center py-4 overflow-x-scroll-- snap-x snap-proximity gap-x-2 sm:gap-x-2.5 scrollbar-hide relative"
      >
        {isLoading &&
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((tag) => (
            <Skeleton
              isLoaded={!isLoading}
              className="rounded-lg shrink-0 dark:!bg-default-500/20"
              key={tag}
            >
              <div className="hover:bg-default-500/30 snap-start whitespace-nowrap h-8 inline-flex justify-center items-center bg-default-500/20 rounded-small px-4 transition-all duration-200 animate-appearance-in cursor-pointer font-semibold text-sm">
                <span
                  className="h-4"
                  style={{
                    // random width
                    width: `${Math.floor(Math.random() * 100) + 20}px`,
                  }}
                ></span>
              </div>
            </Skeleton>
          ))}
        {tags?.map((tag) => (
          <Link
            href={`/tag/${tag.id}`}
            key={tag.id}
            className="hover:bg-default-500/30 backdrop-blur-3xl snap-start whitespace-nowrap h-8 inline-flex justify-center items-center dark:bg-default-400/20 rounded-small px-4 transition-all duration-200 animate-appearance-in cursor-pointer font-semibold text-sm"
          >
            {tag.name}
          </Link>
        ))}
      </ScrollShadow>
      {/* <span
        ref={endGradient}
        id="end-gradient"
        className="absolute inline-block inset-y-0 right-0 w-10 pointer-events-none bg-gradient-to-r from-transparent via-background to-background"
      ></span>
      <span
        ref={startGradient}
        id="start-gradient"
        className="absolute inline-block inset-y-0 left-0 w-10 pointer-events-none bg-gradient-to-l from-transparent via-background to-background"
      ></span> */}
    </div>
  );
};

export default Tags;
