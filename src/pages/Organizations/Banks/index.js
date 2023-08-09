import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
// import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox'
import 'flatpickr/dist/flatpickr.css';
import StatusRenderer from 'src/components/StatusRenderer';
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';
import CommonFilters from 'src/components/Filters';
import MUIDataTable from "mui-datatables";
// import DataTable from 'src/pages/datatables/MyDataTable';
const Index = () => {
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
  
 const router = useRouter();
 const AddBankHierarchy = () => {
  router.push('/Organizations/Banks/Hierarchy/Add');
}


const options = {
  print: false,
  onChangePage(currentPage) {
    console.log({ currentPage });
  },
  onChangeRowsPerPage(numberOfRows) {
    console.log({ numberOfRows });
  }
};


const handleRowClicked = (rowData) => {
  // Assuming the row data contains an "id" property
  if (rowData.id) {
      router.push(`/Organizations/Banks/Hierarchy/View/${rowData.id}`)
  }
};
  const columns = [
    { label: 'Sr No.', name: 'id' , options: { filter: false }},
    { label: 'Bank Type', name: 'BankType'},
    { label: 'Organization Name', name: 'OrganizationName'},
    { label: 'Email Id', name: 'EmailId'},
    { label: 'Mobile No', name: 'MobileNo'},
    {
      label: 'Status', name: 'Status',
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
      options: {
        filter: false,
        // customBodyRender: (value) => {
        //   return (
        //     <MenuItemComponent viewOnclick={handleRowClicked} rowData={value} />
        //   )
        // }
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          return <MenuItemComponent viewOnclick={handleRowClicked} rowData={rowData} />;
        }
      },
    },
  ];


  return (
    <div>
      <CommonFilters onClick={AddBankHierarchy} addButtonLabel="Add Bank Hierarchy" icon={<AiOutlinePlus/>}/>
      {/* <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} onRowClick={handleRowClicked} /> */}
      <MUIDataTable options={options} data={data} columns={columns} />
    </div>
  )
}

export default Index