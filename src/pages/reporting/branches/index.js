import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlineArrowUp,AiOutlinePlus } from 'react-icons/ai';
import CommonFilters from 'src/components/Filters'
import MenuItemComponent from 'src/components/Input/Others/MenuItemComponent';
import MUIDataTable from "mui-datatables";

const Index = () => {
  const router = useRouter();
  const UploadData = () => {
    //router.push('/Organizations/Banks/Hierarchy/Add');
  }
  const AddBranch = () => {
    //go to branch creation page
    router.push('/reporting/branches/add');
  }
    const handleRowClicked = (rowData) => {
        // Assuming the row data contains an "id" property
        if(rowData.id){
            router.push(`/reporting/branches/view/${rowData.id}/`)
        }
      };
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

      const data = [
        { id: 1, State: 'Gujarat', District: 'Vadodara', BankName: 'Bank Of Baroda', BranchType: 'Rural', BranchName: 'OP Road' },
        { id: 2, State: 'Gujarat', District: 'Vadodara', BankName: 'Bank Of Baroda', BranchType: 'Rural', BranchName: 'OP Road' },
        { id: 3, State: 'Gujarat', District: 'Vadodara', BankName: 'Bank Of Baroda', BranchType: 'Rural', BranchName: 'OP Road' },
        { id: 4, State: 'Gujarat', District: 'Vadodara', BankName: 'Bank Of Baroda', BranchType: 'Rural', BranchName: 'OP Road' },
        { id: 5, State: 'Gujarat', District: 'Vadodara', BankName: 'Bank Of Baroda', BranchType: 'Rural', BranchName: 'OP Road' },
        { id: 6, State: 'Gujarat', District: 'Vadodara', BankName: 'Bank Of Baroda', BranchType: 'Rural', BranchName: 'OP Road' },
        { id: 7, State: 'Gujarat', District: 'Vadodara', BankName: 'Bank Of Baroda', BranchType: 'Rural', BranchName: 'OP Road' },
        { id: 8, State: 'Gujarat', District: 'Vadodara', BankName: 'Bank Of Baroda', BranchType: 'Rural', BranchName: 'OP Road' },
        { id: 9, State: 'Gujarat', District: 'Vadodara', BankName: 'Bank Of Baroda', BranchType: 'Rural', BranchName: 'OP Road' },
        { id: 10, State: 'Gujarat', District: 'Vadodara', BankName: 'Bank Of Baroda', BranchType: 'Rural', BranchName: 'OP Road' },
      ];
        const columns = [
          { label: 'Sr No.', name: 'id'},
          { label: 'State', name: 'State'},
          { label: 'District', name: 'District' },
          { label: 'Bank', name: 'BankName' },
          { label: 'Branch Type', name: 'BranchType' },
          { label: 'Name of the Branch', name: 'BranchName' },
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
              <CommonFilters onClick={UploadData} addButtonLabel="Import" icon={<AiOutlineArrowUp />}
              onClickSecond={AddBranch} addSecondButtonLabel="Add Branch" iconSecond={<AiOutlinePlus />}   />
              <MUIDataTable options={options} data={data} columns={columns} />
            </div>
        )
}

export default Index
