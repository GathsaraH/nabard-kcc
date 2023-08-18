import React from 'react'
import Image from 'next/image';
import shapeUp from "src/assets/images/Shapes/shapeUp.png";
import shapeDown from "src/assets/images/Shapes/shapeDown.png";
import { ColorConstants } from 'src/constants/ColorConstants';
import QuickLinkSection from '../landing-page/Sections/QuickLinkSection';
import NotificationsSection from './Sections/NotificationsSection';
import NotifcationTableSection from './Sections/NotifcationTableSection';
import LandingPageLayout from 'src/layouts/LandingPageLayout';


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
            <NotificationsSection />
            {showShapeUp()}
            <NotifcationTableSection />
            {showShapeDown(ColorConstants.primaryColor)}
            <QuickLinkSection />

        </>
    )
}


Index.getLayout = (page) => {
    return <LandingPageLayout>{page}</LandingPageLayout>;
};


export default Index