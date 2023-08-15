import React from 'react'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
import IconButton from 'src/components/Button/IconButtonComponent'
import TableRow from 'src/components/Table/PageTable/TableRow'
import TableHeadings from 'src/components/Table/PageTable/TableHeadings'
import HrTag from 'src/components/Hr/HrTag'
import { useRouter } from 'next/router'
import TableComponent from 'src/components/Table/PageTable/TableComponent'


const beneficiaryDetailsHeading1 = ['Beneficiary ID', 'Beneficiary Type', 'Beneficiary Name', 'Scheme'];
const beneficiaryDetailsContent = ['155404', 'Individual', 'Andrew Marcel', 'AIF'];

const beneficiaryDetailsHeading2 = ['Legal Entity Type', 'Registered ID/ No.', 'Date of Registration/ Incorporation'];
const beneficiaryDetailsContent2 = ['Company', 'E4545878 870000S', '20 FEB 2020'];


const beneficiaryDetailsHeading3 = ['Identity No', 'Social Category', 'Gender'];
const beneficiaryDetailsContent3 = ['EDOP4587W', 'SEBC', 'MALE'];


const beneficiaryDetailsHeading4 = ['Loan A/c No.', 'Application ID', 'Branch IFSC', 'Loan Limit', 'A/C Op.Date'];
const beneficiaryDetailsContent4 = ['025252100001452', '14540454', 'BARB0OPROA', '2,00,00,000', '23 Aug 2020'];



const Index = () => {
  const router = useRouter()

  function PageTitle() {
    return <span className="text-2xl text-bold">
      Andrew Marcels
    </span>
  }

  function SubHeading(item) {
    return <div className="mr-5 m-2 m-sm-10 text-primary font-bold">
      {item}
    </div>
  }

  const routeToAccountDetails = () => {
    router.push(`/Beneficiary/${router.query.beneficiaryId}/4`)

  }



  return (
    <div>
      {/* <BankAccountTable userId={router.query.beneficiaryId} /> */}
      <div className="flex-1 flex flex-col lg:overflow-hidden">
        <div className="flex h-full">
          <main className="w-full bg-gray-100 h-full overflow-x-hidden overflow-y-auto mb-14">
            <div className="w-full mx-auto mt-5">
              <div className="flex flex-col w-full h-full text-gray-900 text-xl ">
                <div className="px-2 md:px-5">
                  <div>
                    <div className="flex w-full">
                      <div className="w-full block rounded-lg shadow-lg bg-white">
                        <div className="text-left p-2">
                          <div className="grid grid-cols-12 m-1">
                            <div className="col-start-1 col-end-13 flex justify-center items-center">
                              {PageTitle()}
                            </div>
                          </div>
                          <HrTag />
                          <div className="w-full">
                            {SubHeading("Beneficiary Details")}
                            <HrTag />
                            <TableComponent headings={beneficiaryDetailsHeading1} contents={beneficiaryDetailsContent} colsLength={4} colSpan={2} />
                          </div>
                          <div className="w-full py-5">
                            {SubHeading("If Group/Company")}
                            <HrTag />
                            <TableComponent headings={beneficiaryDetailsHeading2} contents={beneficiaryDetailsContent2} colsLength={3} colSpan={2} />
                          </div>
                          <div className="w-full py-5">
                            {SubHeading("If Individual")}
                            <HrTag />
                            <TableComponent headings={beneficiaryDetailsHeading3} contents={beneficiaryDetailsContent3} colsLength={3} colSpan={2} />
                          </div>
                          <div className="w-full py-5">
                            {SubHeading("Address")}
                            <HrTag />
                            <span className='px-2' >Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</span>
                          </div>
                          <div className="w-full py-5">
                            {SubHeading("Bank Account Details")}
                            <HrTag />
                            <TableComponent headings={beneficiaryDetailsHeading4} contents={beneficiaryDetailsContent4} colsLength={6} colSpan={2} Link={true} onClick={routeToAccountDetails} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-10 mt-6">
                <div className="col-start-9 col-end-10 gap-2"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )





}

export default Index