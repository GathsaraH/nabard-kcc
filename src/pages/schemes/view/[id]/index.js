import React from 'react'
import HrTag from 'src/components/Hr/HrTag'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material';
import PdfSvg from 'src/assets/svg/pdfSvg';






const loandDetailsData = [
    { property: "Scheme Type", value: "Center" },
    { property: "Short Description", value: "We at dummy use ADDA for all our internal communications." },
    { property: "Scheme Code", value: "4555" },
    { property: "Scheme Effective Start Date", value: "10 Jul 2023" },
    { property: "Name of the Scheme", value: "Agriculture Infrastructure Fund" },
]
const projectDetailsData = [
    { property: "Maximum Loan Amount/Project", value: "2,00,00,0000.00" },
    { property: "Collateral Required", value: "We at dummy use ADDA for all our internal communications." },
    { property: "Maximum No. of Project", value: "25" },
    { property: "CGTMSE Cover", value: "10 Jul 2023" },
    { property: "Maximum no. of LGD location", value: "25" },
    { property: "Coverage upto amount", value: "15 Jul 2023" },
]
const benefitsUnderSchemeData = [
    { property: "Type of Benefits", value: "Interest Subvention" },
    { property: "Maximum Cap Amount of Benefits;if any", value: "5,00,000.00" },
    { property: "Maximum ROI%", value: "9%" },
    { property: "Maximum Loan Tenure; including Morotorium ( in months)", value: "84 Months" },
]

const Index = () => {
  const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';


    const openPdfInNewTab = (pdfUrl) => {
    // Open the PDF in a new tab
    window.open(pdfUrl, '_blank');
  };


    function PageTitle() {
        return <div>
            <span className="text-xl font-semibold">
                View Scheme
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
            <Grid px={3} columns={12} container>
                {data.map((item) => {
                    return (
                        <>
                            <Grid item xs={12} sm={2}>
                                <span className='font-bold text-lg'>{item.property}</span>
                            </Grid>
                            <Grid item xs={12} sm={1} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                :
                            </Grid>
                            <Grid item xs={12} sm={3}>
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
                                                        <div className="col-start-1 col-end-13 flex justify-center items-center mb-10">
                                                            {PageTitle()}
                                                        </div>
                                                    </div>
                                                    <HrTag />
                                                    <div className="w-full">
                                                        {SubHeading("View New Scheme")}
                                                        <HrTag />
                                                        {tableFields(loandDetailsData)}
                                                    </div>
                                                    <div className="w-full mt-20">
                                                        {SubHeading("Project Detail")}
                                                        <HrTag />
                                                        {tableFields(projectDetailsData)}
                                                    </div>
                                                    <div className="w-full mt-20">
                                                        {SubHeading("Benefits under the scheme")}
                                                        <HrTag />
                                                        {tableFields(benefitsUnderSchemeData)}
                                                    </div>
                                                    <div className="w-full mt-20">
                                                        {SubHeading("Comments")}
                                                        <HrTag />
                                                        <span className="mr-5 m-2 m-sm-10  text-lg font-semibold">
                                                        We at dummy use ADDA for all our internal communications.  
                                                        </span>
                                                    </div>
                                                    <div className="w-full mt-20">
                                                        {SubHeading("Notification Uploaded File")}
                                                        <HrTag />
                                                      <div className='flex flex-start' >
                                                         <div className='mt-2' >
                                                        <button onClick={() => openPdfInNewTab(pdfUrl)}> <PdfSvg/></button>
                                                         </div>
                                                        <span className="mr-5 m-2 m-sm-10  text-lg font-semibold">
                                                        AIF Notification.pdf 
                                                        </span>
                                                      </div>
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