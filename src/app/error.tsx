"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

// Plain-language error state (design-guidelines.md, H9): say what happened and
// what to do next. Never show the raw error to the user.
export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="flex flex-col items-start gap-4">
      <h1 className="text-3xl font-bold tracking-tight">
        Something went wrong
      </h1>
      <p className="max-w-prose text-muted-foreground">
        This page couldn&apos;t load. Check your connection and try again.
      </p>
      <Button onClick={() => retry()}>Try again</Button>
    </div>
  );
}
