import format from "date-fns/format";

export function getLocalTime(timeIsoString: string): Date {
  const splits: string[] = timeIsoString.split(".");
  return new Date(new Date(splits[0] + ".000Z").toString());
}

export function formatDate(date: Date): string {
  return format(date, "MMM dd yyyy, hh:mm aaa");
}
