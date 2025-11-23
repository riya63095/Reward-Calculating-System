import React, { useEffect, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Box,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const generateYears = (startYear = 2021, count = 5) => {
  return Array.from({ length: count }, (_, i) => startYear + i).reverse();
};

const FilterBar = ({ onFilterChange }) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [useLastThreeMonths, setUseLastThreeMonths] = useState(true);


  useEffect(() => {
    onFilterChange({
      month: selectedMonth,
      year: selectedYear,
      last3Months: useLastThreeMonths,
    });
  }, [selectedMonth, selectedYear, useLastThreeMonths]);

  return (
    <Box display="flex" gap={2} alignItems="center" sx={{ mb: 2, mt: 10 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={useLastThreeMonths}
            onChange={(e) => setUseLastThreeMonths(e.target.checked)}
          />
        }
        label="Last 3 Months"
      />

      <FormControl
        size="small"
        sx={{ minWidth: 120 }}
        disabled={useLastThreeMonths}
      >
        <InputLabel>Year</InputLabel>
        <Select
          value={selectedYear}
          label="Year"
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {generateYears(2021, 5).map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        size="small"
        sx={{ minWidth: 140 }}
        disabled={useLastThreeMonths}
      >
        <InputLabel>Month</InputLabel>
        <Select
          value={selectedMonth}
          label="Month"
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((m, index) => (
            <MenuItem key={m} value={index}>
              {m}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar;
