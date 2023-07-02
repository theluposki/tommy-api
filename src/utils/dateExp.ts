export const dateExp = (expire: string): string => {
  const now: number = Math.floor(Date.now() / 1000);
  const remainingTime: number = parseInt(expire) - now;

  // Convert the remaining time to hours and minutes
  const remainingMinutes: number = Math.floor(remainingTime / 60);
  const remainingHours: number = Math.floor(remainingMinutes / 60);
  const remainingMinutesAfterLastHour: number = remainingMinutes % 60;

  // Display the appropriate message based on the remaining time
  if (remainingHours > 0) {
    return `The token expires in ${remainingHours} hours and ${remainingMinutesAfterLastHour} minutes`;
  } else if (remainingMinutesAfterLastHour > 0) {
    return `The token expires in ${remainingMinutesAfterLastHour} minutes`;
  } else {
    return 'The token has expired';
  }
};
