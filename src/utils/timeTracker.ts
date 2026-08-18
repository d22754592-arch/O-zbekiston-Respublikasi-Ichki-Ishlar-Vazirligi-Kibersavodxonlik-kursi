/**
 * Active Learning Time Tracker Utility
 * Accurately measures time spent by the student while the tab is active.
 */

export function formatStudyTime(seconds: number): string {
  if (!seconds || seconds <= 0) return "0 daqiqa";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs} soat ${mins} daqiqa`;
  }
  if (mins > 0) {
    return `${mins} daqiqa ${secs > 0 ? `${secs} soniya` : ''}`.trim();
  }
  return `${secs} soniya`;
}

export function formatStudyTimeShort(seconds: number): string {
  if (!seconds || seconds <= 0) return "0 daq";

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);

  if (hrs > 0) {
    return `${hrs}s ${mins}d`;
  }
  return `${mins} daq`;
}
