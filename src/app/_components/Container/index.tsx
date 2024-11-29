import type { ElementType, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  as: ElementType;
  className?: string;
}>;

export const Container = ({
  as: Component = "div",
  children,
  className = "",
}: Props) => {
  return (
    <Component
      className={cn(
        "p-8 md:px-12 md:py-12 lg:py-24 max-w-3xl mx-auto relative text-center",
        className
      )}
    >
      {children}
    </Component>
  );
};
