import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import leftVector from 'src/assets/svg/LeftLeaf.svg';
import RightVector from 'src/assets/svg/RightLeaf.svg';
import { useIsVisible } from 'src/hooks/ViewPort/useIsVisible';


const NotificationsSection = () => {
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
            <Image className={`h-16 mt-10 md:h-auto ${
          isAnimated &&
          "animate__animated animate__fadeInLeft animate__delay-2s"
        }`} src={leftVector} alt="leftVector" />
            <div className="px-6 md:px-12 lg:text-left mb-32">
                <div className="w-full mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                    <div className="grid items-center gap-12 lg:grid-cols-1">
                        <div className="text-center mt-12">
                            <h1 className={`mt-0 mb-16 text-2xl font-bold tracking-tight md:text-6xl xl:text-2xl text-primary ${
                  isAnimated && "animate__animated animate__fadeInDown"
                }`}>
                            Notification
                            </h1>
                            <span className={`mt-0 mb-16 text-3xl tracking-tight text-xl sm:text-lg md:text-6xl xl:text-base text-black ${
                  isAnimated &&
                  "animate__animated animate__fadeInUp animate__delay-1s"
                }`}>
                            Step into a world of empowerment for farmers across the nation through the GharGhar KCC Abhiyan. Our mission is simple yet impactful: to ensure that every household gains access to credit through the Kisan Credit Card (KCC), revolutionizing the financial landscape for farmers.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Image className={`h-16 mt-6 md:mt-0 md:mb-10 md:h-auto ${
          isAnimated &&
          "animate__animated animate__fadeInRight animate__delay-2s"
        }`} src={RightVector} alt="leftVector" />
        </div>
    );
};

export default NotificationsSection;
