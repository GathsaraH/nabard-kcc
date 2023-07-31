import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const TableWithCheckBox = ({rowData , columnDefs , pagination}) => {
  
  return (
    <div>
          <div className="ag-theme-alpine" style={{height:'100vh'}}>
          <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          filter: true,
        }}
        rowSelection="multiple"
        pagination={pagination} // Enable pagination
        paginationPageSize={10} // Number of rows per page

      />
      </div>

      
    </div>
  )
}

export default TableWithCheckBox