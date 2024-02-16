import React from "react";
import "./Table.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useCallback } from "react";
import { useRef } from "react";
import emty_box from "../../Assets/images/emty_box.png";

function Table({
  columns,
  data,
  setpage,
  setparpage,
  totalData,
  page,
  perpage,
}) {
  const gridRef = useRef();

  const defaultColDef = React.useMemo(() => {
    return {
      sortable: true,
      width: "auto",
      resizable: true,
    };
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const handleNext = () => {
    if (Math.ceil(totalData / perpage) > page) {
      setpage(page + 1);
    }
  };
  const handlePrevios = () => {
    if (page > 1) setpage(page - 1);
  };

  const handleFirst = () => {
    setpage(1);
  };
  const handleLast = () => {
    setpage(Math.ceil(totalData / perpage));
  };
  const handlePerPage = (e) => {
    setparpage(e.target.value);
    if (page > Math.ceil(totalData / e.target.value)) {
      setpage(Math.ceil(totalData / e.target.value));
    }
  };

  return (
    <>
      {data?.length ? (
        <div
          className="ag-theme-alpine ag_tabel_main"
          style={{ minHeight: "55vh", width: "100%", position: "relative" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={columns}
            defaultColDef={defaultColDef}
            style={{ width: "100%" }}
            onFirstDataRendered={onFirstDataRendered}
          />
          <div className="pagination_main">
            <div style={{ display: "flex", gap: "10px" }}>
              <p style={{ margin: "0px" }}>Rows per page:</p>
              <select
                aria-label="Default select example"
                className="mx-3 pagination-select"
                onChange={(e) => handlePerPage(e)}
              >
                <option vlaue="10">10</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <p>Entries</p>
              </select>
            </div>
            <div>
              <p>
                {page * perpage - (perpage - 1)}-
                {page * perpage > totalData ? totalData : page * perpage} of{" "}
                {totalData}
              </p>
            </div>
            <div>
              <button
                onClick={() => handleFirst()}
                className="pagination_arrow"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
                  <path fill="none" d="M24 24H0V0h24v24z"></path>
                </svg>
              </button>
              <button
                onClick={() => handlePrevios()}
                className="pagination_arrow"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
              </button>
              <button onClick={() => handleNext()} className="pagination_arrow">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
              </button>
              <button onClick={() => handleLast()} className="pagination_arrow">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path>
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            fontSize: "18px",
            opacity: "0.6",
          }}
          className="copyright"
        >
          <img src={emty_box} alt="" width="50px" />
          <p> You don’t have any current orders</p>
        </div>
      )}
    </>
  );
}

export default Table;
