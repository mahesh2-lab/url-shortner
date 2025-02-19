import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-sm outline-none border bg-stone-950 text-white px-3 py-1 text-base shadow-sm transition-colors  file:bg-transparent file:text-sm file:font-medium file:text-stone-950 placeholder:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  dark:file:text-stone-50 dark:placeholder:text-stone-50 dark:focus-visible:ring-stone-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
