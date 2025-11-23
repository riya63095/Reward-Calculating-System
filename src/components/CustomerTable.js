import { useState, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { useTransactions } from "../hooks/useTransactions";
import RewardTable from "./RewardTable";
import { calculateRewardPoints } from "../utils/helper";
import { Typography } from "@mui/material";

const columns = [
  { id: "s.no", label: "Serial number", align: "center" },
  { id: "id", label: "Customer id", align: "center" },
  { id: "name", label: "Customer name", align: "left" },
  { id: "point", label: "Total reward points", align: "left" },
];

export default function CustomerTable() {
  const { data: transactions, loading, error } = useTransactions();
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const calculateTotalAmount = (customerId) => {
    let totalAmount = 0;
    transactions.map((transaction) => {
      if (customerId === transaction.customerId)
        totalAmount += transaction.amount;
    });
    return totalAmount;
  };

  const customers = useMemo(() => {
    const customerMap = new Map();
    transactions.forEach((transaction) => {
      if (!customerMap.has(transaction.customerId))
        customerMap.set(transaction.customerId, {
          customerId: transaction.customerId,
          customerName: transaction.customerName,
          totalAmount: calculateTotalAmount(transaction.customerId),
        });
    });
    return Array.from(customerMap.values())
      .map((customer) => ({
        customerId: customer.customerId,
        customerName: customer.customerName,
        customerAmount: customer.totalAmount,
      }))
      .sort((a, b) => a.customerName.localeCompare(b.customerName));
  }, [transactions]);

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: "50%", overflow: "hidden" }}>
      {loading ? (
        <Box>Loading customer data...</Box>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Typography sx={{ textAlign: "center", mt: 1, color: "red" }}>
            👇 Select a customer to see detailed monthly rewards
          </Typography>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {customers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                        sx={{
                          backgroundColor:
                            selectedCustomerId === row.customerId
                              ? "#adacacff"
                              : "",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setSelectedCustomerId((previous) =>
                            previous === row.customerId ? null : row.customerId
                          )
                        }
                      >
                        <TableCell
                          align="center"
                          sx={{
                            color: "black",
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "black",
                          }}
                        >
                          {row.customerId}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "black",
                          }}
                        >
                          {row.customerName}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "black",
                          }}
                        >
                          {calculateRewardPoints(row.customerAmount)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={customers.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[]}
          />
        </Paper>
      )}
      {selectedCustomerId && (
        <RewardTable
          selectedCustomerId={selectedCustomerId}
          transactions={transactions}
        />
      )}
    </Box>
  );
}
