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


  const AddCampagin = () => {
    //go to campaign creation page
    router.push('/campaign/add');
  }
    const handleRowClicked = (rowData) => {
        // Assuming the row data contains an "id" property
        if(rowData.id){
            router.push(`/campaign/view/${rowData.id}/`)
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
        { id: 1, State: 'Gujarat', District: 'Vadodara', OrganisingEntity: 'BDO Dabhoi ', FarmersParticipated: '15', ApplicationSanctioned:'10' },
        { id: 2, State: 'Gujarat', District: 'Vadodara', OrganisingEntity: 'BDO Dabhoi ', FarmersParticipated: '15', ApplicationSanctioned:'10' },
        { id: 3, State: 'Gujarat', District: 'Vadodara', OrganisingEntity: 'BDO Dabhoi ', FarmersParticipated: '15', ApplicationSanctioned:'10' },
        { id: 4, State: 'Gujarat', District: 'Vadodara', OrganisingEntity: 'BDO Dabhoi ', FarmersParticipated: '15', ApplicationSanctioned:'10' },
        { id: 5, State: 'Gujarat', District: 'Vadodara', OrganisingEntity: 'BDO Dabhoi ', FarmersParticipated: '15', ApplicationSanctioned:'10' },
        { id: 6, State: 'Gujarat', District: 'Vadodara', OrganisingEntity: 'BDO Dabhoi ', FarmersParticipated: '15', ApplicationSanctioned:'10' },
        { id: 7, State: 'Gujarat', District: 'Vadodara', OrganisingEntity: 'BDO Dabhoi ', FarmersParticipated: '15', ApplicationSanctioned:'10' },
        { id: 8, State: 'Gujarat', District: 'Vadodara', OrganisingEntity: 'BDO Dabhoi ', FarmersParticipated: '15', ApplicationSanctioned:'10' },
        { id: 9, State: 'Gujarat', District: 'Vadodara', OrganisingEntity: 'BDO Dabhoi ', FarmersParticipated: '15', ApplicationSanctioned:'10' },
        { id: 10, State: 'Gujarat', District: 'Vadodara', OrganisingEntity: 'BDO Dabhoi ', FarmersParticipated: '15', ApplicationSanctioned:'10' },
      ];
        const columns = [
          { label: 'Sr No.', name: 'id'},
          { label: 'State', name: 'State'},
          { label: 'District', name: 'District' },
          { label: 'Organising Entity', name: 'OrganisingEntity' },
          { label: 'Farmers Participated', name: 'FarmersParticipated' },
          { label: 'Application Sanctioned', name: 'ApplicationSanctioned' },
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
              onClickSecond={AddCampagin} addSecondButtonLabel="Add Campagin" iconSecond={<AiOutlinePlus />}             
            />
            <MUIDataTable options={options} data={data} columns={columns} options={{
              selectableRows: false,
              responsive: "scroll",
            }}/>
          </div>
        )
}

export default Index
