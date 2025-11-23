import React from "react";
import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MonthlyTransactionTable from "./MonthlyTransactionTable";
import {
  calculateRewardPoints,
  monthName,
  getLastNMonths,
  getShortMonthName,
} from "../utils/helper";
import FilterBar from "./FilterBar";
import { Typography } from "@mui/material";

export default function RewardTable({ selectedCustomerId, transactions }) {
  // filter state
  const [useLastThree, setUseLastThree] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(2025);

  const handleFilterChange = ({ month, year, last3Months }) => {
    setUseLastThree(last3Months);
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const selectedMonths = useMemo(() => {
    if (useLastThree) {
      return getLastNMonths(3).map((m) => m);
    }
    return [monthName[selectedMonth]];
  }, [useLastThree, selectedMonth, selectedYear]);

  // find selected customer name
  const selectedCustomerName = useMemo(() => {
    const customer = transactions.find((t) => t.customerId === selectedCustomerId);
    return customer?.customerName || "";
  }, [selectedCustomerId, transactions]);

  // filter by customer + selected months
  const selectedCustomerTransactions = useMemo(() => {
    if (!selectedCustomerId) return [];
    return transactions.filter((t) => {
      return (
        t.customerId === selectedCustomerId &&
        selectedMonths.includes(getShortMonthName(t.date))
      );
    });
  }, [transactions, selectedCustomerId, selectedMonths]);

  // summary by month
  const monthlySummary = useMemo(() => {
    const map = new Map();
    selectedCustomerTransactions.forEach((t) => {
      const month = getShortMonthName(t.date);
      map.set(month, (map.get(month) || 0) + calculateRewardPoints(t.amount));
    });

    return selectedMonths.map((key) => ({
      monthKey: key,
      points: map.get(key) || 0,
    }));
  }, [selectedCustomerTransactions, selectedMonths]);

  return (
    <Box sx={{ mb: 10 }}>
      {selectedCustomerId && (
        <>
          <FilterBar key={selectedCustomerId} onFilterChange={handleFilterChange} />

          <Typography sx={{ paddingBottom: "10px" }} variant="h5" component="div">
            Monthly Reward Summary of {selectedCustomerName}
          </Typography>

          {selectedCustomerTransactions.length > 0 ? (
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Month</TableCell>
                    <TableCell align="center">Reward Points</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {monthlySummary.map((summary) => (
                    <MonthlyTransactionTable
                      key={summary.monthKey}
                      row={summary}
                      selectedCustomerTransactions={selectedCustomerTransactions}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography sx={{ pt: 2, textAlign: "center" }}>
              No transactions found
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}