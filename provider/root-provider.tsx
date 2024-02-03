"use client";
import React from "react";
import TanstackProvider from "./tanstack-provider";
import { NextUIProvide } from "./next-ui-provider";

const RootProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <TanstackProvider>
        <NextUIProvide>{children}</NextUIProvide>
      </TanstackProvider>
    </>
  );
};

export default RootProvider;
