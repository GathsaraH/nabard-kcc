import React from "react";
import HeroSection from "./Sections/HeroSection";
import IntroSection from "./Sections/IntroSection";
import shapeUp from "src/assets/images/Shapes/shapeUp.png";
import shapeDown from "src/assets/images/Shapes/shapeDown.png";
import Image from "next/image";
import ServiceSection from "./Sections/ServiceSection";
import FaqSection from "./Sections/FaqSection";
import BannerSection from "./Sections/BannerSection";
import SupportSection from "./Sections/SupportSection";
import QuickLinkSection from "./Sections/QuickLinkSection";
import { ColorConstants } from "src/constants/ColorConstants";
import LandingPageLayout from "src/layouts/LandingPageLayout";

export function showShapeUp() {
  return (
    <div className="absolute flex -mt-6 sm:-mt-16 md:-mt-16 lg:-mt-20 xl:-mt-28 animate__animated animate__slideInDown">
      <div className="text-center">
        <Image src={shapeUp} alt="" />
      </div>
    </div>
  );
}

export function showShapeDown(color) {
  return (
    <div className="absolute flex -mt-0 sm:-mt-0 md:-mt-0 lg:-mt-0 xl:-mt-40">
      <div className="text-center">
        <Image
          style={{ backgroundColor: color ? color : "#EEF2F0" }}
          src={shapeDown}
          alt=""
        />
      </div>
    </div>
  );
}

const Index = () => {
  return (
    <>
      <HeroSection />
      {showShapeUp()}
      <IntroSection />
      {showShapeDown()}
      <ServiceSection />
      {showShapeUp()}
      <FaqSection />
      {showShapeDown()}
      <BannerSection />
      {showShapeUp()}
      <SupportSection />
      {showShapeDown(ColorConstants.primaryColor)}
      <QuickLinkSection />
    </>
  );
};

Index.getLayout = (page) => {
  return <LandingPageLayout>{page}</LandingPageLayout>;
};

export default Index;
