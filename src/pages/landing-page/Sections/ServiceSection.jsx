import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { SecureAccess } from 'src/assets/misc/SvgContext';
import leftVector from 'src/assets/svg/LeftVector.svg';
import RightVector from 'src/assets/svg/RightVector.svg';
import { useIsVisible } from 'src/hooks/ViewPort/useIsVisible';

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

const [isAnimated, setisAnimated] = useState(false)

  const ref = useRef();
  const isVisible = useIsVisible(ref);

useEffect(() => {
  if (isVisible === true && isAnimated === false) {
    setisAnimated(isVisible)
  }
}, [isVisible])

    return (
        <div ref={ref} className="bg-[#EEF2F0] flex">
            <Image src={leftVector} alt="leftVector" className={`hidden lg:block ${ isAnimated && 'animate__animated animate__fadeInLeft animate__delay-1s'}`} />

            <div className="px-6 md:px-12 lg:text-left mb-20">
                <div className="w-full mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                    <div className="grid items-center gap-12 lg:grid-cols-1">
                    <div className="text-center mt-12">
                            <h1 className={`mt-0 mb-16 text-3xl font-bold tracking-tight md:text-6xl xl:text-2xl text-black ${ isAnimated && 'animate__animated animate__fadeInDown animate__delay-0.8s'}`}>
                                GharGhar KCC Abhiyan Portal Features and Benefits
                            </h1>

                                <br />
                                <br />
                                <div className={`grid gap-x-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 ml-0 sm:ml-10 ${ isAnimated && 'animate__animated animate__fadeInDown animate__delay-1.5s'}`}>
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
                                <div className={`mt-16 ml-2 grid gap-x-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-x-6 ml-0 sm:ml-10 ${ isAnimated && 'animate__animated animate__fadeInUp animate__delay-2s'}`}>
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

                        </div>
                    </div>
                </div>
            </div>
             <Image src={RightVector} alt="leftVector" className={`hidden lg:block ${ isAnimated && 'animate__animated animate__fadeInRight animate__delay-1s'}`} />
          
        </div>
    );
};

export default ServiceSection;
