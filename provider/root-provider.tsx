"use client"
import React from "react";
import TanstackProvider from "./tanstack-provider";
import { NextUIProvide } from "./next-ui-provider";

const RootProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <NextUIProvide>
        <TanstackProvider>{children}</TanstackProvider>
      </NextUIProvide>
    </>
  );
};

export default RootProvider;
