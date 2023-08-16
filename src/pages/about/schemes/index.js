import React from "react";
import BlankLayout from "src/layouts/BlankLayout";
import shapeUp from "src/assets/images/Shapes/shapeUp.png";
import shapeDown from "src/assets/images/Shapes/shapeDown.png";
import Image from "next/image";
import HeroSection from "src/pages/landing-page/Sections/HeroSection";
import IntroSection from "src/pages/landing-page/Sections/IntroSection";
import ServiceSection from "src/pages/landing-page/Sections/ServiceSection";
import FaqSection from "src/pages/landing-page/Sections/FaqSection";
import BannerSection from "src/pages/landing-page/Sections/BannerSection";
import SupportSection from "src/pages/landing-page/Sections/SupportSection";
import QuickLinkSection from "src/pages/landing-page/Sections/QuickLinkSection";
import { ColorConstants } from "src/constants/ColorConstants";
import NavbarLandingPage from "src/components/Navbar/NavbarLandingPage";

function showShapeUp() {
  return (
    <div className="absolute flex -mt-4 sm:-mt-16 md:-mt-16 lg:-mt-20 xl:-mt-28">
      <div className="text-center">
        <Image src={shapeUp} alt="" />
      </div>
    </div>
  );
}

function showShapeDown(color) {
  return (
    <div className="absolute flex -mt-0 sm:-mt-0 md:-mt-0 lg:-mt-0 xl:-mt-40">
      <div className="text-center">
        <Image style={{ backgroundColor: color ? color : "#EEF2F0" }} src={shapeDown} alt="" />
      </div>
    </div>
  );
}

const Index = () => {
  return (
    <>
    <NavbarLandingPage/>
      <HeroSection />
      {showShapeUp()}
      <IntroSection />
      {showShapeDown()}
      <ServiceSection />
      {showShapeUp()}
      <FaqSection />
      {showShapeDown()}
      <BannerSection/>
      {showShapeUp()}
      <SupportSection/>
      {showShapeDown(ColorConstants.primaryColor)}
      <QuickLinkSection/>
    </>
  );
};

Index.getLayout = (page) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export default Index;
