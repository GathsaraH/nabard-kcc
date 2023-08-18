import Image from 'next/image';
import React from 'react';
import { SecureAccess } from 'src/assets/misc/SvgContext';
import leftVector from 'src/assets/svg/LeftVector.svg';
import RightVector from 'src/assets/svg/RightVector.svg';

const features = [
    {
        icon: SecureAccess(),
        title: 'Secure Access',
        description: 'Enter data securely from anywhere within our protected digital domain',
    },
    {
        icon: SecureAccess(),
        title: 'Effortless Updates',
        description: 'Seamlessly manage your profile, roles, and responsibilities',
    },
    {
        icon: SecureAccess(),
        title: 'User-friendly Interface',
        description: 'Navigate through an intuitive interface tailored for your convenience',
    },

];

const featuresTwo = [
    {
        icon: SecureAccess(),
        title: 'Data Accuracy',
        description: 'Maintain up-to-date and precise information, contributing to smooth operations across the organization',
    },
    {
        icon: SecureAccess(),
        title: 'Progress Tracking',
        description: 'Monitor the progress of the GharGhar KCC Abhiyan. \nStay updated with real-time data and success stories that highlight how our initiative is making a tangible difference in the lives of farmers across the nation',
    },

];

const ServiceSection = () => {
    return (
        <div className="bg-[#EEF2F0] flex">
            <Image src={leftVector} alt="leftVector" className="hidden lg:block" />
            <div className="px-6 md:px-12 lg:text-left mb-20">
                <div className="w-full mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                    <div className="grid items-center gap-12 lg:grid-cols-1">
                        <div className="text-center mt-12">
                            <h1 className="mt-0 mb-16 text-3xl font-bold tracking-tight md:text-6xl xl:text-2xl text-black">
                                GharGhar KCC Abhiyan Portal Features and Benefits
                                <br />
                                <br />
                                <div className="grid gap-x-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 ml-0 sm:ml-10">
                                    {features.map((feature, index) => (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <div key={index} className="mb-12 lg:mb-0">
                                            <div className="bg-white mb-2 inline-block rounded-full border p-5 text-primary shadow-sm">
                                                {feature.icon}
                                            </div>
                                            <h5 className="mb-4 text-2xl sm:text-xl font-bold text-primary ">{feature.title}</h5>
                                            <p className="text-black font-light text-xl  sm:text-base">{feature.description}</p>
                                        </div>
                                    ))}

                                </div>
                                <div className="mt-16 ml-2 grid gap-x-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-x-6 ml-0 sm:ml-10">
                                    {featuresTwo.map((feature, index) => (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <div key={index} className="mb-12 lg:mb-0">
                                            <div className="bg-white mb-2 inline-block rounded-full border p-5 text-primary shadow-sm">
                                                {feature.icon}
                                            </div>
                                            <h5 className="mb-4 text-lg font-bold text-primary">{feature.title}</h5>
                                            <p className="text-xl sm:text-base text-black font-light">{feature.description}</p>
                                        </div>
                                    ))}

                                </div>

                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <Image src={RightVector} alt="leftVector" className="hidden lg:block" />
        </div>
    );
};

export default ServiceSection;
