const leadingZero = (num: number) => `0${num}`.slice(-2);

export function detectCustomTime(
  input: string
): [string, string, string] | undefined {
  const custom_time = input.match(/[0-9]{2}[-:.][0-9]{2}/);

  if (custom_time) {
    const hour_minutes = custom_time[0].split(/[-:.]/);
    const time_start_date_c = new Date(
      new Date().setHours(Number(hour_minutes[0]), Number(hour_minutes[1]))
    );
    const time_end_date_c = new Date(time_start_date_c.getTime() + 60000 * 90);

    const match = input.match(/,*\s+начало в [0-9]{2}[-:.][0-9]{2}?( час)?!*/i);
    if (match) {
      input = input.replace(match[0], '');
    }

    return [
      [time_start_date_c.getHours(), time_start_date_c.getMinutes()]
        .map(leadingZero)
        .join(':'),
      [time_end_date_c.getHours(), time_end_date_c.getMinutes()]
        .map(leadingZero)
        .join(':'),
      input,
    ];
  }

  return undefined;
}
