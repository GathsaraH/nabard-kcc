import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import CommonFilters from 'src/components/Filters'
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';
import MUIDataTable from "mui-datatables";

const Index = () => {
  const router = useRouter();
  const AddUser = () => {
    //Gi to the New Organization User creation page
    router.push('/users/employee/add');
  }
  const handleRowClicked = (rowData) => {
    // Assuming the row data contains an "id" property
    if (rowData.id) {
      router.push(`/users/employee/view/${rowData.id}/`)
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
    { id: 1, EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999', EmailId: "abc@gmail.com" },
    { id: 2, EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999', EmailId: "abc@gmail.com" },
    { id: 3, EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999', EmailId: "abc@gmail.com" },
    { id: 4, EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999', EmailId: "abc@gmail.com" },
    { id: 5, EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999', EmailId: "abc@gmail.com" },
    { id: 6, EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999', EmailId: "abc@gmail.com" },
    { id: 7, EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999', EmailId: "abc@gmail.com" },
    { id: 8, EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999', EmailId: "abc@gmail.com" },
    { id: 9, EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999', EmailId: "abc@gmail.com" },
    { id: 10, EmployeeName: 'Abhishek Shah', Office: 'DDM', AreaOfOperation: 'Vadodara', MobileNo: '9999999999', EmailId: "abc@gmail.com" },
  ];
  const columns = [
    { label: 'Sr No.', name: 'id' },
    { label: 'Employee Name', name: 'EmployeeName' },
    { label: 'Office', name: 'Office' },
    { label: 'Area of Operation', name: 'AreaOfOperation' },
    { label: 'Mobile No', name: 'MobileNo' },
    { label: 'Email id', name: 'EmailId' },
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
