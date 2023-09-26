export function displayTime(time: number | null) {
  return time?.toString().padStart(2, '0') ?? '--'
}
