import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlineArrowDown } from 'react-icons/ai';
import CommonFilters from 'src/components/Filters'
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';
import StatusRenderer from 'src/components/StatusRenderer';
// import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox'
import MUIDataTable from "mui-datatables";
const Index = () => {
      const router = useRouter();
    const handleRowClicked = (rowData) => {
        // Assuming the row data contains an "id" property
        if(rowData.id){
            router.push(`/users/Banks/View/${rowData.id}/`)
        }
      };
      const options = {
        print: false,
        onChangePage(currentPage) {
          console.log({ currentPage });
        },
        onChangeRowsPerPage(numberOfRows) {
          console.log({ numberOfRows });
        }
      };
      
      const data = [
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
        const columns = [
          { label: 'Sr No.', name: 'id'},
          { label: 'Bank Type', name: 'BankType'},
          { label: 'Organization Name', name: 'OrganizationName' },
          { label: 'Email Id', name: 'EmailId' },
          { label: 'Mobile No', name: 'MobileNo' },
          {
            label: 'Status', name: 'Status',
            // cellRenderer: (Status) => (
            //   <StatusRenderer value={Status.value} />
            // ),
            options: {
              filter: true,
              customBodyRender: (value) => {
                return (
                  <StatusRenderer value={value} />
                );
              }
            }
          },
          {
            label: 'Actions',
            name: 'actions',
            // cellRenderer: (params) => (
            //   <MenuItemComponent viewOnclick={handleRowClicked} rowData={params.data}/>
            // ),
            options:{
            customBodyRender: (value, tableMeta) => {
              const rowData = data[tableMeta.rowIndex];
              return <MenuItemComponent viewOnclick={handleRowClicked} rowData={rowData} />;
            }
          }
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
      <MUIDataTable options={options} data={data} columns={columns} />
            {/* <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} onRowClick={handleRowClicked}/> */}
    </div>
  )
}

export default Index
