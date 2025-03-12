export function calculateReadingTime(text: string) {
  const words = text.split(/\s+/).length;
  const wordsPerMinute = 200;
  const readingTimeInMinutes = words / wordsPerMinute;

  return Math.ceil(readingTimeInMinutes);
}
