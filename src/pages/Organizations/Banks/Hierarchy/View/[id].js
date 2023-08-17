import React, { Fragment, useEffect, useState } from 'react'
import { Tab } from '@headlessui/react';
// import TableWithCheckBox from 'src/pages/datatables/TableWithCheckBox';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import CommonFilters from 'src/components/Filters';
import MUIDataTable from "mui-datatables";
import { GetBankHoDetailsApi, getAllLevelsByBankIdApi, getBankListByLevelApi } from 'src/services/Banks/BankService';
import { Box, Card, CardContent } from '@mui/material';
import IconButton from 'src/components/Button/IconButtonComponent';
const Index = () => {
    const router = useRouter();
    const { id } = router.query;
    const [tabTitlesData, settabTitlesData] = useState([])
    const [bankHoData, setbankHoData] = useState({})
    const [currentTab, setCurrentTab] = useState(0);
    const [currentLevelId, setcurrentLevelId] = useState("")

    const [dataTableOptions, setDataTableOptions] = useState({
        print: false,
        rowsPerPage: 4, // Number of rows per page
        page: 0, // Current page
        onChangePage: (currentPage) => {
            setDataTableOptions({ ...dataTableOptions, page: currentPage });
        },
        onChangeRowsPerPage: (numberOfRows) => {
            setDataTableOptions({ ...dataTableOptions, rowsPerPage: numberOfRows });
        }
    });

    const buttonClassName = (selected) => {
        return `${selected ? 'bg-primary text-white !outline-none' : ''
            } -mb-[1px] block rounded p-4 py-3.5 text-md  font-bold hover:bg-primary hover:text-white ltr:mr-2 rtl:ml-2`;
    };
    // define tab titles 
    const tabTitles = [
        { id: 1, value: 'Head Office' },
        { id: 2, value: "Zone" },
        { id: 3, value: 'Region' },
        { id: 4, value: "Cluster" },
        { id: 5, value: "Branch" }
    ]

    // row data and columndefs 
    const data = [
        { id: 1, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001' },
        { id: 2, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001' },
        { id: 3, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001' },
        { id: 4, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001' },
        { id: 5, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001' },
        { id: 6, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001' },
        { id: 7, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001' },
        { id: 8, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001' },
        { id: 9, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001' },
        { id: 10, Zone: 'ZoneTwo', ZoneId: 'ZONENEW2', District: 'Indore', Pincode: '452001' },
    ];
    const columns = [
        { label: 'Sr No.', name: 'id' },
        { label: 'Zone', name: 'Zone' },
        { label: 'Zone ID', name: 'ZoneId' },
        { label: 'District', name: 'District' },
        { label: 'Pincode', name: 'Pincode' },
    ];

    const getBankListByLevel = async () => {
        const data = await getBankListByLevelApi()
        console.log(data)
    }

    useEffect(() => {
        if (currentTab !== 0) {
            getBankListByLevel(id, currentLevelId)
        }
    }, [currentTab])
    
    


    const getAllLevelsByBankId = async (id) => {
        try {
            const data = await getAllLevelsByBankIdApi(id);
            if (data.status === 200) {
                const formattedData = data.data.dataList.map(item => {
                    return {
                        id: item.id,
                        value: item.name
                    };
                });
                settabTitlesData(formattedData)
            }
        } catch (error) {

        }
    }

    const getBankHoDetails = async (id) => {
        try {
            const data = await GetBankHoDetailsApi(id);
            if (data.data) {
                setbankHoData(data.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query;
            getAllLevelsByBankId(id)
            getBankHoDetails(id)
        }

    }, [router.isReady])


    const renderTabTitles = () => {
        return (
            <>
                <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a] ">
                    {tabTitlesData.map((item, index) => {
                        return (
                            <Tab key={item.id} as={Fragment}>
                                {({ selected }) => (
                                    <button onClick={() => {
                                        setCurrentTab(index);
                                        setcurrentLevelId(item.id)
                                    }} className={buttonClassName(selected)}>
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
        return (
            <Tab.Panel>
                <div className='active pt-5'>
                    <Box
                        className="w-full sm:w-3/4 border-2 rounded-md p-1 mt-7"
                    >
                        <div className="grid grid-cols-2 gap-4 p-2">
                            <div className="h-12">
                                {" "}
                                <span className="font-mont  serrat font-semibold text-left text-lg">
                                    Bank Name :
                                </span>
                            </div>
                            <div className="h-12">
                                {" "}
                                <span className="font-montserrat text-right text-lg">
                                    {bankHoData?.bankNameMaster?.name}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 p-2">
                            <div className="h-12">
                                {" "}
                                <span className="font-mont  serrat font-semibold text-left text-lg">
                                    Bank Type :
                                </span>
                            </div>
                            <div className="h-12">
                                {" "}
                                <span className="font-montserrat text-right text-lg">
                                    {bankHoData?.bankTypeMaster?.name}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 p-2">
                            <div className="h-12">
                                {" "}
                                <span className="font-mont  serrat font-semibold text-left text-lg">
                                    ShortName :
                                </span>
                            </div>
                            <div className="h-12">
                                {" "}
                                <span className="font-montserrat text-right text-lg">
                                    {bankHoData?.shortName}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 p-2">
                            <div className="h-12">
                                {" "}
                                <span className="font-mont  serrat font-semibold text-left text-lg">
                                    Address :
                                </span>
                            </div>
                            <div className="h-12">
                                {" "}
                                <span className="font-montserrat text-right text-lg">
                                    {bankHoData?.address ? bankHoData?.address : 'N/A'}
                                </span>
                            </div>
                        </div>

                    </Box>
                </div>
            </Tab.Panel>
        )
    }


    const renderTabContentWithButtons = () => {
        // Modify this function to provide content for different tabs
        // For now, this is a placeholder
        return (
            <Tab.Panel>
                <div className="flex flex-wrap mt-2">
                    <div className="ml-auto">
                        <button>
                            Add Button for {tabTitlesData[currentTab].value}
                        </button>
                    </div>
                </div>
                <div className='active pt-1'>
                    {/* Add specific content for each tab */}
                </div>
            </Tab.Panel>
        )
    }


    return (
        <div>
            <Card>
                {/* {console.log(currentTab)} */}
                {console.log(tabTitlesData[currentTab]?.value)}
                <CardContent>
                    <Tab.Group>
                        {/* tabs headings here  */}
                        {renderTabTitles()}
                        {
                            currentTab === 0 && renderTabFirstContent()
                        }

                        {
                            currentTab !== 0 && <>
                                <div className="flex flex-wrap mt-2">
                                    <div className="ml-auto">
                                        <IconButton
                                            label={`Add ${tabTitlesData[currentTab]?.value}`}
                                        />
                                    </div>
                                </div>
                                <div className='active pt-1'>
                                    <MUIDataTable options={dataTableOptions} data={data} columns={columns} />
                                </div>
                            </>
                        }


                    </Tab.Group>

                </CardContent>
            </Card>
        </div>
    )
}

export default Index