// Material/Ui Components
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbar({ setSnackBar }) {
  const [open, setOpen] = React.useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setSnackBar(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        key={"bottom left"}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          severity="warning"
          key={"bottom" + "left"}
          onClose={handleClose}
          sx={{ width: "100%" }}
        >
          <AlertTitle>Warning</AlertTitle>
          No data to be filtered — <strong>Please fill the data!</strong>
        </Alert>
      </Snackbar>
    </>
  );
}
