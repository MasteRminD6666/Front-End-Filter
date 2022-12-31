import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Filters from "../Filters/Filters";
import NoSsr from "@mui/material/NoSsr";
//My Components
import Pagination from "../Pagination/Pagination";
import { AirplanemodeActiveSharp } from "@mui/icons-material";
import AppContext from "../AppContext";

// This function is used To create a table cell
function createData(
  id,
  LogId,
  ApplicationType,
  ApplicationId,
  Action,
  ActionDetails,
  DateTime
) {
  return {
    id,
    LogId,
    ApplicationType,
    ApplicationId,
    Action,
    ActionDetails,
    DateTime,
  };
}

// Head cell used to fill the table head data
const headCells = [
  {
    id: "LogId",
    numeric: true,
    disablePadding: true,
    label: "Log ID",
  },
  {
    id: "ApplicationType",
    numeric: true,
    disablePadding: false,
    label: "Application type",
  },

  {
    id: "ApplicationId",
    numeric: true,
    disablePadding: false,
    label: "Application ID",
  },
  {
    id: "Action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
  {
    id: "ActionDetails",
    numeric: true,
    disablePadding: false,
    label: "Action Details",
  },
  {
    id: "DateTime",
    numeric: true,
    disablePadding: false,
    label: "Date:Time",
  },
];

//
const tableCells = [
  createData(1, "Cupcake", 305, 3.7, 67, 4.3, "rami"),
  createData(2, "Donut", 452, 25.0, 51, 4.9, "rami"),
  createData(3, "Eclair", 262, 16.0, 24, 6.0, "rami"),
  createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0, "rami"),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9, "rami"),
  createData(6, "Honeycomb", 408, 3.2, 87, 6.5, "rami"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              sx={{
                "& .MuiTableSortLabel-icon": {
                  background: "#D4DEED !important",
                  borderRadius: "100px",
                },
              }}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable({ appData }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("logId");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataTable, setDataTable] = useState([]);
  const context = useContext(AppContext);
  const [zz, setzz] = useState(appData);
  useEffect(() => {
    context.setData(appData);
  }, [appData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = tableCells.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableCells.length) : 0;

  return (
    <Box
      sx={{ width: "100%" }}
      style={{ marginTop: "20px", marginLeft: "6px" }}
    >
      <Filters appData={appData} setDataTable={(item) => setDataTable(item)} />
      <Paper
        sx={{
          width: "100%",
          mb: 2,
        }}
        elevation={2}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount="10"
            />

            <TableBody>
              {stableSort(dataTable, getComparator(order, orderBy)).map(
                // used map because it's more readable than forLoop
                (row, index) => {
                  return (
                    <TableRow key={row.logId}>
                      <TableCell component="th" scope="row">
                        {row.logId}
                      </TableCell>
                      <TableCell align="left">{row.applicationType}</TableCell>
                      <TableCell align="left">{row.applicationId}</TableCell>
                      <TableCell align="left">{row.actionType}</TableCell>
                      <TableCell align="left">-/-</TableCell>
                      <TableCell style={{ width: "35%" }} align="left">
                        {row.creationTimestamp}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            margin: "20px 0",
          }}
          justifyContent={"center"}
          alignItems="center"
          display={"flex"}
        >
          <NoSsr>
            <TableFooter>
              <Pagination
                setDataTable={(item) => setDataTable(item)}
                setzz={setzz}
                appData={zz}
              />
            </TableFooter>
          </NoSsr>
        </Box>
      </Paper>
    </Box>
  );
}
