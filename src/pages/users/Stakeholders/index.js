import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import CommonFilters from 'src/components/Filters'
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';

import MUIDataTable from "mui-datatables";

const Index = () => {
  const router = useRouter();
  //Add New User Function is call
  const AddUser = () => {
    //go to New stackeholder user creation page
    router.push('/users/stakeholders/add');
  }

  const handleRowClicked = (rowData) => {
    // Assuming the row data contains an "id" property
    if (rowData.id) {
      router.push(`/users/stakeholders/view/${rowData.id}/`)
    }
  };
  const options = {
    selectableRows: 'none', // set checkbox for each row
    print: false,
    onChangePage(currentPage) {
      console.log({ currentPage });
    },
    onChangeRowsPerPage(numberOfRows) {
      console.log({ numberOfRows });
    }
  };


  const data = [
    { id: 1, StakeholderName: 'Ministries', EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999' },
    { id: 2, StakeholderName: 'Ministries', EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999' },
    { id: 3, StakeholderName: 'Ministries', EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999' },
    { id: 4, StakeholderName: 'Ministries', EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999' },
    { id: 5, StakeholderName: 'Ministries', EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999' },
    { id: 6, StakeholderName: 'Ministries', EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999' },
    { id: 7, StakeholderName: 'Ministries', EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999' },
    { id: 8, StakeholderName: 'Ministries', EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999' },
    { id: 9, StakeholderName: 'Ministries', EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999' },
    { id: 10, StakeholderName: 'Ministries', EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999' },
  ];
  const columns = [
    { label: 'Sr No.', name: 'id' },
    { label: 'Stakeholder Name', name: 'StakeholderName' },
    { label: 'Employee Name', name: 'EmployeeName' },
    { label: 'Office', name: 'Office' },
    { label: 'Area of Operation', name: 'AreaOfOperation' },
    { label: 'Mobile No', name: 'MobileNo' },
    {
      label: 'Actions',
      name: 'actions',
      // cellRenderer: (params) => (
      //   <MenuItemComponent viewOnclick={handleRowClicked} rowData={params.data}/>
      // ),
      options: {
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
          return result;
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
      <CommonFilters onClick={AddUser} addButtonLabel="Add User" icon={<AiOutlinePlus />} hideSecondIconButton="true" />
      <MUIDataTable options={options} data={data} columns={columns} options={{
        selectableRows: false,
        responsive: "scroll",
      }} />
    </div>
  )
}

export default Index
