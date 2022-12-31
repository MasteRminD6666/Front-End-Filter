import * as React from "react";
// Material/Ui Components
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useContext } from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
// Components
import AppContext from "../AppContext";

export default function MaterialUIPickers() {
  const [selectedDateTo, setSelectedDateTo] = React.useState(dayjs());
  const context = useContext(AppContext);
  const handleChange = (newValue) => {
    let onlyDate = JSON.stringify(newValue).slice(1, 11);
    setSelectedDateTo(newValue);
    console.log("newValue", JSON.stringify(newValue));
    const filters = context.filters;
    console.log("selectedDateFrom", onlyDate);
    context.setFilters({ ...filters, toDate: onlyDate });
    console.log("filters ><><><>", context.filters);
  };
  return (
    <Box
      component="form"
      style={{ width: "13%", marginLeft: 20 }}
      noValidate
      autoComplete="off"
    >
      <h5>to date</h5>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          inputFormat="MM/DD/YYYY"
          value={selectedDateTo}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              style={{ width: "100%", marginTop: 10 }}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
}
