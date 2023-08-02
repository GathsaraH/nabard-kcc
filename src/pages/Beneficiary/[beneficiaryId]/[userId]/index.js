import React from 'react'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
import IconButton from 'src/components/Button/IconButtonComponent'
import TableRow from 'src/components/Table/PageTable/TableRow'
import TableHeadings from 'src/components/Table/PageTable/TableHeadings'
import HrTag from 'src/components/Hr/HrTag'
import { useRouter } from 'next/router'
import DynamicGrid from 'src/components/Grid/DynamicGrid'


const beneficiaryDetailsHeading1 = ['Bank Name', 'Account No.', 'Account Opening Date', 'Branch Name', 'IFSC', 'Claim Period'];
const beneficiaryDetailsContent = ['BOB', '028281000145812', '23 Aug 2020', 'Baroda', 'BARB0OPROA', 'Sept 2023 Quarter'];

const beneficiaryDetailsHeading2 = ['Transaction Date', 'Value Date', 'Particulars', 'Debit', 'Credit', 'Outstanding'];
const beneficiaryDetailsContent2 = ['16 Aug 2023', '20 Aug 2023', 'By Transfer', '2,00,000', '3,00,000', '-1 ,00,000'];


const beneficiaryDetailsHeading3 = ['Scheme Type', 'Period', 'Claim Type', 'Claim Amount', 'Status', 'Date Of Status'];
const beneficiaryDetailsContent3 = ['AIF', 'Sept 2023 Quarter', 'Interest Subvention', '2,00,000', 'Claim Pending', '23 Aug 2023'];


const beneficiaryDetailsHeading4 = ['Effective Date', 'Rate Of Interest'];
const beneficiaryDetailsContent4 = ['23 Sept 2022', '9%',];

const loandDetailsData = [
  { property: "Application ID", value: "14505454" },
  { property: "Scheme Name", value: "AIF" },
  { property: "Loan Limit.", value: "2,00,00,000" },
  { property: "Convergence with other Scheme", value: "No" },
  { property: "Asset Classification", value: "Standards " },
  { property: "Date of NPA; if NPA", value: "Not Applicable" },
  { property: "Sanction Date", value: "23 Aug 2023 "},
  { property: "Installment Type", value: "Non-EMI"},
  { property: "Repayment Start Date", value: "26 Aug 2023"},
  { property: "Repayment Start Date", value: "26 Aug 2023"},
  { property: "First Disbursement Date", value: "26 Aug 2023"},
  { property: "Claim Type", value: "Interest Subvention"},
  { property: "Restructured/ Rephasement Date", value: "Not Applicable "},
]

const Index = () => {
  const router = useRouter()

  function PageTitle() {
    return <span className="text-2xl font-semibold">
      Loan A/c No : 025252100001452
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

  function TwoColGrid(title, value) {
    return <div className={`col-span-${2} text-center`}>
      <div className={`grid lg:grid-cols-${4} text-black font-semibold text-xl text-left`}>
        <div className={`col-span-${2} p-2 bg-[#D2ECFA] text-center`}>
          {title}
        </div>
        <div className={`col-span-${2} p-2 bg-[#F6F4F4] text-center`}>
          {value}
        </div>
      </div>
    </div>
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
                            <div className="col-start-1 col-end-13 flex justify-center items-center">
                              {PageTitle()}
                            </div>
                          </div>
                          <HrTag />
                          <div className="w-full">
                            {SubHeading("Account Details")}
                            <HrTag />
                            <TableHeadings headings={beneficiaryDetailsHeading1} colsLength={12} colSpan={2} />
                            <TableRow headings={beneficiaryDetailsContent} colsLength={12} colSpan={2} />
                          </div>
                          <div className="w-full py-5">
                            {SubHeading("Loan Details")}
                            <HrTag />
                            <div className={`grid lg:grid-cols-${4} text-black gap-1 font-semibold text-xl text-left`}>
                              {
                                loandDetailsData.map((item) => {
                                  return <>
                                    {TwoColGrid(item.property, item.value)}
                                  </>
                                })
                              }
                            </div>
                          </div>
                          <div className="w-full py-5">
                            {SubHeading("Transaction Details ")}
                            <HrTag />
                            <TableHeadings headings={beneficiaryDetailsHeading2} colsLength={12} colSpan={2} />
                            <TableRow headings={beneficiaryDetailsContent2} colsLength={12} colSpan={2} />
                          </div>
                          <div className="w-full py-5">
                            {SubHeading("Claim Details")}
                            <HrTag />
                            <TableHeadings headings={beneficiaryDetailsHeading3} colsLength={12} colSpan={2} />
                            <TableRow headings={beneficiaryDetailsContent3} colsLength={12} colSpan={2} />
                          </div>
                          <div className="w-full py-5">
                            {SubHeading("Interest Details")}
                            <HrTag />
                            <TableHeadings headings={beneficiaryDetailsHeading4} colsLength={4} colSpan={2} />
                            <TableRow onClick={routeToAccountDetails} Link headings={beneficiaryDetailsContent4} colsLength={4} colSpan={2} />
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