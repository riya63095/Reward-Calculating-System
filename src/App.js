import logo from "./logo.svg";
import "./App.css";
import { useTransactions } from "./hooks/useTransactions.js";
import CustomerTable from "./components/CustomerTable.js";
import Typography from "@mui/material/Typography";

function App() {

  return (
    <div className="App">
      <Typography variant="h4" gutterBottom component="div">
        Total reward points earned by customers
      </Typography>
      <div
        className="App"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <CustomerTable />
      </div>
    </div>
  );
}

export default App;
