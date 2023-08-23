import React, { useState } from 'react'
import SelectInput from 'src/components/Input/Select/SelectInput';
import { formatIndianNumber } from 'src/hooks/NumberSystem/useIndianFormatHook';

import LandingPageLayout from 'src/layouts/LandingPageLayout';
import FirstSection from './Sections/FirstSection';
import {showShapeDown} from "../landing-page";
import {ColorConstants} from "../../constants/ColorConstants";
import QuickLinkSection from "../landing-page/Sections/QuickLinkSection";

const selectOptions = [
    { value: '1', label: 'KCC - Crop - Small Farmer' },
    { value: '2', label: 'KCC - Crop - Medium Farmer' },
    { value: '3', label: 'KCC - Crop - Large Farmer' },
]


const Index = () => {
    const [performanceView, setperformanceView] = useState("")
    const statusData = [
        { id: 1, Title: "Total No Of Employee", number: '02K', amount: formatIndianNumber('100000') },
        { id: 2, Title: "Total Application", number: '02K', amount: formatIndianNumber('100000') },
        { id: 3, Title: "Awareness Campaign ", number: '02K', amount: formatIndianNumber('100000') },
        { id: 4, Title: "Total Application Amount ", number: '02K', amount: formatIndianNumber('100000') },
    ]


    function statusBox(item) {

        return (
            <div className={`panel h-4/5 w-full sm:w-3/4 border border-solid border-2 p-4 border-[#EEF2F0]`}>
                <div className="mb-5 flex flex-col justify-between dark:text-white-light">
                    <h5 className="text-lg font-semibold ">{item.Title}</h5>
                    <div className='py-2' > <h5 className="text-2xl font-bold ">{item.amount}</h5></div>

                </div>
            </div>
        )
    }

    const handlePerformanceView = (e) => {
        setperformanceView(e.target.value)
    }



    return (
        <>
            <div className='py-5 px-5' >
                <div className='w-full p-5' >
                    <div className="flex space-x-2 rtl:space-x-reverse">
                        <span className='font-bold text-xl ' >Dashboard</span>

                    </div>
                    <div className="pt-5">
                        <div className=" grid sm:grid-cols-2 lg:grid-cols-4">
                            {
                                statusData.map((item) => {
                                    return (
                                        <div key={item.id}>
                                            {statusBox(item)}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="pt-5">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-6">
                            <span className='font-bold text-lg mt-1' >Select Performance View </span>
                            <div className='mt-5 sm:mt-0' >
                                <SelectInput onChange={handlePerformanceView} value={performanceView} wdith={"100%"} label="KCC - Crop - Small Farmer" options={selectOptions} />
                            </div>
                        </div>
                    </div>
                    <div className="pt-5">
                        <FirstSection/>
                    </div>
                </div>
            </div>
            {showShapeDown(ColorConstants.primaryColor)}
            <QuickLinkSection />
        </>
    )
}


Index.getLayout = (page) => {
    return <LandingPageLayout>{page}</LandingPageLayout>;
};


export default Index
