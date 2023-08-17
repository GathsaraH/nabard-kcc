import React from 'react'
import HrTag from 'src/components/Hr/HrTag'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material';;
import Tippy from '@tippyjs/react';
import { MdArrowBackIos } from 'react-icons/md';

const organizationUser = [
    { property: "Name of the RO", value: "Gujarat RO" },
    { property: "Name of the DDM", value: "Vadodara" },
    { property: "Designation", value: "Manager" },
    { property: "Mobile", value: "9563345698" },
    { property: "Office Address", value: "A 407 mahal Society BH Complex templte,Vadodara,Gujarat" },
    { property: "State", value: "Gujarat" },
    { property: "District", value: "Vadodara" },
    { property: "Area Of Operation", value: "Vadodara,Anand,Ahmedabad" },
]
const Index = () => {
    const router = useRouter();
    function PageTitle() {
        return <div>
            <span className="text-xl font-semibold">
                Ranjeet Gautam
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
                                                        {tableFields(organizationUser)}
                                                    </div>
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