import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import { useGetCurrentTheme } from "@/hooks/theme";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [theme] = useGetCurrentTheme()

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white">
        {/* Set the range color to green */}
        <SliderPrimitive.Range className="absolute h-full"
          style={{ backgroundColor: theme as string }}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-white-500 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        style={{ backgroundColor: theme as string }}
      />
    </SliderPrimitive.Root>
  )
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
