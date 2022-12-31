import { useState, useEffect, useContext } from "react";
// Material/Ui Components
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
// Components
import AppContext from "../AppContext";

export default function ApplicationType({ appData }) {
  const context = useContext(AppContext);
  const [selectedApplicationType, setSelectedAction] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    changeActionType();
  }, [selectedApplicationType]);

  function changeActionType() {
    const filters = context.filters;
    context.setFilters({
      ...filters,
      applicationType: selectedApplicationType,
    });
  }

  console.log("contextOut", context.filters);
  let options = appData.result.auditLog.map((item) => {
    if (item !== null) {
      return item.applicationType;
    }
  });
  const filtered = options.filter((item) => item !== null);
  const applicationTypeOptions = [...new Set(filtered)];
  console.log("applicationType", selectedApplicationType);

  return (
    <Box
      component="form"
      style={{ width: "13%", marginLeft: 20 }}
      noValidate
      autoComplete="off"
    >
      <h5>Application type</h5>

      <Autocomplete
        size="small"
        value={selectedApplicationType}
        onChange={(event, newValue) => {
          setSelectedAction(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={applicationTypeOptions}
        renderInput={(params) => <TextField {...params} />}
        style={{ marginTop: 10 }}
      />
    </Box>
  );
}
