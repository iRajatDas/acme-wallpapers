"use client";

import { cn } from "@/lib/utils";
import { Orientation } from "@/types/wallpaper";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type Image = {
  image: string;
  alt: string;
  orientation: Orientation;
};

export default function AnimatedNextImage({ image, alt, orientation }: Image) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-xl bg-neutral-two dark:bg-neutral-nine",
        orientation === "VERTICAL" ? "aspect-[2/3]" : "aspect-[4/2]"
      )}
    >
      <Image
        fill={true}
        loading={orientation === "VERTICAL" ? "eager" : "lazy"}
        priority={orientation === "VERTICAL" ? true : false}
        sizes="(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw"
        alt={alt}
        src={image}
        className={clsx(
          "object-cover duration-700 ease-in-out group-hover:cursor-pointer group-hover:opacity-90",
          isLoading
            ? "scale-120 blur-3xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        )}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </figure>
  );
}
