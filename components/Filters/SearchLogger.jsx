// Material/Ui Components
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useState, useContext } from "react";
// Components
import AppContext from "../AppContext";
import Snackbar from "../Snackbar/Snackbar";
const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#10489B",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export default function SearchLogger({ appData, setDataTable, setzz }) {
  const context = useContext(AppContext);
  const [snackBarFlag, setSnackBar] = useState(false);
  const {
    logId,
    applicationId,
    actionType,
    applicationType,
    fromDate,
    toDate,
  } = context.filters;
  const tableData = appData.result.auditLog;
  let filters = {};
  const filterDateFromTo = (dateFrom, dateTo) => {
    console.log(dateFrom, dateTo);
    const from = new Date(`${dateFrom} 00:00`);
    const to = new Date(`${dateTo} 24:00`);
    const itemDate = new Date(item.creationTimestamp);
  };
  const handleFiltration = () => {
    try {
      const finalData = tableData.filter((item) => {
        let valid = true;
        if (context.filters.fromDate) {
          const from = new Date(`${context.filters.fromDate} 00:00`);
          const to = new Date(`${context.filters.toDate} 24:00`);
          const itemDate = new Date(item.creationTimestamp);
          if (!(to > itemDate && itemDate >= from)) {
            return false;
          }
        }
        Object.keys(context.filters).forEach((element) => {
          if (
            element === "fromDate" ||
            element === "toDate" ||
            !context.filters[element]
          ) {
            return;
          }
          if (context.filters[element] !== item[element]?.toString()) {
            valid = false;
          }
        });
        return valid;
      });
      console.log("finalData::", finalData);
      // setNumberOfPages(Math.ceil(finalData / 10))
      setDataTable(finalData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      style={{
        marginTop: "1.4%",
        width: "20%",
        marginLeft: 15,
        marginRight: "1%",
      }}
    >
      {snackBarFlag ? <Snackbar setSnackBar={() => setSnackBar()} /> : ""}
      <BootstrapButton
        style={{ width: "90%" }}
        onClick={handleFiltration}
        variant="contained"
        disableRipple
      >
        Search Logger
      </BootstrapButton>
    </Box>
  );
}
