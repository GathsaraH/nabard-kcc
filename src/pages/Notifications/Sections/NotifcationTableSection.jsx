import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import PdfSvg from "src/assets/svg/PdfIcon.svg";
import { useIsVisible } from "src/hooks/ViewPort/useIsVisible";

const dataContent = [
  {
    id: 1,
    title: "Ekishan Credit document statement 2022-2023",
    detail: "Download(2.08 MB)",
  },
  {
    id: 2,
    title: "Ekishan Credit document statement 2022-2023",
    detail: "Download(2.08 MB)",
  },
  {
    id: 3,
    title: "Ekishan Credit document statement 2022-2023",
    detail: "Download(2.08 MB)",
  },
  {
    id: 4,
    title: "Ekishan Credit document statement 2022-2023",
    detail: "Download(2.08 MB)",
  },
  {
    id: 5,
    title: "Ekishan Credit document statement 2022-2023",
    detail: "Download(2.08 MB)",
  },
  {
    id: 6,
    title: "Ekishan Credit document statement 2022-2023",
    detail: "Download(2.08 MB)",
  },
];

const pdfUrl =
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const NotifcationTableSection = () => {
  const [isAnimated, setisAnimated] = useState(false);

  const ref = useRef();
  const isVisible = useIsVisible(ref);

  useEffect(() => {
    if (isVisible === true && isAnimated === false) {
      setisAnimated(isVisible);
    }
  }, [isVisible]);

  const openPdfInNewTab = (pdfUrl) => {
    // Open the PDF in a new tab
    window.open(pdfUrl, "_blank");
  };

  return (
    <>
      <section className="bg-white mb-40">
        <div className="px-6 text-center md:px-12 lg:text-left">
          <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <div className="flex justify-center py-10 ">
              <div ref={ref} className=" sm:w-full lg:w-5/6 ">
                <div className={`flex bg-[#D2ECFA] font-bold  ${ isAnimated && 'animate__animated animate__fadeInUp '}`}>
                  <div className={`sm:w-12 lg:w-32 p-2 `}>Sr. No</div>
                  <div className={`w-1/2 p-2 `}>Title of Content</div>
                  <div className={`w-1/2 p-2 `}>Detail</div>
                </div>
                {dataContent.map((item,index) => {
                  return (
                    <div
                      key={item.id}
                      className={`  hover:text-primary  flex border-t bg-gray-100 border-b-2 border-white ${ isAnimated && `animate__animated animate__fadeInUp animate__delay-${index}s`}`}
                    >
                      <div className=" sm:w-12 lg:w-32 p-2">{item.id}</div>
                      <div className=" w-1/2 p-2">{item.title}</div>
                      <div className="w-1/2 p-2 font-semibold text-primary">
                        {" "}
                        <button onClick={() => openPdfInNewTab(pdfUrl)}>
                          {" "}
                         <Image className="h-5 hover:shadow-lg" src={PdfSvg} alt="" />
                        </button>{" "}
                        {item.detail}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotifcationTableSection;
