import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import StatusRenderer from 'src/components/StatusRenderer';
import { TextField } from '@mui/material';
// import TableWithCheckBox from '../datatables/TableWithCheckBox';
import SelectInput from 'src/components/Input/Select/SelectInput';
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';
import MUIDataTable from "mui-datatables";

const data = [
  { id: 1, BankType: 'Public Sector', OrganizationName: 'RB Enterprise', EmailId: 'xyz@gmail.com', Status: 'Inactive' },
  { id: 2, BankType: 'Public Sector', OrganizationName: 'RB Enterprise', EmailId: 'xyz@gmail.com', Status: 'Active' },
];

const dateOptions = [
  { value: '1', label: '01-12-2012' },
  { value: '2', label: '01-12-2011' },
];

const headerOptions = [
  { value: '1', label: 'Beneficiary Id' },
  { value: '2', label: 'Beneficiary Name' },
];



const Index = () => {
  const { t } = useTranslation();
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [filterData, setfilterData] = useState({ "search": "", "date": "", "startDate": "", "endDate": "", "headerColumn": "" })

  const handleRowClicked = (rowData) => {
    // Assuming the row data contains an "id" property
    if(rowData.id){
    router.push(`/Beneficiary/${rowData.id}/`)
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
  const columns = [
    { label: 'Beneficiary ID', name: 'id', width: '100%', minWidth: 200 },
    { label: 'Beneficiary Name', name: 'BankType', width: '100%', minWidth: 250 },
    { label: 'Scheme Name', name: 'OrganizationName', width: '100%', minWidth: 250 },
    { label: 'Scheme Type', name: 'EmailId', width: '100%', minWidth: 250 },
    {
      label: 'Status',
      name: 'Status',
      suppressMenu: true,
      width: '100%',
      minWidth: 250,
      options: {
        filter: true,
        customBodyRender: (value) => {
          return (
            <StatusRenderer value={value} />
          );
        }
      }
      // cellRenderer: () => <StatusRenderer value="Active" />,
    },
    {
      label: 'Actions',
      name: 'actions',
      options:{
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          return <MenuItemComponent viewOnclick={handleRowClicked} rowData={rowData} />;
        }
      }
      // cellRenderer: (params) => <MenuItemComponent viewOnclick={handleRowClicked} rowData={params.data} />,
    },
  ];


  // const AddBankHierarchy = () => {
  //   router.push('/Organizations/Banks/Hierarchy/Add');
  // }


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setfilterData((prevData) => ({ ...prevData, [name]: value }));
  };


  return (
    <div className='bg-white p-4'>
      <div className="flex flex-wrap gap-1 mb-4">
        <div className="px-1">
          <TextField
            label={t("Search user")}
            name="search"
            variant="outlined"
            size="small"
            onChange={handleInputChange}
          />
        </div>

        <div className="px-2">
          <SelectInput name={"date"} label="Date" options={dateOptions} onChange={handleInputChange} />
        </div>

        <div className="px-2">
          <TextField
            label={t("Start Date")}
            name="startDate"
            variant="outlined"
            size="small"
            onChange={handleInputChange}
          />
          {/* <DatePickerInput label={'Start Date'} name="startDate" onChange={handleInputChange} /> */}
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("End Date")}
            name="endDate"
            variant="outlined"
            size="small"
            onChange={handleInputChange}
          />
        </div>

        <div className="px-10">

        </div>
        <div className="px-2">
          <SelectInput name={"headerColumn"} label="Select Header column" options={headerOptions} onChange={handleInputChange} />
        </div>
        {/* <div className="px-2">
          <IconButton label="Export" className="" icon={<AiOutlinePlus />} onClick={AddBankHierarchy} />
        </div> */}
      </div>
      <MUIDataTable options={options} data={data} columns={columns} />

      {/* <TableWithCheckBox width={'300'} rowData={rowData} columnDefs={columnDefs} pagination={true} /> */}
    </div>
  )
}

export default Index