import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlineArrowDown } from 'react-icons/ai';
import CommonFilters from 'src/components/Filters'
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';
import StatusRenderer from 'src/components/StatusRenderer';
import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox'

const Index = () => {
      const router = useRouter();
    const handleRowClicked = (id) => {
        // Assuming the row data contains an "id" property
            router.push(`/users/Stakeholders/View/${id}/`)
      };
      const rowData = [
        { id: 1, BankType: 'Public Sector', OrganizationName: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Inactive' },
        { id: 2, BankType: 'Public Sector', OrganizationName: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Active' },
        { id: 3, BankType: 'Public Sector', OrganizationName: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Inactive' },
        { id: 4, BankType: 'Public Sector', OrganizationName: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Inactive' },
        { id: 5, BankType: 'Public Sector', OrganizationName: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Inactive' },
        { id: 6, BankType: 'Public Sector', OrganizationName: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Active' },
        { id: 7, BankType: 'Public Sector', OrganizationName: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Inactive' },
        { id: 8, BankType: 'Public Sector', OrganizationName: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Inactive' },
        { id: 9, BankType: 'Public Sector', OrganizationName: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Active' },
        { id: 10, BankType: 'Public Sector', OrganizationName: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Active' },
      ];
        const columnDefs = [
          {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 40,
            suppressMenu: true,
          },
          { headerName: 'Sr No.', field: 'id', suppressMenu: true},
          { headerName: 'Bank Type', field: 'BankType', suppressMenu: true },
          { headerName: 'Organization Name', field: 'OrganizationName', suppressMenu: true },
          { headerName: 'Email Id', field: 'EmailId', suppressMenu: true },
          { headerName: 'Mobile No', field: 'MobileNo', suppressMenu: true },
          {
            headerName: 'Status', field: 'Status', suppressMenu: true,
            cellRenderer: (Status) => (
              <StatusRenderer value={Status.value} />
            ),
          },
          {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: (params) => (
              <MenuItemComponent viewOnclick={handleRowClicked} rowData={params.data}/>
            ),
            width: 100,
            suppressMenu: true, // Remove default filter options from this column
            cellStyle: { textAlign: 'center' },
          },
        ];
        const col = ['id', 'BankType', 'OrganizationName', 'EmailId', 'MobileNo', 'Status'];
        const exportTable = () => {
            const columns = col;
            const records = rowData;
            const filename = 'table';
        
            const newVariable = window.navigator;
                const linedelimiter = '\n';
                let result = columns
                    .map((d) => {
                        return d;
                    })
                  
                result += linedelimiter;
                records.map((item) => {
                    columns.map((d, index) => {
                        if (index > 0) {
                           return result ;
                        }
                        const val = item[d] ? item[d] : '';
                        result += val;
                    });
                    result += linedelimiter;
                });
        
                if (result == null) return;
                if (!result.match(/^data:text\/csv/i) && !newVariable.msSaveOrOpenBlob) {
                    const data = 'data:application/csv;charset=utf-8,' + encodeURIComponent(result);
                    const link = document.createElement('a');
                    link.setAttribute('href', data);
                    link.setAttribute('download', `${filename}.csv`);
                    link.click();
                } 
        };
  return (
    <div>
            <CommonFilters onClick={() => exportTable('print')} addButtonLabel="Export" icon={<AiOutlineArrowDown/>}/>
            <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} onRowClick={handleRowClicked}/>
    </div>
  )
}

export default Index
