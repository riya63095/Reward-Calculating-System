import { calculateRewardPoints } from "../utils/helper";

describe("calculateRewardPoints - Positive test cases", () => {
  test("should return 0 points for amount less than or equal to 50", () => {
    expect(calculateRewardPoints(40)).toBe(0);
  });

  test("should calculate correct points for whole number over 50", () => {
    // For 80 -> (80-50)*1 = 30 points
    expect(calculateRewardPoints(80)).toBe(30);
  });

  test("should calculate correct points for fractional value over $100", () => {
    // For 120.75 -> 50 points (for 50 to 100) + (20.75*2) = 50 + 41.5 = 91.5
    expect(calculateRewardPoints(120.75)).toBe(91.5);
  });
});

describe("calculateRewardPoints - Negative / Edge test cases", () => {
  test("should return 0 for negative values", () => {
    expect(calculateRewardPoints(-10)).toBe(0);
  });

  test("should handle zero correctly", () => {
    expect(calculateRewardPoints(0)).toBe(0);
  });

  test("should return NaN when input is not a number", () => {
    expect(calculateRewardPoints("abc")).toBeNaN();
  });
});
