import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const TableWithCheckBox = ({ rowData, columnDefs, pagination }) => {
 return (
    <div className='w-full' style={{height:'100vh'}}>
         <div className="ag-theme-alpine" style={{ height: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          filter: true,
          flex: 1,
        }}
        rowSelection="multiple"
        pagination={pagination} // Enable pagination
        paginationPageSize={10} // Number of rows per page
      />
    </div>
    </div>
   
  );
};

export default TableWithCheckBox;
