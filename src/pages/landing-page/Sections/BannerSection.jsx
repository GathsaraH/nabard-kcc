import Image from 'next/image';
import React from 'react';
import leftVector from 'src/assets/svg/LeftLeaf.svg';
import RightVector from 'src/assets/svg/RightLeaf.svg';
import DefaultButtonComponent from 'src/components/Button/DefaultButtonComponent';



const BannerSection = () => {
    return (
        <div className="bg-[#EEF2F0] flex">
            <Image src={leftVector} alt="leftVector" className="hidden lg:block" />
            <div className="px-6 md:px-12 lg:text-left mb-20">
                <div className="w-full mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                    <div className="grid items-center gap-12 lg:grid-cols-1">
                        <div className="text-center mt-12">
                            <h1 className="mt-0 mb-16 text-3xl font-bold tracking-tight md:text-6xl xl:text-2xl text-black">
                                Ready to Transform Lives? Get Involved Today!
                            </h1>
                            <span className="mt-0 mb-16 text-3xl tracking-tight md:text-6xl xl:text-base text-black">
                                Step into a world of empowerment for farmers across the nation through the GharGhar KCC Abhiyan. Our mission is simple yet impactful: to ensure that every household gains access to credit through the Kisan Credit Card (KCC), revolutionizing the financial landscape for farmers.
                            </span>
                            <div className='flex justify-center py-12' >
                                <DefaultButtonComponent className={'w-1/5'} roundedOff title="Login" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Image src={RightVector} alt="leftVector" className="hidden lg:block" />
        </div>
    );
};

export default BannerSection;
