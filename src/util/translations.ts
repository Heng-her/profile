export function getTimeOfDay(): "morning" | "afternoon" | "evening" | "night" {
  const hour = new Date().getHours();

  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  if (hour < 20) return "evening";
  return "night";
}
