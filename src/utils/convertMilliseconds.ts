export default function convertMilliseconds(milliseconds: number) {
  const seconds = milliseconds / 1000;

  if (seconds < 60) {
    return seconds;
  }

  const minutes = seconds / 60
  const remainingSeconds = seconds % 60;

  if (minutes < 60) {
    return  `${minutes.toFixed(0)}:${Math.round(remainingSeconds).toString().padStart(2,"0")}`
   }

  const hours = minutes / 60;

  if (hours < 24) {
    return hours;
  }

  return NaN
}
