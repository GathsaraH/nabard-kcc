import Image from 'next/image'
import React from 'react'
import ImgOne from "src/assets/images/supportImg.png";

const KisanCreditCardSection = () => {
  return (
    <div className='bg-white py-12'>
      <div className="flex">
        <div className="lg:text-left mb-20">
          <div className="w-full mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-1">
              <div className="text-center mt-4">
                <div className="grid items-center gap-12 lg:grid-cols-2 ">
                  <div className="lg:mb-0">
                    <Image
                      height={400}
                      width={400}
                      src={ImgOne}
                      className="w-full"
                      alt="" />
                  </div>
                  <div className="mt-12 lg:mt-0">
                    <h1 className="mt-0 mb-16 text-3xl font-bold tracking-tight md:text-6xl xl:text-2xl text-black">
                      Welcome to the GharGhar KCC Abhiyan (GGKA)
                      <br />
                      <span className="text-2xl font-semibold tracking-tight md:text-6xl xl:text-lg text-black">
                        GharGhar KCC Abhiyan - Empowering Farmers, Enriching Lives
                      </span>
                      <br />
                      <br />
                      <span className="text-2xl font-light tracking-tight md:text-6xl xl:text-lg text-black mt-5">
                        Step into a world of empowerment for farmers across the
                        nation through the GharGhar KCC Abhiyan. Our mission is
                        simple yet impactful: to ensure that every household gains
                        access to credit through the Kisan Credit Card (KCC),
                        revolutionizing the financial landscape for farmers.
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KisanCreditCardSection