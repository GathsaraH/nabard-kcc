import React from 'react'
import NavbarLandingPage from 'src/components/Navbar/NavbarLandingPage';
import BlankLayout from 'src/layouts/BlankLayout';
import DocumentsSection from './Sections/DocumentsSection';
import Image from 'next/image';
import shapeUp from "src/assets/images/Shapes/shapeUp.png";
import shapeDown from "src/assets/images/Shapes/shapeDown.png";
import { ColorConstants } from 'src/constants/ColorConstants';
import QuickLinkSection from '../landing-page/Sections/QuickLinkSection';
import DocumentsTableSection from './Sections/DocumentsTableSection';


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