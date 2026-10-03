import type { LabItem } from "./types";

// Lab 只记录真实工作过程。暂无已确认条目的分区保持为空，UI 显示低调的待记录状态。
export const labItems: LabItem[] = [];

export function labByCategory(category: LabItem["category"]): LabItem[] {
  return labItems.filter((item) => item.category === category);
}
