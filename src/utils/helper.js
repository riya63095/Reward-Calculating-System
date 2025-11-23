export const calculateRewardPoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2;
    points += 50;
  } else if (amount > 50) {
    points += amount - 50;
  }
  return points;
};

export const monthYearKey = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export const monthName = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getLastNMonths = (n = 3, fromDate = new Date()) => {
  const months = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(fromDate.getFullYear(), fromDate.getMonth() - i, 1);
    months.push(monthName[d.getMonth()]);
  }
  return months;
};

export const getShortMonthName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", { month: "short" });
};
