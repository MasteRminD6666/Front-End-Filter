import { useState, useEffect, useContext } from "react";
// Material/Ui Components
import Pagination from "@mui/material/Pagination";

const pageSize = 10;
export default function PaginationTable({ appData, setDataTable }) {
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  useEffect(() => {
    const displayedData = appData.result.auditLog.slice(
      pagination.from,
      pagination.to
    );
    setPagination({ ...pagination, count: appData.result.recordsFiltered });

    setDataTable(displayedData);
    console.log("displayedData", displayedData);
  }, [pagination.from, pagination.to, appData]);
  // This function is used to handle clicking on the next in the pagination
  const handleNextCells = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  return (
    <>
      <Pagination
        count={Math.ceil(pagination.count / pageSize)}
        shape="rounded"
        onChange={handleNextCells}
      />
    </>
  );
}
