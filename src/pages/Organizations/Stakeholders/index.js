import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import IconButton from 'src/components/Button/IconButtonComponent'
// import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox'
import { useTranslation } from "react-i18next";
import 'flatpickr/dist/flatpickr.css';
import { TextField } from '@mui/material';
import StatusRenderer from 'src/components/StatusRenderer';
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';
import MUIDataTable from 'mui-datatables';
const Index = () => {
  const { t } = useTranslation();
  const data = [
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
    if(rowData.id){
        router.push(`/Organizations/Stakeholders/Hierarchy/View/${rowData.id}/`)
    }
  };
  const columns = [
    { label: 'Sr No.', name: 'id'},
    { label: 'Type', name: 'Type'},
    { label: 'Name', name: 'Name'},
    { label: 'Mobile No', name: 'MobileNo'},
    { label: 'Email Id', name: 'EmailId'},
    {
      label: 'Status', name: 'Status',
      // cellRenderer: () => (
      //   <StatusRenderer value="Inactive" />
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
        filter:false,
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          return <MenuItemComponent viewOnclick={handleRowClicked} rowData={rowData} />;
        }
      }
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
      <MUIDataTable options={options} data={data} columns={columns} />

      {/* <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} /> */}
    </div>
  )
}

export default Index