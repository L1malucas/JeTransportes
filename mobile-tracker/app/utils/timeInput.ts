export function formatTime(value: string): string {
  let digitsOnly = value.replace(/\D/g, "");

  if (digitsOnly.length > 4) {
    digitsOnly = digitsOnly.slice(0, 4);
  }

  if (digitsOnly.length >= 3) {
    return digitsOnly.slice(0, 2) + ":" + digitsOnly.slice(2);
  } else {
    return digitsOnly;
  }
}
