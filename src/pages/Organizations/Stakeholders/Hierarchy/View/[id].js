import React, {useState , Fragment } from 'react'
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/router';
import CommonFilters from 'src/components/Filters';
import StatusRenderer from 'src/components/StatusRenderer';
// import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox';
import MUIDataTable from "mui-datatables";
import { AiOutlinePlus } from 'react-icons/ai';
const Index = () => {
        const router = useRouter();
        const [ministry, setMinistry] = useState(true);
    const buttonClassName = (selected) => {
        return `${selected ? 'bg-primary text-white !outline-none' : ''
          } -mb-[1px] block rounded p-4 py-3.5 text-md  font-bold hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`;
      };
    // define tab titles 
    const tabTitles = [
        {id :1 , value : "Ministry"},
        {id :2 , value : 'Implementing Agency'} ,
         {id:3 , value :"Nodal Agency"} ,
         {id:4 , value:'PMU'}
         ]
         // row data and columndefs 
         const data = [
            { id: 1, Name: 'abc', Department: 'Public Sector', 'AreaofOpeartion': 'Indore', State: 'MP' , status : "Active"},
            { id: 2, Name: 'abc', Department: 'Public Sector', 'AreaofOpeartion': 'Indore', State: 'MP' , status : "Active"},
            { id: 3, Name: 'abc', Department: 'Public Sector', 'AreaofOpeartion': 'Indore', State: 'MP' , status : "Active"},
            { id: 4, Name: 'abc', Department: 'Public Sector', 'AreaofOpeartion': 'Indore', State: 'MP' , status : "Active"},
            { id: 5, Name: 'abc', Department: 'Public Sector', 'AreaofOpeartion': 'Indore', State: 'MP' , status : "Active"},
            { id: 6, Name: 'abc', Department: 'Public Sector', 'AreaofOpeartion': 'Indore', State: 'MP' , status : "Active"},
            { id: 7, Name: 'abc', Department: 'Public Sector', 'AreaofOpeartion': 'Indore', State: 'MP' , status : "Active"},
            { id: 8, Name: 'abc', Department: 'Public Sector', 'AreaofOpeartion': 'Indore', State: 'MP' , status : "Active"},
            { id: 9, Name: 'abc', Department: 'Public Sector', 'AreaofOpeartion': 'Indore', State: 'MP' , status : "Active"},
            { id: 10, Name: 'abc', Department: 'Public Sector', 'AreaofOpeartion': 'Indore', State: 'MP' , status : "Active"},
          ];
          const columns = [
           
            { label: 'Sr No.', name: 'id' },
            { label: 'Name', name: 'Name' },
            { label: 'Department', name: 'Department' },
            { label: 'Area of Operation', name:'AreaofOpeartion' },
            { label: 'State', name: 'State' },
            {
                label: 'Status', name: 'status',
                // cellRenderer: (value) => (
                //   <StatusRenderer value={value} />
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
          ];
          const options = {
            print: false,
            onChangePage(currentPage) {
              console.log({ currentPage });
            },
            onChangeRowsPerPage(numberOfRows) {
              console.log({ numberOfRows });
            }
          };
    const renderTabTitles = () =>{
            return(
                <>
                <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a] ">
                    {tabTitles.map((item)=>{
                        return(
                            <Tab key={item.id} as={Fragment}>
                                {({selected}) => (
                                    <button className={buttonClassName(selected)}>
                                        <span>{item.value}</span>
                                    </button>
                                )}
                            </Tab>
                        )
                    })}
                </Tab.List>
                </>
            )
    }
    const renderTabFirstContent = () => {
        return(
            <Tab.Panel>
                <div className='active pt-5'>
                  <p>Ministry content</p>
                </div>
            </Tab.Panel>
        )
    }
    const renderTabSecondContent = () => {
       const AddIAgency = () =>{
        router.push('/Organizations/Stakeholders/Hierarchy/Add/AddImplementingAgency');
       }
        return(
            <Tab.Panel>
                <div className='active pt-5'>
                   <CommonFilters addButtonLabel="Add Implementing Agency" onClick={AddIAgency} icon={<AiOutlinePlus/>}/>
                   <MUIDataTable options={options} data={data} columns={columns} />
                  
                    {/* <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} /> */}
                </div>
            </Tab.Panel>
        )
    }
    const renderTabThirdContent = () => {
        const AddNodalAgency = () => {
            router.push('/Organizations/Stakeholders/Hierarchy/Add/NodalAgency')
        }
        return(
            <Tab.Panel>
                <div className='active pt-5'>
                    <CommonFilters addButtonLabel="Add Nodal Agency" onClick={AddNodalAgency} icon={<AiOutlinePlus/>}/>
                    <MUIDataTable options={options} data={data} columns={columns} />
      
      {/* <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} /> */}
                </div>
            </Tab.Panel>
        )
    }
    const renderTabFourthContent = () => {
        const AddPMU = () =>{
            router.push('/Organizations/Stakeholders/Hierarchy/Add/PMU');
        }
        return(
            <Tab.Panel>
                <div className='active pt-5'>
                <CommonFilters addButtonLabel="Add PMU" onClick={AddPMU} icon={<AiOutlinePlus/>}/>
                <MUIDataTable options={options} data={data} columns={columns} />
     
      {/* <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} /> */}
                </div>
            </Tab.Panel>
        )
    }
  return (
    <div>
        <Tab.Group>
            {/* tabs headings here  */}
            {renderTabTitles()}
            <Tab.Panels>
                {renderTabFirstContent()}
                {renderTabSecondContent()}
                {renderTabThirdContent()}
                {renderTabFourthContent()}
                {/* tabs content here  */}
            </Tab.Panels>
        </Tab.Group>

    </div>
  )
}

export default Index