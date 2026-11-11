import { formatDate } from "./formatDate";

export function groupHistoryByDate<T>(
  items: T[],
  getDate: (item: T) => string | Date | null | undefined,
) {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const dateKey = formatDate(getDate(item));
    const group = groups.get(dateKey) ?? [];
    group.push(item);
    groups.set(dateKey, group);
  }

  return [...groups.entries()];
}
