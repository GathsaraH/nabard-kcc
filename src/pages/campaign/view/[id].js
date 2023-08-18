import React, { useState } from 'react'
import HrTag from 'src/components/Hr/HrTag';
import { Grid } from '@mui/material';
import { useRouter } from "next/router";
import Tippy from '@tippyjs/react';
import { MdArrowBackIos } from 'react-icons/md';

const campaignDetail = [
    { property: "Name of the Campaign", value: "Awareness" },
    { property: "Organization Institution", value: "Details of the Awareness & Outreach Camp" },
    { property: "State", value: "Gujarat" },
    { property: "District", value: "Vadodara" },
    { property: "Block", value: "D Block" },
    { property: "Village", value: "Ved Road" },
    { property: "Start Date", value: "10 Aug 2023" },
    { property: "End Date", value: "15 Aug 2023" },
]
const Index = () => {
    const router = useRouter();
    const data = [
        {
            values: [10, 100, 10, 100, 10]
        },
    ];
    const [tableData, setTableData] = useState(data);

    function PageTitle() {
        return <div>
            <span className="text-xl font-semibold whitespace-nowrap">
                Details of the Awareness & Outreach Camp
            </span>
        </div>
    }

    function SubHeading(item) {
        return <div className="mr-5 m-2 m-sm-10 text-primary font-bold">
            {item}
        </div>
    }


    function tableFields(data) {
        return (
            <Grid px={3} columns={12} container className='mt-10'>
                {data.map((item) => {
                    return (
                        <>
                            <Grid item xs={12} sm={2}>
                                <span className='font-bold text-lg'>{item.property}</span>
                            </Grid>
                            <Grid item xs={12} sm={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                :
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <span className='text-lg'>{item.value}</span>
                            </Grid>
                        </>
                    );
                })}
            </Grid>
        );
    }

    return (
        <div>
            {/* <BankAccountTable userId={router.query.beneficiaryId} /> */}
            <div className="flex-1 flex flex-col lg:overflow-hidden">
                <div className="flex h-full">
                    <main className="w-full bg-gray-100 h-full overflow-x-hidden overflow-y-auto mb-14">
                        <div className="w-full mx-auto mt-2">
                            <div className="flex flex-col w-full h-full text-gray-900 text-xl ">
                                <div className="px-2 md:px-5">
                                    <div>
                                        <div className="flex w-full">
                                            <div className="w-full block rounded-lg shadow-lg bg-white">
                                                <div className="text-left p-5">
                                                    <div className="grid grid-cols-12 m-1">
                                                        <div className="col-start-1 col-end-2 flex justify-center items-center">
                                                            <button
                                                                onClick={() => router.back()}
                                                                type="button"
                                                                className="flex items-center  p-3 rounded text-sm w-24"
                                                            >
                                                                <span className="common-Font-Family ml-4">
                                                                    <Tippy content="back">
                                                                        <MdArrowBackIos size={20} />
                                                                    </Tippy>
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div className="col-start-2 col-end-13 flex justify-center items-center">
                                                            {PageTitle()}
                                                        </div>
                                                    </div>
                                                    <HrTag />
                                                    <div className="w-full">
                                                        {tableFields(campaignDetail)}
                                                    </div>
                                                </div>
                                                <div className="table-container p-4">
                                                    <table className="data-table">
                                                        <thead style={{ backgroundColor: '#D2ECFA' }}>
                                                            <tr>
                                                                <th>Farmers Reached</th>
                                                                <th>Applications Received</th>
                                                                <th>Applications Sanctioned</th>
                                                                <th>Applications Rejected</th>
                                                                <th>Total Credit Disbursed (in Rs)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {tableData.map((item, sectionIndex) => (
                                                                <tr key={sectionIndex}>
                                                                    {item.values.map((value, valueIndex) => (
                                                                        <td key={valueIndex}>
                                                                            {value}
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Index