import React, { useEffect, useRef, useState } from 'react'
import NavbarLandingPage from 'src/components/Navbar/NavbarLandingPage';
import BlankLayout from 'src/layouts/BlankLayout';
import DocumentsSection from './Sections/DocumentsSection';
import Image from 'next/image';
import shapeUp from "src/assets/images/Shapes/shapeUp.png";
import shapeDown from "src/assets/images/Shapes/shapeDown.png";
import { ColorConstants } from 'src/constants/ColorConstants';
import QuickLinkSection from '../landing-page/Sections/QuickLinkSection';
import DocumentsTableSection from './Sections/DocumentsTableSection';
import { useIsVisible } from 'src/hooks/ViewPort/useIsVisible';





const Index = () => {

    const [isAnimated, setisAnimated] = useState(false)
    const [isAnimated2, setisAnimated2] = useState(false)
  
    const ref = useRef();
    const ref2ss = useRef();
    const isVisible = useIsVisible(ref);
    const isVisible2 = useIsVisible(ref2ss);
  
  useEffect(() => {
    if (isVisible === true && isAnimated === false) {
      setisAnimated(isVisible)
    }
    if (isVisible2 === true && isAnimated2 === false) {
      setisAnimated2(isVisible2)
    }
  }, [isVisible,isVisible2])

  
  function showShapeUp() {
    return (
      <div ref={ref} className={`absolute flex -mt-10 sm:-mt-16 md:-mt-16 lg:-mt-20 xl:-mt-28 ${ isAnimated && 'animate__animated animate__fadeInDown animate__delay-1s'}`}>
        <div className="text-center">
          <Image src={shapeUp} alt="" />
        </div>
      </div>
    );
  }
  
  function showShapeDown(color) {
    return (
      <div ref={ref2ss} className={`absolute flex -mt-0 sm:-mt-0 md:-mt-0 lg:-mt-0 xl:-mt-40 ${ isAnimated2 && 'animate__animated animate__fadeInUp animate__delay-1s'}`}>
        <div className="text-center">
          <Image style={{ backgroundColor: color ? color : "#EEF2F0" }} src={shapeDown} alt="" />
        </div>
      </div>
    );
  }


    return (
        <>
            <NavbarLandingPage />
            <DocumentsSection />
            {showShapeUp()}
            <DocumentsTableSection />
            {showShapeDown(ColorConstants.primaryColor)}
            <QuickLinkSection />

        </>
    )
}


Index.getLayout = (page) => {
    return <BlankLayout>{page}</BlankLayout>;
};


export default Index