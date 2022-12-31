// Material/Ui Components
import Box from "@mui/material/Box";

// Here we import the filters component
import EmployeeName from "./EmployeeName";
import ActionType from "./ActionType";
import ApplicationID from "./ApplicationID";
import ApplicationType from "./ApplicationType";
import FromDate from "./FromDate";
import ToDate from "./ToDate";
import SearchLogger from "./SearchLogger";

export default function Filters({ appData, setDataTable, setzz }) {
  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {/*EmployeeName is a Text-Filed from Material/UI https://mui.com/material-ui/react-text-field/ */}
      <EmployeeName />
      {/*ActionType is a Autocomplete a normal text input enhanced by a panel of suggested options https://mui.com/material-ui/react-autocomplete/*/}
      <ActionType appData={appData} />
      <ApplicationType appData={appData} />
      <FromDate />
      <ToDate />
      <ApplicationID />
      <SearchLogger
        setDataTable={(item) => setDataTable(item)}
        appData={appData}
        setzz={setzz}
      />
    </Box>
  );
}
