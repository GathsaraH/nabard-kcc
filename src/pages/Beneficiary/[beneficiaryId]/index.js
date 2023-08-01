import { useRouter } from 'next/router'
import React from 'react'
import BankAccountTable from 'src/pages/datatables/BankAccountTable'
import  {BsChevronDoubleLeft, BsChevronDoubleRight} from 'react-icons/bs'

const Index = () => {
  const router = useRouter()
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
                            <div className="col-start-10 col-end-13 flex justify-end items-center">
                              <BsChevronDoubleLeft/>
                              <BsChevronDoubleRight className='bg-primary p-3' />
                            </div>
                            <div className="col-start-1 col-end-13 flex justify-center items-center">
                              <span className="text-2xl text-bold">
                                Andrew Marcels
                              </span>
                            </div>
                          </div>

                          <div className="w-auto m-3">
                            <hr style={{ color: "#000000" }}></hr>
                          </div>
                          <div className="w-full">
                            <div className="mr-5 m-2 m-sm-10">

                              as
                              <div className="w-auto ">
                                <hr style={{ color: "#000000" }}></hr>
                              </div>
                              asd
                              <div className="tab-content tab-space">
                                asd
                              </div>
                            </div>
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