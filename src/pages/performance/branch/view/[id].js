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
            ]
        },
        {
            "label": "Marginal Farmers",
            "data": [
                { "label": "Received", "values": [10, 100000] },
                { "label": "Sanctioned", "values": [10, 100000] },
                { "label": "Rejected", "values": [10, 100000] },
            ]
        },
        {
            "label": "Others",
            "data": [
                { "label": "Received", "values": [10, 100000] },
                { "label": "Sanctioned", "values": [10, 100000] },
                { "label": "Rejected", "values": [10, 100000] },
            ]
        },
        {
            "label": "Total",
            "data": [
                { "label": "Received", "values": [10, 100000] },
                { "label": "Sanctioned", "values": [10, 100000] },
                { "label": "Rejected", "values": [10, 100000] },
            ]
        },
    ]
    const [tableData, setTableData] = useState(data);

    function PageTitle() {
        return <div>
            <span className="text-lg md:text-xl font-bold whitespace-prewrap flex text-center">
                Details of the Performance Data Entry
            </span>
        </div>
    }
   

    function tableFields() {
        const midpoint = Math.ceil(branchPerformanceDetail.length / 2);
        const firstColumnData = branchPerformanceDetail.slice(0, midpoint);
        const secondColumnData = branchPerformanceDetail.slice(midpoint);
        return (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
                {firstColumnData.map((item, index) => (
                    <Grid key={index} px={3} columns={12} container className="mt-4">
                        <Grid item xs={6} sm={5}>
                            <span className="font-bold text-sm md:text-lg">{item.property}</span>
                        </Grid>
                        <Grid item xs={1} sm={1}>
                            <span className="font-bold text-sm md:text-lg">:</span>
                        </Grid>
                        <Grid item xs={5} sm={6}>
                            <span className="text-sm md:text-lg font-semibold">{item.value}</span>
                        </Grid>
                    </Grid>
                ))}
            </div>
            <div>
            {secondColumnData.map((item, index) => (
                <Grid key={index} px={3} columns={12} container className="mt-4">
                    <Grid item xs={6} sm={5}>
                        <span className="font-bold text-sm md:text-lg">{item.property}</span>
                    </Grid>
                    <Grid item xs={1} sm={1}>
                        <span className="font-bold text-sm md:text-lg">:</span>
                    </Grid>
                    <Grid item xs={5} sm={6}>
                        <span className="text-sm md:text-lg font-semibold">{item.value}</span>
                    </Grid>
                </Grid>
            ))}
        </div>
        </div>
        </>
        );
    }

    return (
        <div>
            <div className="w-full h-full block rounded-lg shadow-lg bg-white text-left p-2">
                <div className="grid grid-cols-12 m-1 gap-3">
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
                    <div className="col-start-2 col-end-13 flex text-bold justify-start md:justify-center items-center">
                        {PageTitle()}

                    </div>
                </div>
                <HrTag />
                <div className="w-full mb-4">
                    {tableFields(branchPerformanceDetail)}

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
    )
}

export default Index