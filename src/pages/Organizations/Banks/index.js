import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
// import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox'
import 'flatpickr/dist/flatpickr.css';
import StatusRenderer from 'src/components/StatusRenderer';
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';
import CommonFilters from 'src/components/Filters';
import MUIDataTable from "mui-datatables";
import { UrlConstants } from 'src/constants/UrlConstants';
import { getAllBankListApi } from 'src/services/Banks/BankService';
// import DataTable from 'src/pages/datatables/MyDataTable';
const Index = () => {
  const [bankList, setbankList] = useState([])

  const data = [
    { shortName: 'Public Sector', id: 'RB Enterprise', bankTypeMasterName: 'xyz@gmail.com' },
  ];

  const router = useRouter();
  const AddBankHierarchy = () => {
    router.push('/Organizations/Banks/Hierarchy/Add');
  }


  const options = {
    print: false,
    selectableRows: 'none', // set checkbox for each row
    onChangePage(currentPage) {
      console.log({ currentPage });
    },
    onChangeRowsPerPage(numberOfRows) {
      console.log({ numberOfRows });
    }
  };


  const handleRowClicked = (rowData) => {
    // Assuming the row data contains an "id" property
    console.log(rowData)
    if (rowData.id) {
      router.push(`/Organizations/Banks/Hierarchy/View/${rowData.id}`)
    }
  };
  const columns = [
    { label: 'Short Name', name: 'shortName' },
    { label: 'Bank Id', name: 'id' },
    { label: 'Bank Name', name: 'bankTypeMasterName' },
    // {
    //   label: 'Status', name: 'Status',
    //   options: {
    //     filter: true,
    //     customBodyRender: (value) => {
    //       return (
    //         <StatusRenderer value={value} />
    //       );
    //     }
    //   }
    // },
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
          const rowData = bankList[tableMeta.rowIndex];
          return <MenuItemComponent viewOnclick={handleRowClicked} rowData={rowData} />;
        }
      },
    },
  ];

  const getAllBank = async () => {
    const page = 0;
    const pageSize = 10;
    try {
      const data = await getAllBankListApi(page, pageSize)
      setbankList(data.data.content)
    } catch (error) {
    }
  }

  useEffect(() => {
    getAllBank()
  }, [])



  return (
    <div>
      <CommonFilters onClick={AddBankHierarchy} addButtonLabel="Add Bank Hierarchy" icon={<AiOutlinePlus />} />
      {/* <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} onRowClick={handleRowClicked} /> */}
      <MUIDataTable options={options} data={bankList} columns={columns} />
    </div>
  )
}

export default Index