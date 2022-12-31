import { useState, useContext } from "react";
// Material/Ui Components
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// Components
import AppContext from "../AppContext";

export default function ApplicationID() {
  console.log("");

  const [selectedApplicationID, setSelectedApplicationID] = useState("");
  const context = useContext(AppContext);

  const handleChange = (e) => {
    setSelectedApplicationID(e.target.value);
    console.log("selectedApplication", e.target.value);
    const filters = context.filters;
    context.setFilters({ ...filters, applicationId: e.target.value });
  };
  return (
    <Box
      component="form"
      style={{ marginLeft: 20, width: "13%" }}
      noValidate
      autoComplete="off"
    >
      <h5>Application ID</h5>
      <TextField
        value={selectedApplicationID}
        onChange={handleChange}
        placeholder="e.g. 219841/2021"
        style={{ width: "100%" }}
        size="small"
        id="outlined-basic"
        variant="outlined"
        margin="dense"
      />
    </Box>
  );
}
