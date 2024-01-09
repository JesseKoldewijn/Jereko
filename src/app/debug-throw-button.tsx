"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";

type DebugThrowButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  messageOnError?: string;
  children?: React.ReactNode;
};

const DebugThrowButton = ({
  messageOnError,
  children,
  ...props
}: DebugThrowButtonProps) => {
  const { className, ...rest } = props;
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error(messageOnError ?? "Debug throw button");
  }

  const throwOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsError(true);
  };

  return (
    <button
      className={cn(className, "fixed bottom-4 left-4")}
      onClick={throwOnClick}
      {...rest}
    >
      {children ?? "Throw error"}
    </button>
  );
};

export default DebugThrowButton;
