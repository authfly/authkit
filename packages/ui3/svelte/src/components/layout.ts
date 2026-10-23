export type Gap = "0" | "2" | "4" | "6" | "8";
export const gapCls: Record<Gap, string> = { "0": "gap-0", "2": "gap-2", "4": "gap-4", "6": "gap-6", "8": "gap-8" };
export const alignCls = { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" } as const;
export const justifyCls = { start: "justify-start", center: "justify-center", end: "justify-end", between: "justify-between" } as const;
export type Align = keyof typeof alignCls;
export type Justify = keyof typeof justifyCls;
