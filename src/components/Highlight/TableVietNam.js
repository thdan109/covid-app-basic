import MUIDataTable from "mui-datatables";
import React from "react";

const TableInforCovid = ({ data, columns }) => {
  const options = {
    print: false,
    download: false,
    search: true,
    viewColumns: false,
    filter: false,
    // serverSide: true,
    selectableRows: "none",
  };
  return <MUIDataTable data={data} columns={columns} options={options} />;
};

export default TableInforCovid;
