export function detectCompensation(text: string): [string | null, string] {
  const compensation = text.match(/[0-9]{2}\.[0-9]{2}\.[0-9]{2}/i);
  if (compensation !== null) {
    text = text.replace(`Возмещение за ${compensation[0]}`, '');
    return [compensation[0], text];
  }

  return [null, text]
}
