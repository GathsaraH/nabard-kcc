import Image from "next/image";
import React, { useState } from "react";
import ImgOne from "src/assets/images/ImgThree.png";
import DefaultButtonComponent from "src/components/Button/DefaultButtonComponent";
import { ColorConstants } from "src/constants/ColorConstants";

const FaqSection = () => {
  const faqItems = [
    {
      question: "Home Improvement Works are Expensive?",
      answer:
        "Maintain up-to-date and precise information, contributing to smooth operations across the organization Maintain up-to-date and precise information, contributing to smooth operations across the Download ",
    },
    {
      question: "Home Improvement Works are Expensive?",
      answer:
        "Maintain up-to-date and precise information, contributing to smooth operations across the organization Maintain up-to-date and precise information, contributing to smooth operations across the Download ",
    },
    {
      question: "Home Improvement Works are Expensive?",
      answer:
        "Maintain up-to-date and precise information, contributing to smooth operations across the organization Maintain up-to-date and precise information, contributing to smooth operations across the Download ",
    },
    {
      question: "Home Improvement Works are Expensive?",
      answer:
        "Maintain up-to-date and precise information, contributing to smooth operations across the organization Maintain up-to-date and precise information, contributing to smooth operations across the Download ",
    },
    // Add more FAQ items as needed
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-white mb-40">
      <div className="px-6 text-center md:px-12 lg:text-left">
        <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-6xl xl:text-2xl text-black text-center mt-8">
            Technical Support
          </h1>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="mt-12 lg:mt-0">
              {faqItems.map((item, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={`max-w-screen-xl mx-auto px-5 bg-white min-h-sceen  shadow-md ${
                    openIndex === index &&
                    "border-l-4 rounded-l-md border-primary"
                  }`}
                >
                  <div
                    className={` grid divide-y divide-neutral-200 max-w-xl mx-auto ${
                      index === 0 ? "mt-8" : "mt-2"
                    }`}
                  >
                    <div className="py-5">
                      <details className="group">
                        <summary
                          className="flex justify-between items-center font-medium cursor-pointer list-none"
                          onClick={() =>
                            setOpenIndex(openIndex === index ? null : index)
                          }
                        >
                          <span
                            className={`font-bold ${
                              openIndex === index && "text-primary "
                            }`}
                          >
                            {item.question}
                          </span>
                          <span
                            className={`transition ${
                              openIndex === index ? "group-open:rotate-180" : ""
                            }`}
                          >
                            <svg
                              fill="none"
                              height="24"
                              shape-rendering="geometricPrecision"
                              stroke={ColorConstants.primaryColor}
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <path d="M6 9l6 6 6-6"></path>
                            </svg>
                          </span>
                        </summary>
                        <p
                          className={`text-neutral-600 mt-3 ${
                            openIndex === index
                              ? "group-open:animate-fadeIn"
                              : ""
                          }`}
                        >
                          {item.answer}
                        </p>
                      </details>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-10">
                <DefaultButtonComponent roundedOff title="View more" />
              </div>
            </div>

            <div className="lg:mb-0">
              <Image
                height={300}
                width={300}
                src={ImgOne}
                className="w-full"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
