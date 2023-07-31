import { useRouter } from 'next/router'
import React , {useState} from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import IconButton from 'src/components/Button/IconButtonComponent'
import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox'
import { useTranslation } from "react-i18next";
import 'flatpickr/dist/flatpickr.css';
import { TextField } from '@mui/material';
import CustomCellRenderer from 'src/components/CustomCellRenderer';
import StatusRenderer from 'src/components/StatusRenderer';
const Index = () => {
  const { t } = useTranslation();
 
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
    { headerName: 'Sr No.', field: 'id', suppressMenu: true },
    { headerName: 'Bank Type', field: 'BankType', suppressMenu: true },
    { headerName: 'Organization Name', field: 'OrganizationName', suppressMenu: true },
    { headerName: 'Email Id', field: 'EmailId', suppressMenu: true },
    { headerName: 'Mobile No', field: 'MobileNo', suppressMenu: true },
    {
      headerName: 'Status', field: 'Status', suppressMenu: true,
      cellRenderer: () => (
        <StatusRenderer value="Active" />
      ),
    },
    {
      headerName: 'Actions',
      field: 'actions',
      cellRenderer: () => (
        <CustomCellRenderer />
      ),
      width: 100,
      suppressMenu: true, // Remove default filter options from this column
      cellStyle: { textAlign: 'center' },
    },
  ];

  const router = useRouter();
  const AddBankHierarchy = () => {
    router.push('/Organizations/Banks/Hierarchy/Add');
  }
  const handleRowClicked = (row) => {
    // Assuming the row data contains an "id" property
    if (row && row.id) {
        router.push(`/Organizations/Banks/Hierarchy/View/${row.id}`)
    }
  };
  return (
    <div>
      <div className="flex flex-wrap gap-1 mb-4">
        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Search user")}
            name="Search User"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Date")}
            name="Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Start Date")}
            name="Start Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("End Date")}
            name="End Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Select Header column")}
            name="select header column"
            required
            variant="outlined"
            size="small"
          />
        </div>
        <div className="px-2">
        <IconButton label="Add Bank Hierarchy" className="btn-outline-primary" icon={<AiOutlinePlus />} onClick={AddBankHierarchy} />
        </div>
      </div>
      <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} onRowClick={handleRowClicked} />
    </div>
  )
}

export default Index