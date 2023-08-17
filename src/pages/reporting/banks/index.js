import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlineArrowUp } from 'react-icons/ai';
import CommonFilters from 'src/components/Filters'
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';
import MUIDataTable from "mui-datatables";

const Index = () => {
  const router = useRouter();
  const uploadData = () => {
    //router.push('/Organizations/Banks/Hierarchy/Add');
  }
    const handleRowClicked = (rowData) => {
        // Assuming the row data contains an "id" property
        if(rowData.id){
            router.push(`/reporting/branches/view/${rowData.id}/`)
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
        { id: 1, State: 'Gujarat', District: 'Vadodara', BankType: 'PSB', BankName: 'Bank Of Baroda' },
        { id: 2, State: 'Gujarat', District: 'Vadodara', BankType: 'PSB', BankName: 'Bank Of Baroda' },
        { id: 3, State: 'Gujarat', District: 'Vadodara', BankType: 'PSB', BankName: 'Bank Of Baroda' },
        { id: 4, State: 'Gujarat', District: 'Vadodara', BankType: 'PSB', BankName: 'Bank Of Baroda' },
        { id: 5, State: 'Gujarat', District: 'Vadodara', BankType: 'PSB', BankName: 'Bank Of Baroda' },
        { id: 6, State: 'Gujarat', District: 'Vadodara', BankType: 'PSB', BankName: 'Bank Of Baroda' },
        { id: 7, State: 'Gujarat', District: 'Vadodara', BankType: 'PSB', BankName: 'Bank Of Baroda' },
        { id: 8, State: 'Gujarat', District: 'Vadodara', BankType: 'PSB', BankName: 'Bank Of Baroda' },
        { id: 9, State: 'Gujarat', District: 'Vadodara', BankType: 'PSB', BankName: 'Bank Of Baroda' },
        { id: 10, State: 'Gujarat', District: 'Vadodara', BankType: 'PSB', BankName: 'Bank Of Baroda' },
      ];
        const columns = [
          { label: 'Sr No.', name: 'id'},
          { label: 'State Name', name: 'State'},
          { label: 'District', name: 'District' },
          { label: 'Bank Type', name: 'BankType' },
          { label: 'Bank Name', name: 'BankName' },
          {
            label: 'Actions',
            name: 'actions',
            // cellRenderer: (params) => (
            //   <MenuItemComponent viewOnclick={handleRowClicked} rowData={params.data}/>
            // ),
            options:{
            customBodyRender: (value, tableMeta) => {
              const rowData = data[tableMeta.rowIndex];
              return <MenuItemComponent viewOnclick={handleRowClicked} rowData={rowData} />;
            }
          }
          },
        ];
        return (
          <div>
            <CommonFilters onClick={uploadData} addButtonLabel="Import" icon={<AiOutlineArrowUp />} hideSecondIconButton="true" />
            <MUIDataTable options={options} data={data} columns={columns} />
          </div>
        )
}

export default Index
