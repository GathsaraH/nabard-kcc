import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { TextField } from '@mui/material';
import SelectInput from 'src/components/Input/Select/SelectInput';
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';
import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox';
import StatusRenderer from 'src/components/StatusRenderer';
import IconButton from 'src/components/Button/IconButtonComponent';
import { AiOutlinePlus } from 'react-icons/ai';

const rowData = [
  { id: 1, organizationType: 'Public Sector', scheme: 'RB Enterprise', benefitType: 'xyz@gmail.com', effectiveDate: '10 Aug 2023' },
  { id: 2, organizationType: 'Public Sector', scheme: 'RB Enterprise', benefitType: 'xyz@gmail.com', effectiveDate: '10 Aug 2023' },
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

  const handleRowClicked = (id) => {
    // Assuming the row data contains an "id" property
    router.push(`/schemes/view/${id}/`)
  };


  const columnDefs = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 20,
      suppressMenu: true,
    },
    { headerName: 'Organization', field: 'id', suppressMenu: true, width: '100%', minWidth: 200 },
    { headerName: 'Organization Type', field: 'organizationType', suppressMenu: true, width: '100%', minWidth: 200 },
    { headerName: 'Scheme', field: 'scheme', suppressMenu: true, width: '100%', minWidth: 200 },
    { headerName: 'Benefit Type', field: 'benefitType', suppressMenu: true, width: '100%', minWidth: 200 },
    { headerName: 'Effective Date', field: 'effectiveDate', suppressMenu: true, width: '100%', minWidth: 200 },
    {
      headerName: 'Status',
      field: 'Status',
      suppressMenu: true,
      width: 150,
      cellRenderer: () => <StatusRenderer value="Active" />,
    },
    {
      headerName: 'Actions',
      field: 'actions',
      // cellRenderer: () => <CustomCellRenderer userId={router.query.id} />,
      cellRenderer: (params) => <MenuItemComponent viewOnclick={handleRowClicked} rowData={params.data} />,
      suppressMenu: true,
    },
  ];


  const AddBankHierarchy = () => {
    router.push('/schemes/add');
  }


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
        <div className="px-2">
          <IconButton label="Add Scheme" className="btn-outline-primary" icon={<AiOutlinePlus />} onClick={AddBankHierarchy} />
        </div>
      </div>
      <TableWithCheckBox width={'500'} rowData={rowData} columnDefs={columnDefs} pagination={true} />
    </div>
  )
}

export default Index