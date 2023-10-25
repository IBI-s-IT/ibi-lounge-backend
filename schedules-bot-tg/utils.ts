import { redisInstance } from "./index";

export async function cachedRequest<T>(
  key: string,
  fetchData: () => Promise<T>,
  ttl: number = 3600 * 12,
  retryN: number = 0,
): Promise<T> {
  let cached = await redisInstance.get(key);

  if (cached === null || cached.length === 0) {
    const data = await fetchData();

    // @ts-ignore
    if ("error" in data && data.error !== "no_schedules") {
      if (retryN > 4) {
        console.error(data);
        throw new Error("Something happened while fetching data");
      }
      return cachedRequest(key, fetchData, ttl, retryN + 1);
    }

    cached = JSON.stringify(data);
    redisInstance.set(key, cached, "EX", ttl);
  }

  return JSON.parse(cached) as T;
}

export function getTimeFromDate(date: Date) {
  date = new Date(date);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}
