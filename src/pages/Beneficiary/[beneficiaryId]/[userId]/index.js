import React, { useState } from 'react'
import HrTag from 'src/components/Hr/HrTag'
import { useRouter } from 'next/router'
import TableComponent from 'src/components/Table/PageTable/TableComponent'
import { Grid } from '@mui/material';
import SelectInput from 'src/components/Input/Select/SelectInput';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModalContainer from 'src/components/Modal/ModalContainer';

const beneficiaryDetailsHeading1 = ['Bank Name', 'Account No.', 'Account Opening Date', 'Branch Name', 'IFSC', 'Claim Period'];
const beneficiaryDetailsContent = ['BOB', '028281000145812', '23 Aug 2020', 'Baroda', 'BARB0OPROA', 'Sept 2023 Quarter'];

const beneficiaryDetailsHeading2 = ['Transaction Date', 'Value Date', 'Particulars', 'Debit', 'Credit', 'Outstanding'];
const beneficiaryDetailsContent2 = ['16 Aug 2023', '20 Aug 2023', 'By Transfer', '2,00,000', '3,00,000', '-1 ,00,000'];


const beneficiaryDetailsHeading3 = ['Scheme Type', 'Period', 'Claim Type', 'Claim Amount', 'Status', 'Date Of Status'];
const beneficiaryDetailsContent3 = ['AIF', 'Sept 2023 Quarter', 'Interest Subvention', '2,00,000', 'Claim Pending', '23 Aug 2023'];


const beneficiaryDetailsHeading4 = ['Effective Date', 'Rate Of Interest'];
const beneficiaryDetailsContent4 = ['23 Sept 2022', '9%',];

const modalDetailsDataHeading = ['Start Date','End Date','Value Dated Balance','Interest Subvention %','Interest Subvention Calculation',]
const modalDetailsDataContent = ['23 Aug 2023','22 Aug 2023','By Transfer','Credit','Customer Induced']





const loandDetailsData = [
  { property: "Application ID", value: "14505454" },
  { property: "Scheme Name", value: "AIF" },
  { property: "Loan Limit.", value: "2,00,00,000" },
  { property: "Convergence with other Scheme", value: "No" },
  { property: "Asset Classification", value: "Standards " },
  { property: "Date of NPA; if NPA", value: "Not Applicable" },
  { property: "Sanction Date", value: "23 Aug 2023 " },
  { property: "Installment Type", value: "Non-EMI" },
  { property: "Repayment Start Date", value: "26 Aug 2023" },
  { property: "Repayment Start Date", value: "26 Aug 2023" },
  { property: "First Disbursement Date", value: "26 Aug 2023" },
  { property: "Claim Type", value: "Interest Subvention" },
  { property: "Restructured/ Rephasement Date", value: "Not Applicable " },
]

const loanAccountOptions = [
  { value: '1', label: '025252100001452' },
  { value: '2', label: '025252100001453' },
  { value: '3', label: '025252100001454' },
]

const Index = () => {
  const router = useRouter()
  const [selectedAccountNo, setselectedAccountNo] = useState(loanAccountOptions[0].value)
  const [calculationModal, setcalculationModal] = useState(false)

  const handleAccountNoChange = (event) => {
    setselectedAccountNo(event.target.value);
  };

  const handleModalChange = (item) => {
    setcalculationModal(item);
  };




  function PageTitle() {
    return <div>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <span className="text-xl font-semibold">
            Loan A/C  :
          </span>
        </Grid>
        <Grid item xs={12} sm={3}>
          <SelectInput className="sm:ml-3 mt-3 sm:mt-0" onChange={handleAccountNoChange} options={loanAccountOptions} label="Account number" value={selectedAccountNo} />
        </Grid>
      </Grid>
    </div>
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
    return <>
      <Grid item xs={6} sm={3}>
        <div className={`p-2 bg-[#D2ECFA] text-center`}>
          {title}
        </div>
      </Grid>
      <Grid item xs={6} sm={3}>
        <div className={`p-2 bg-[#F6F4F4] text-center`}>
          {value}
        </div>
      </Grid>
    </>
  }

  function calculationModalContainer() {
    return <ModalContainer title="Interest Subvention Calculation Details" showModal={calculationModal} handleModal={handleModalChange} >
<TableComponent headings={modalDetailsDataHeading} contents={modalDetailsDataContent} colsLength={6} colSpan={2} />
    </ModalContainer>

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
                            {SubHeading("Account Details")}
                            <HrTag />
                            <TableComponent headings={beneficiaryDetailsHeading1} contents={beneficiaryDetailsContent} colsLength={6} colSpan={2} />

                          </div>
                          <div className="w-full py-5">
                            {SubHeading("Loan Details")}
                            <HrTag />
                            <Grid style={{ overflow: 'auto' }} container spacing={0.5}>
                              {
                                loandDetailsData.map((item) => {
                                  return <>
                                    {TwoColGrid(item.property, item.value)}
                                  </>
                                })
                              }
                            </Grid>
                          </div>
                          <div className="w-full py-5">
                            <Grid container columns={16}>
                              <Grid item xs={12} sm={12}>  {SubHeading("Transaction Details ")}  </Grid>
                              <Grid item xs={12} sm={4}><span onClick={() => handleModalChange(true)} className="text-primary font-bold"><RemoveRedEyeIcon className='mb-1 mr-2' />Show Claim Calculation</span> </Grid>
                            </Grid>
                            <HrTag />
                            <TableComponent headings={beneficiaryDetailsHeading2} contents={beneficiaryDetailsContent2} colsLength={6} colSpan={2} />
                          </div>
                          <div className="w-full py-5">
                            {SubHeading("Claim Details")}
                            <HrTag />
                            <TableComponent headings={beneficiaryDetailsHeading3} contents={beneficiaryDetailsContent3} colsLength={6} colSpan={2} />
                          </div>
                          <div className="w-full py-5">
                            {SubHeading("Interest Details")}
                            <HrTag />
                            <TableComponent headings={beneficiaryDetailsHeading4} Link onClick={routeToAccountDetails} contents={beneficiaryDetailsContent4} colsLength={6} colSpan={2} />
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
      {calculationModalContainer()}
    </div>
  )





}

export default Index