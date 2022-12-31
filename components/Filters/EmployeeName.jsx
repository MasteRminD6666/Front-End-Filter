import { useState, useContext } from "react";
// Material/Ui Components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//Components
import AppContext from "../AppContext";

export default function EmployeeName() {
  console.log("");

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const context = useContext(AppContext);

  const handleChange = (e) => {
    setSelectedEmployee(e.target.value);
    console.log("selectedApplication", e.target.value);
    const filters = context.filters;
    context.setFilters({ ...filters, logId: e.target.value });
  };
  return (
    <Box
      component="form"
      style={{ width: "13%" }}
      noValidate
      autoComplete="off"
    >
      <h5>Employee name</h5>
      <TextField
        value={selectedEmployee}
        onChange={handleChange}
        placeholder="e.g. Admin.User"
        hiddenLabel
        style={{ width: "100%" }}
        size="small"
        id="outlined-basic"
        variant="outlined"
        margin="dense"
      />
    </Box>
  );
}
