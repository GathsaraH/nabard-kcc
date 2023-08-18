import React from 'react'
import { ColorConstants } from 'src/constants/ColorConstants';
import LandingPageLayout from 'src/layouts/LandingPageLayout';

const Index = () => {

    const statusData = [
        { id: 1, Title: "Recieved", number: '02K', amount: '100000' }
    ]


    function statusBox() {
        return (
            <div className={`panel h-full w-3/4 border border-solid border-2 p-4 border-[#EEF2F0]`}>
                <div className="mb-5 flex justify-between dark:text-white-light">
                    <h5 className="text-lg font-semibold ">Expenses</h5>
                </div>
            </div>
        )
    }



    return (
        <div className='py-5 px-5' >
            <div className='w-full p-5' >
                <div className="flex space-x-2 rtl:space-x-reverse">
                    <span className='font-bold text-xl ' >Dashboard</span>

                </div>
                <div className="pt-5">
                    <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            statusData.map((item) => {
                                return (
                                    <div key={item.id}>
                                        {statusBox()}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


Index.getLayout = (page) => {
    return <LandingPageLayout>{page}</LandingPageLayout>;
};


export default Index