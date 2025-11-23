import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { calculateRewardPoints, getShortMonthName } from "../utils/helper";

export default function MonthlyTransactionTable({
  row,
  selectedCustomerTransactions,
}) {
  const [open, setOpen] = React.useState(false);

  const filteredTransactions = selectedCustomerTransactions.filter(
    (transaction) => row.monthKey === getShortMonthName(transaction.date)
  );

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center">{row.monthKey}</TableCell>
        <TableCell align="center">{row.points}</TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Box sx={{ fontSize: 20 }}>Transaction</Box>

              {filteredTransactions.length > 0 ? (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Transaction id</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Reward points</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.transactionId}>
                        <TableCell component="th" scope="row">
                          {transaction.transactionId}
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell align="center">
                          ${transaction.amount}
                        </TableCell>
                        <TableCell align="center">
                          {calculateRewardPoints(transaction.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Box sx={{ padding: 2, fontSize: 16 }}>
                  No Transactions Found
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
