import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ImgOne from "src/assets/images/supportImg.png";
import EmailGreenIcon from "src/assets/svg/EmailGreenIcon.svg";
import PhoneGreenIcon from "src/assets/svg/PhoneGreenIcon.svg";
import RightLeaf from "src/assets/svg/LeafSupportIcon.svg";
import { useIsVisible } from "src/hooks/ViewPort/useIsVisible";

const SupportSection = () => {
    const [isAnimated, setisAnimated] = useState(false)

    const ref = useRef();
    const isVisible = useIsVisible(ref);

    useEffect(() => {
        if (isVisible === true && isAnimated === false) {
        setisAnimated(isVisible)
        }
    }, [isVisible])

    return (
        <div ref={ref} className="bg-white ">
            <br />
            <br />
            <h1 className={`text-3xl font-bold tracking-tight md:text-6xl xl:text-2xl text-black text-center ${isAnimated && 'animate__animated animate__fadeInDown animate__delay-0.5s'}`}>
                Technical Support
            </h1>
            <div className="bg-white flex">
                <div className="lg:text-left mb-20">
                    <div className="w-full mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl px-5">
                        <div className="grid items-center gap-12 lg:grid-cols-1">
                            <div className="text-center mt-4">
                                <div className="grid items-center gap-12 lg:grid-cols-2 ">
                                    <div className={`lg:mb-0 ${isAnimated && 'animate__animated animate__fadeInLeft animate__delay-1.5s'}`}>
                                        <Image
                                            height={400}
                                            width={400}
                                            src={ImgOne}
                                            className="w-full "
                                            alt=""
                                        />
                                    </div>
                                    <div className={`mt-12 lg:mt-0 ${ isAnimated && 'animate__animated animate__fadeInUp animate__delay-1s'}`}>
                                        <br />
                                        <br />
                                        <span className={`text-2xl font-light tracking-tight md:text-6xl xl:text-lg text-black mt-5 ${isAnimated && 'animate__animated animate__fadeInDown animate__delay-1.5s'}`}>
                                            For any technical assistance or inquiries, please reach
                                            out to our dedicated IT support team
                                        </span>
                                        <br />
                                        <br />
                                        <div className="flex gap-6">
                                            <Image src={EmailGreenIcon} alt="" />
                                            <span className={`text-2xl font-light tracking-tight md:text-6xl xl:text-lg text-black mt-2 ${ isAnimated && 'animate__animated animate__fadeInRight animate__delay-1.9s' }`}>
                                                admin@ekishancredit.com
                                            </span>
                                        </div>

                                        <br />
                                        <br />
                                        <div className="flex gap-6">
                                            <Image src={PhoneGreenIcon} alt="" />
                                            <span className={`text-2xl font-light tracking-tight md:text-6xl xl:text-lg text-black mt-2 ${ isAnimated && 'animate__animated animate__fadeInRight animate__delay-1.9s'}`}>
                                                91 919300 9500
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Image src={RightLeaf} alt="leftVector" className={`hidden lg:block ${ isAnimated && 'animate__animated animate__fadeInRight animate__delay-2s'}`} />
            </div>

        </div>
    );
};

export default SupportSection;
