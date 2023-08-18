/* eslint-disable react/no-array-index-key */
import React from "react";
import Image from "next/image";
import kccImg from "src/assets/images/Landing-page/kccImg.png";
import MissImg from "src/assets/images/Landing-page/MissImg.png";
import PmKisanImg from "src/assets/images/Landing-page/PmKisanImg.png";

const sectionsData = [
  {
    title: "Kisan Credit Card (KCC)",
    desc: "Introduced by the Government of India (GoI) in 1998, the Kisan Credit Card (KCC) is a specialized credit product designed for farmers. It serves as a crucial avenue for farmers to secure affordable credit, catering to their diverse needs such as short-term cultivation, post-harvest expenses, and household consumption. Executed through commercial banks, cooperative banks, and rural regional banks, the KCC initiative strives to provide timely and sufficient credit assistance to farmers",
    image: kccImg,
  },
  // {
  //   title: "Modified Interest Subvention Scheme (MISS)",
  //   desc: "Our GharGhar KCC Abhiyan is an integral part of the Modified Interest Subvention Scheme (MISS), a fully funded central sector scheme by the GoI. This scheme extends KCC loans to farmers at a subsidized interest rate of 7%, with added incentives for prompt repayment, effectively bringing down the interest rate to 4%. This initiative serves as a shield for small and marginal farmers against distress scenarios, empowering them and propelling growth in the agricultural sector.",
  //   image: MissImg,

  // },
  {
    title: "Pradhan MantriKisanSammanNidhi (PM Kisan)",
    desc: "Aligned with the Pradhan MantriKisanSammanNidhi (PM KISAN) scheme, our GharGhar KCC Abhiyan reinforces the livelihoods of small and marginal farmers. Launched in December 2018, the PM-KISAN scheme offers direct financial support to farmers, enhancing crop health and securing their farming endeavors. Eligible landholding families receive annual payments of Rs. 6000 to bolster their agricultural activities.",
    image: PmKisanImg,

  },
];

const KisanCreditCardSection = () => {
  return (
    <div className="bg-white">
      <div className="lg:text-left mb-20">
        <div className="bg-white">
          {sectionsData.map((item, index) => {
            const isEven = index % 2 === 0;
            const flexAlignmentClass = isEven ? "lg:flex-row" : "lg:flex-row-reverse";
            const desktopClassName = `lg:flex lg:justify-between lg:items-center py-28 ${isEven ? 'lg:ml-10' : 'lg:mr-10'} ${flexAlignmentClass}`;
            const mobileClassName = `sm:flex sm:flex-col sm:justify-between py-28 sm:mx-0 mx-4`;

            return (
              <div key={index} className={`${desktopClassName} ${mobileClassName}`}>
                <div className="lg:w-2/5">
                  <h1 className="mt-0 mb-16 text-3xl font-bold tracking-tight md:text-6xl xl:text-2xl text-black">
                    {item.title}
                    <br />
                    <br />
                    <span className="text-2xl font-light tracking-tight md:text-6xl xl:text-lg text-black mt-5">
                      {item.desc}
                    </span>
                  </h1>
                </div>
                <div className="w-full lg:w-1/2">
                  <Image
                    height={400}
                    width={300}
                    src={item.image}
                    className="w-full"
                    alt=""
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KisanCreditCardSection;
