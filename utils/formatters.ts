// Zero padding for numbers
export const pad = (number: number): string => {
  return number < 10 ? `0${number}` : `${number}`;
}

// Convert number to datetime offset
export const numberToOffset = (number: number | undefined): string => {
  if (!number) return "+00:00";
  const sign = number < 0 ? "-" : "+";
  const abs = Math.abs(number);
  const hours = Math.floor(Math.abs(abs));
  const minutes = Math.floor((abs - hours) * 60);
  return `${sign}${pad(hours)}:${pad(minutes)}`;
}

// Convert date to string with offset
export const dateToString = (date?: Date | string | null, offset?: number): string | null => {
  if (!(date instanceof Date)) return null;
  const newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  if (!offset) return newDate.toISOString();
  const timeOffset = numberToOffset(offset);
  return newDate.toISOString().replace("Z", timeOffset);
}

// Convert datetime to string with offset
export const dateTimeToString = (date: Date | string | null, parseTimezone: any, eventTimezone?: string): string | null => {
  if (!(date instanceof Date)) return null;
  const localOffset = new Date().getTimezoneOffset();
  const eventOffset = parseTimezone((eventTimezone as string).split(" - ")[0]).offset * 60;
  const offset = eventOffset + localOffset;
  const newDate = new Date(date.getTime() - offset * 60000);
  return newDate.toISOString().replace(".000Z", "Z");
}

// Convert string to datetime
export const stringToDateTime = (parseTimezone: any, date?: string, eventTimezone?: string): Date | null => {
  if (!date) return null;
  const localOffset = new Date().getTimezoneOffset();
  const eventOffset = parseTimezone((eventTimezone as string).split(" - ")[0]).offset * 60;
  const offset = eventOffset + localOffset;
  const newDate = new Date((new Date(date)).getTime() + offset * 60000);
  return newDate;
}

// Convert iso string to datetime string
export const dateStringToDatetime = (iso: string) => {
  const [date, time] = iso.split("T");
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");
  return `${day}-${month}-${year} ${hour}:${minute}`
}

// Helper variables to calculate time difference
const units = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "week", seconds: 604800 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 }
];

// Calculate time elapsed
const calculateTimeDifference = (time: number) => {
  for (let { label, seconds } of units) {
    const interval = Math.floor(time / seconds);
    if (interval >= 1) {
      return {
        interval: interval,
        unit: label
      };
    }
  }
  return {
    interval: 0,
    unit: ""
  };
};

// Convert date to time ago string
export const timeAgo = (date: string | number | Date) => {
  const time = Math.floor(
    (new Date().valueOf() - new Date(date).valueOf()) / 1000
  );
  const { interval, unit } = calculateTimeDifference(time);
  const suffix = interval === 1 ? "" : "s";
  return `${interval} ${unit}${suffix} ago`;
};
