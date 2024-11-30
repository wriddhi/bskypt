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
        "p-8 md:p-12 lg:py-24 max-w-2xl mx-auto relative text-left",
        className
      )}
    >
      {children}
    </Component>
  );
};
