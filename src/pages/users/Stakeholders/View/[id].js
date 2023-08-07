import React, {useState , Fragment } from 'react'
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/router';
import CommonFilters from 'src/components/Filters';
import StatusRenderer from 'src/components/StatusRenderer';
import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox';
import IconButton from 'src/components/Button/IconButtonComponent';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdArrowBackIos } from 'react-icons/md';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';
const Index = () => {
        const router = useRouter();
        const {t} = useTranslation();
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
         const rowData = [
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
          const columnDefs = [
            {
              headerCheckboxSelection: true,
              checkboxSelection: true,
              width: 40,
              suppressMenu: true,
            },
            { headerName: 'Sr No.', field: 'id', suppressMenu: true },
            { headerName: 'Name', field: 'Name', suppressMenu: true },
            { headerName: 'Department', field: 'Department', suppressMenu: true },
            { headerName: 'Area of Operation', field:'AreaofOpeartion', suppressMenu: true },
            { headerName: 'State', field: 'State', suppressMenu: true },
            {
                headerName: 'Status', field: 'Status', suppressMenu: true,
                cellRenderer: () => (
                  <StatusRenderer value="Active" />
                ),
              },
          ];
          const headingSection = () => {
            const handleAddStakeUser = () =>{
               router.push('/users/Stakeholders/Add');
            }
            return (
              <>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => router.back()} // Assuming 'router' is defined elsewhere in the component
                    type="button"
                    className="flex items-center p-3 rounded text-sm w-24"
                  >
                    <span className="common-Font-Family ml-4">
                      <Tippy content="back">
                        <MdArrowBackIos size={20} />
                      </Tippy>
                    </span>
                  </button>
                  <span className="heading-Font-Family" style={{ fontWeight: '700' }}>
                    {t("RB Enterprise")}
                  </span>
                  <div className="px-2">
                <IconButton label="Add Stakeholder User" className="btn-outline-primary" icon={<AiOutlinePlus />} onClick={handleAddStakeUser} />
                </div>
                </div>
              </>
            );
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
        // router.push('/Organizations/Stakeholders/Hierarchy/Add/AddImplementingAgency');
       }
        return(
            <Tab.Panel>
                <div className='active pt-5'>
                   <CommonFilters addButtonLabel="Add Implementing Agency" onClick={AddIAgency}/>
                    <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} />
                </div>
            </Tab.Panel>
        )
    }
    const renderTabThirdContent = () => {
        const AddNodalAgency = () => {
            // router.push('/Organizations/Stakeholders/Hierarchy/Add/NodalAgency')
        }
        return(
            <Tab.Panel>
                <div className='active pt-5'>
                    <CommonFilters addButtonLabel="Add Nodal Agency" onClick={AddNodalAgency}/>
      <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} />
                </div>
            </Tab.Panel>
        )
    }
    const renderTabFourthContent = () => {
        const AddPMU = () =>{
            // router.push('/Organizations/Stakeholders/Hierarchy/Add/PMU');
        }
        return(
            <Tab.Panel>
                <div className='active pt-5'>
                <CommonFilters addButtonLabel="Add PMU" onClick={AddPMU}/>
      <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} />
                </div>
            </Tab.Panel>
        )
    }
  return (
    <div>
        <Tab.Group>
            {/* tabs headings here  */}
            {headingSection()}
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