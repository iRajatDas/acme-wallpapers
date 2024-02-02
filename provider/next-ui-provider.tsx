"use client";

import { NextUIProvider } from "@nextui-org/react";

export function NextUIProvide({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
