import React, { useState } from 'react'
import HrTag from 'src/components/Hr/HrTag';
import { Grid } from '@mui/material';
import { useRouter } from "next/router";
import Tippy from '@tippyjs/react';
import { MdArrowBackIos } from 'react-icons/md';
import { ColorConstants } from 'src/constants/ColorConstants';

const branchPerformanceDetail = [
    { property: "Bank Type", value: "PSB" },
    { property: "Bank Name", value: "Bank Of Baroda" },
    { property: "Branch Name", value: "Ved Road" },
    { property: "Branch Type", value: "Rural" },
    { property: "Reporting Period From", value: "11 Aug 2023" },
    { property: "Reporting Period To", value: "18 Aug 2023" },
    { property: "KCC Type", value: "KCC-Crop" },
]
const Index = () => {
    const router = useRouter();
    const data = [
        {
            "label": "Small Farmers",
            "data": [
                { "label": "Received", "values": [10, 100000] },
                { "label": "Sanctioned", "values": [10, 100000] },
                { "label": "Rejected", "values": [10, 100000] },
                { "label": "Disbursed", "values": [10, 100000] }
            ]
        },
        {
            "label": "Marginal Farmers",
            "data": [
                { "label": "Received", "values": [10, 100000] },
                { "label": "Sanctioned", "values": [10, 100000] },
                { "label": "Rejected", "values": [10, 100000] },
                { "label": "Disbursed", "values": [10, 100000] }
            ]
        },
        {
            "label": "Others",
            "data": [
                { "label": "Received", "values": [10, 100000] },
                { "label": "Sanctioned", "values": [10, 100000] },
                { "label": "Rejected", "values": [10, 100000] },
                { "label": "Disbursed", "values": [10, 100000] }
            ]
        },
        {
            "label": "Total",
            "data": [
                { "label": "Received", "values": [10, 100000] },
                { "label": "Sanctioned", "values": [10, 100000] },
                { "label": "Rejected", "values": [10, 100000] },
                { "label": "Disbursed", "values": [10, 100000] }
            ]
        },
    ]
    const [tableData, setTableData] = useState(data);

    function PageTitle() {
        return <div>
            <span className="text-xl font-semibold">
                Details of the Performance Data Entry
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
                            <Grid item xs={6} sm={2}>
                                <span className='font-bold text-sm md:text-lg'>{item.property}</span>
                            </Grid>
                            <Grid item xs={1} sm={1} >
                                :
                            </Grid>
                            <Grid item xs={5} sm={3}>
                                <span className='text-sm md:text-lg'>{item.value}</span>
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
                                                        {tableFields(branchPerformanceDetail)}
                                                    </div>
                                                </div>
                                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                                                    {tableData.map((section, sectionIndex) => (
                                                        <table key={sectionIndex}>
                                                            <thead style={{
                                                                backgroundColor: ColorConstants.lightBlue
                                                            }}>
                                                                <tr>
                                                                    <th colSpan={4} style={{ textAlign: 'center' }}>
                                                                        {section.label}
                                                                    </th>
                                                                </tr>
                                                                <tr>
                                                                    <th></th>
                                                                    <th>A/cs</th>
                                                                    <th>Amount</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {section.data.map((item, itemIndex) => (
                                                                    <tr key={itemIndex}>
                                                                        <td className={`visible ${section?.label == "Small Farmers" ? "md:visible" : "md:invisible"}`}>
                                                                            {item.label}
                                                                        </td>
                                                                        {item.values.map((value, valueIndex) => (
                                                                            <td key={valueIndex}>{value}</td>
                                                                        ))}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    ))}
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