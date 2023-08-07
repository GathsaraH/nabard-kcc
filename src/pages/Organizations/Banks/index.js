import { useRouter } from 'next/router'
import React , {useState} from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox'
import 'flatpickr/dist/flatpickr.css';
import StatusRenderer from 'src/components/StatusRenderer';
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';
import CommonFilters from 'src/components/Filters';
const Index = () => {
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
  
 const router = useRouter();
 const AddBankHierarchy = () => {
  router.push('/Organizations/Banks/Hierarchy/Add');
}


const handleRowClicked = (id) => {
  // Assuming the row data contains an "id" property
      router.push(`/Organizations/Banks/Hierarchy/View/${id}/`)
};
  const columnDefs = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 40,
      suppressMenu: true,
    },
    { headerName: 'Sr No.', field: 'id', suppressMenu: true },
    { headerName: 'Bank Type', field: 'BankType', suppressMenu: true },
    { headerName: 'Organization Name', field: 'OrganizationName', suppressMenu: true },
    { headerName: 'Email Id', field: 'EmailId', suppressMenu: true },
    { headerName: 'Mobile No', field: 'MobileNo', suppressMenu: true },
    {
      headerName: 'Status', field: 'Status', suppressMenu: true,
      cellRenderer: () => (
        <StatusRenderer value="Inactive" />
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


  return (
    <div>
      <CommonFilters onClick={AddBankHierarchy} addButtonLabel="Add Bank Hierarchy" icon={<AiOutlinePlus/>}/>
      <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} onRowClick={handleRowClicked} />
    </div>
  )
}

export default Index