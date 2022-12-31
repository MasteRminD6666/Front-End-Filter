import * as React from "react";
import { useContext } from "react";
// Material/Ui Components
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Box from "@mui/material/Box";
//Components
import AppContext from "../AppContext";

export default function MaterialUIPickers() {
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(dayjs());
  const context = useContext(AppContext);
  const handleChange = (newValue) => {
    let onlyDate = JSON.stringify(newValue).slice(1, 11);
    setSelectedDateFrom(newValue);
    console.log("newValue", JSON.stringify(newValue));
    const filters = context.filters;
    console.log("selectedDateFrom", onlyDate);
    context.setFilters({ ...filters, fromDate: onlyDate });
    console.log("filters ><><><>", context.filters);
  };
  return (
    <Box
      component="form"
      style={{ width: "13%", marginLeft: 20 }}
      noValidate
      autoComplete="off"
    >
      <h5>From date</h5>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          inputFormat="MM/DD/YYYY"
          value={selectedDateFrom}
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
