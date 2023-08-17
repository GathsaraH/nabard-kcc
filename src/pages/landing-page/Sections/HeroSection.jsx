import Image from "next/image";
import React from "react";
import VectorSvg from "src/assets/svg/VectorSvg";
import DefaultButtonComponent from "src/components/Button/DefaultButtonComponent";
import ImgOne from "../../../assets/images/firstImg.png";

const HeroSection = () => {
    return (
        <div>
            {" "}
            {/* <div className="bg-[#EEF2F0] flex"> */}
            <div className="bg-[#EEF2F0] flex">
                <VectorSvg />
                <div className="px-6  text-center md:px-12 lg:text-left">
                    <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            <div className="mt-12 lg:mt-0">
                                <h1 className="mt-0 mb-16 text-3xl font-bold tracking-tight md:text-6xl xl:text-2xl text-black">
                                    {/* The best offer <br /><span className="text-black">for your business</span> */}
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
                                <DefaultButtonComponent roundedOff title="Login" />
                            </div>
                            <div className="ImgOneContainer">
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
            </div>

           
        </div>
    );
};

export default HeroSection;
