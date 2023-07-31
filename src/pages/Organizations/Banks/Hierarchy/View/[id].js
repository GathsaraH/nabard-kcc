import React, { Fragment } from 'react'
import { Tab } from '@headlessui/react';
import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox';
import IconButton from 'src/components/Button/IconButtonComponent';
import { TextField } from '@mui/material';
import { AiOutlinePlus } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
const Index = () => {
        const {t} = useTranslation();
        const router = useRouter();
        
    const buttonClassName = (selected) => {
        return `${selected ? 'bg-primary text-white !outline-none' : ''
          } -mb-[1px] block rounded p-4 py-3.5 text-md  font-bold hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`;
      };
    // define tab titles 
    const tabTitles = [
        {id :1 , value : 'Head Office'} ,
         {id:2 , value :"Zone"} ,
         {id:3 , value:'Region'},
         {id :4 , value :"Cluster"} ,
         {id :5 , value : "Branch"}
         ]

         // row data and columndefs 
         const rowData = [
            { id: 1, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001'},
            { id: 2, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001'},
            { id: 3, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001'},
            { id: 4, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001'},
            { id: 5, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001'},
            { id: 6, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001'},
            { id: 7, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001'},
            { id: 8, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001'},
            { id: 9, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001'},
            { id: 10, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001'},
          ];
          const columnDefs = [
            {
              headerCheckboxSelection: true,
              checkboxSelection: true,
              width: 40,
              suppressMenu: true,
            },
            { headerName: 'Sr No.', field: 'id', suppressMenu: true },
            { headerName: 'Zone', field: 'Zone', suppressMenu: true },
            { headerName: 'Zone ID', field: 'ZoneId', suppressMenu: true },
            { headerName: 'District', field: 'District', suppressMenu: true },
            { headerName: 'Pincode', field: 'Pincode', suppressMenu: true },
          ];
    const renderTabTitles = () =>{
            return(
                <>
                <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a] ">
                    {tabTitles.map((item)=>{
                        return(
                            <Tab key={item.id} as={Fragment}>
                                {({selected}) => (
                                    <button className={buttonClassName(selected)}>
                                        <b style={{fontSize:'20px'}}>{item.value}</b>
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
                    <p>head office content</p>
                </div>
            </Tab.Panel>
        )
    }
    const renderTabSecondContent = () => {
        const AddZone = () =>{
            router.push('/Organizations/Banks/Hierarchy/Add/Zone')
        }
        return(
            <Tab.Panel>
                <div className='active pt-5'>
                <div className="flex flex-wrap gap-1 mb-4">
        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Search user")}
            name="Search User"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Date")}
            name="Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Start Date")}
            name="Start Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("End Date")}
            name="End Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Select Header column")}
            name="select header column"
            required
            variant="outlined"
            size="small"
          />
        </div>
        <div className="px-2">
        <IconButton label="Add Zone" className="btn-outline-primary" icon={<AiOutlinePlus />} onClick={AddZone} />
        </div>
      </div>
                    <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} />
                    <p>Zone content</p>
                </div>
            </Tab.Panel>
        )
    }
    const renderTabThirdContent = () => {
        const AddRegion = () =>{
            router.push('/Organizations/Banks/Hierarchy/Add/Region')
        }
        return(
            <Tab.Panel>
                <div className='active pt-5'>
                    <p>Region content</p>
                    <div className="flex flex-wrap gap-1 mb-4">
        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Search user")}
            name="Search User"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Date")}
            name="Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Start Date")}
            name="Start Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("End Date")}
            name="End Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Select Header column")}
            name="select header column"
            required
            variant="outlined"
            size="small"
          />
        </div>
        <div className="px-2">
        <IconButton label="Add Region" className="btn-outline-primary" icon={<AiOutlinePlus />} onClick={AddRegion} />
        </div>
      </div>
      <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} />
                </div>
            </Tab.Panel>
        )
    }
    const renderTabFourthContent = () => {
        const AddCluster = () =>{
            router.push('/Organizations/Banks/Hierarchy/Add/Cluster')
        }
        return(
            <Tab.Panel>
                <div className='active pt-5'>
                  
                    <div className="flex flex-wrap gap-1 mb-4">
        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Search user")}
            name="Search User"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Date")}
            name="Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Start Date")}
            name="Start Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("End Date")}
            name="End Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Select Header column")}
            name="select header column"
            required
            variant="outlined"
            size="small"
          />
        </div>
        <div className="px-2">
        <IconButton label="Add Cluster" className="btn-outline-primary" icon={<AiOutlinePlus />} onClick={AddCluster} />
        </div>
      </div>
      <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true} />
                </div>
            </Tab.Panel>
        )
    }
    const renderTabFifthContent = () => {
        const AddBranch = () => {
            router.push('/Organizations/Banks/Hierarchy/Add/Branch')
        }
        return(
            <Tab.Panel>
                <div className='active pt-5'>
                    <p>Branch content</p>
                    <div className="flex flex-wrap gap-1 mb-4">
        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Search user")}
            name="Search User"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Date")}
            name="Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Start Date")}
            name="Start Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("End Date")}
            name="End Date"
            required
            variant="outlined"
            size="small"
          />
        </div>

        <div className="px-2">
          <TextField
            id="outlined-basic"
            label={t("Select Header column")}
            name="select header column"
            required
            variant="outlined"
            size="small"
          />
        </div>
        <div className="px-2">
        <IconButton label="Add Branch" className="btn-outline-primary" icon={<AiOutlinePlus />} onClick={AddBranch} />
        </div>
      </div>
      <TableWithCheckBox rowData={rowData} columnDefs={columnDefs} pagination={true}/>
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
                {renderTabFifthContent()}
                {/* tabs content here  */}
            </Tab.Panels>
        </Tab.Group>

    </div>
  )
}

export default Index