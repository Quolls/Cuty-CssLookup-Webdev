import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

// Treatment Plan History
function Prescription({ data }) {
  const columns = [
    {
      name: "Treatment Name ",
      selector: "name",
      sortable: true,
    },
    {
      name: "Condition",
      selector: "Condition",
      sortable: true,
    },
    {
      name: "Prescribing Doctor",
      selector: "PrescribingDoctor",
      sortable: true,
    },
    {
      name: "Directions",
      selector: "directions",
      sortable: true,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
    },
  ];
  const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
    <div className="form-check">
      <input
        htmlFor="booty-check"
        type="checkbox"
        className="form-check-input"
        ref={ref}
        onClick={onClick}
        {...rest}
      />
      <label className="form-check-label" id="booty-check" />
    </div>
  ));

  const tableData = {
    columns,
    data,
  };

  return (
    <div className="mytreatmentd bg-white border border-neutral-300 rounded-lg">
      <div className="mytreatmentheading bg-white rounded-t-lg">
        <h4>Treatment Plan History</h4>
      </div>

      <div className="main rounded-lg">
        <DataTableExtensions {...tableData}>
          <DataTable
            columns={columns}
            data={data}
            defaultSortField="id"
            defaultSortAsc={false}
            highlightOnHover
            selectableRows
            selectableRowsComponent={BootyCheckbox}
            paginationTotalRows={10}
          />
        </DataTableExtensions>
      </div>
    </div>
  );
}

export default Prescription;
