export interface Position {
  name: string;
  apr: number;
  positionSize: number;
}

export interface ReturnStats {
  hourly: number;
  daily: number;
  weekly: number;
  monthly: number;
}

export const calculateHourlyRate = (apr: number, positionSize: number): number => {
  const hourlyApr = (apr / 100) / (365 * 24);
  return hourlyApr * positionSize;
};

export const calculateReturnStats = (apr: number, positionSize: number): ReturnStats => {
  const hourly = calculateHourlyRate(apr, positionSize);
  // Calculate other periods directly from hourly rate
  const daily = hourly * 24;
  const weekly = hourly * (24 * 7);
  const monthly = hourly * (24 * 30.44); // Average days in a month (365.25/12)

  return {
    hourly,
    daily,
    weekly,
    monthly
  };
};

export const calculateTotalReturnStats = (positions: Position[]): ReturnStats => {
  return positions.reduce((total, position) => {
    const stats = calculateReturnStats(position.apr, position.positionSize);
    return {
      hourly: total.hourly + stats.hourly,
      daily: total.daily + stats.daily,
      weekly: total.weekly + stats.weekly,
      monthly: total.monthly + stats.monthly
    };
  }, { hourly: 0, daily: 0, weekly: 0, monthly: 0 });
};