import type { Icon, SVGProps } from "../icons";

export type GetIcon = (
  icon: Icon,
  size: number,
  color: string,
  className?: string,
) => SVGProps;
