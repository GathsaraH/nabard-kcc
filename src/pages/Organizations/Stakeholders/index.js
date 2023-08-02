import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import IconButton from 'src/components/Button/IconButtonComponent'
import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox'
import { useTranslation } from "react-i18next";
import 'flatpickr/dist/flatpickr.css';
import { TextField } from '@mui/material';
import StatusRenderer from 'src/components/StatusRenderer';
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';
const Index = () => {
  const { t } = useTranslation();
  const rowData = [
    { id: 1, Type: 'Central', Name: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Inactive' },
    { id: 2, Type: 'state level', Name: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Active' },
    { id: 3, Type: 'state level', Name: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Inactive' },
    { id: 4, Type: 'state level', Name: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Inactive' },
    { id: 5, Type: 'state level', Name: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Inactive' },
    { id: 6, Type: 'Central', Name: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Active' },
    { id: 7, Type: 'Central', Name: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Inactive' },
    { id: 8, Type: 'Central', Name: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Inactive' },
    { id: 9, Type: 'Central', Name: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Active' },
    { id: 10, Type: 'state level', Name: 'RB Enterprise', EmailId: 'xyz@gmail.com', MobileNo: '9999999999', Status: 'Active' },
  ];
  const router = useRouter();
  const AddStakeholderHierarchy = () => {
    router.push('/Organizations/Stakeholders/Hierarchy/Add');
  }
  const handleRowClicked = (id) => {
    // Assuming the row data contains an "id" property
        router.push(`/Organizations/Stakeholders/Hierarchy/View/${id}/`)
  };
  const columnDefs = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 40,
      suppressMenu: true,
    },
    { headerName: 'Sr No.', field: 'id', suppressMenu: true },
    { headerName: 'Type', field: 'Type', suppressMenu: true },
    { headerName: 'Name', field: 'Name', suppressMenu: true },
    { headerName: 'Mobile No', field: 'MobileNo', suppressMenu: true },
    { headerName: 'Email Id', field: 'EmailId', suppressMenu: true },
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
        <IconButton label="Add Stakeholder Hierarchy" className="btn-outline-primary" icon={<AiOutlinePlus />} onClick={AddStakeholderHierarchy} />
        </div>
      </div>
      <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} />
    </div>
  )
}

export default Index