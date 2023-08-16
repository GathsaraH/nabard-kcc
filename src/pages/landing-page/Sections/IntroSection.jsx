import Image from 'next/image'
import React from 'react'
import ImgOne from 'src/assets/images/ImgTwo.png'

const IntroSection = () => (
  <div>
    <section className="bg-white mb-40">
      <div className="px-6 text-center md:px-12 lg:text-left">
        <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="lg:mb-0">
              <Image
                height={300}
                width={300}
                src={ImgOne}
                className="w-full"
                alt="" />
            </div>
            <div className="mt-12 lg:mt-0">
              <h1 className="mt-0 mb-16 text-3xl font-bold tracking-tight md:text-6xl xl:text-2xl text-black">
                {/* The best offer <br /><span className="text-black">for your business</span> */}
                GharGhar KCC Abhiyan
                <br />
                <br />
                <span className="text-2xl font-light tracking-tight md:text-6xl xl:text-lg text-black mt-5">
                  The journey of farmers to secure credit has been marked by complexities and lack of awareness. Enter the &quot;GharGhar KCC Abhiyan,&quot; a transformative movement aimed at eradicating these barriers. Our mission: every eligible farmer should hold a Kisan Credit Card.
                </span>
                <br />
                <br />
                <span className="text-2xl font-light tracking-tight md:text-6xl xl:text-lg text-black mt-5">
                  By enrolling all remaining farmers into the formal credit ecosystem, we are fortifying the backbone of our nation&apos;s economy.
                </span>
                <br />
                <br />
                <span className="text-2xl font-light tracking-tight md:text-6xl xl:text-lg text-black mt-5">
                  This collaborative initiative unites government agencies and financial institutions to identify eligible farmers, facilitate KCC issuance, and provide unwavering support.
                </span>
              </h1>
            </div>

          </div>
        </div>
      </div>
    </section>

  </div>
)

export default IntroSection