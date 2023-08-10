import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { AiOutlinePlus } from 'react-icons/ai';
import MUIDataTable from "mui-datatables";
import StatusRenderer from 'src/components/StatusRenderer';
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';
import CommonFilters from 'src/components/Filters';

const data = [
  { id: 1, organizationType: 'Public Sector', scheme: 'RB Enterprise', benefitType: 'xyz@gmail.com', effectiveDate: '10 Aug 2023', status: "Active", actions: "" },
  { id: 2, organizationType: 'Private Sector', scheme: 'RB Enterprise', benefitType: 'xyz@gmail.com', effectiveDate: '10 Aug 2023', status: "Active", actions: "" },
];


const Index = () => {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [filterData, setfilterData] = useState({ "search": "", "date": "", "startDate": "", "endDate": ""})


  const AddBankHierarchy = () => {
    router.push('/schemes/add');
  }


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setfilterData((prevData) => ({ ...prevData, [name]: value }));
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

  const handleRowClicked = (rowData) => {
    // Assuming the row data contains an "id" property
    if(rowData.id){
    router.push(`/schemes/view/${rowData.id}/`)
    }
  };

  const colums = [
    { label: 'Organization', name: 'id', options: { filter: false } },
    { label: 'Organization Type', name: 'organizationType' },
    { label: 'Scheme', name: 'scheme' },
    { label: 'Benefit Type', name: 'benefitType' },
    { label: 'Effective Date', name: 'effectiveDate' },
    {
      name: "status",
      label: "Status",
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
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          const rowData = data[tableMeta.rowIndex];
          return <MenuItemComponent viewOnclick={handleRowClicked} rowData={rowData} />;
        }
        // customBodyRender: (tableMeta) => {
        //   const rowData = data[tableMeta.rowIndex];
        //   return (
        //     <MenuItemComponent viewOnclick={handleRowClicked} rowData={rowData} />
        //   )
        // }
      }
    },
  ];



  return (
    <div className='bg-white p-4'>
      <CommonFilters value={filterData} onChange={handleInputChange} onClick={AddBankHierarchy} addButtonLabel="Add Scheme" icon={<AiOutlinePlus />} />

      <div className='mt-5' >
        <MUIDataTable options={options} data={data} columns={colums} />
      </div>
    </div>
  )
}

export default Index