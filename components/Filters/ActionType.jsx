import { useState, useEffect, useContext } from "react";
// Material/Ui Components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
// Components
import AppContext from "../AppContext";

export default function ActionType({ appData }) {
  const context = useContext(AppContext);
  const [selectedAction, setSelectedAction] = useState("");
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    changeActionType();
  }, [selectedAction]);

  function changeActionType() {
    const filters = context.filters;
    context.setFilters({ ...filters, actionType: selectedAction });
  }

  console.log("contextOut", context.filters);

  let options = appData.result.auditLog.map((item) => {
    return item.actionType;
  });
  const actionTypes = [...new Set(options)];

  return (
    <Box
      component="form"
      style={{ width: "13%", marginLeft: 20 }}
      noValidate
      autoComplete="off"
    >
      <h5>Action type</h5>

      <Autocomplete
        style={{ width: "100%", marginTop: 10 }}
        size="small"
        value={selectedAction}
        onChange={(event, newValue) => {
          setSelectedAction(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={actionTypes}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  );
}
