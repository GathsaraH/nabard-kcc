import Image from "next/image";
import React from "react";
import VectorSvg from "src/assets/svg/VectorSvg.svg";
import DefaultButtonComponent from "src/components/Button/DefaultButtonComponent";
import ImgOne from "../../../assets/images/firstImg.png";
import { useRouter } from "next/router";
import { useAuthToken } from "src/hooks/Auth/useAuthToken";
import 'animate.css';

const HeroSection = () => {
  const { token } = useAuthToken();

  const router = useRouter();

  const navigateToLoginPage = () => {
    if (token?.length > 0) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  };
  return (
    <div>
      {" "}
      <div className="bg-[#EEF2F0]  flex flex-col sm:flex-row">
      <Image className="hidden sm:block lg:mb-0 animate__animated animate__fadeInLeft" src={VectorSvg} alt="leftVector" />
        <div className="px-6 py-12 text-center md:px-12 lg:text-left">
          <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-1">
              <div className="mt-12 lg:mt-0">
                <div className="mt-0 mb-16 text-3xl font-bold tracking-tight md:text-6xl xl:text-2xl text-black animate__animated animate__fadeInDown">
                  {/* The best offer <br /><span className="text-black">for your business</span> */}
                  <span > Welcome to the GharGhar KCC Abhiyan (GGKA)</span>
                  <br />
                  <span className="text-2xl font-semibold tracking-tight md:text-6xl xl:text-lg text-black ">
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
                </div>

               <div className="mb-10" >
               <DefaultButtonComponent
                  onClick={navigateToLoginPage}
                  className="animate__animated animate__fadeInUp"
                  roundedOff
                  title={token?.length > 0 ? "Dashboard" : "Login"}
                />
               </div>
              </div>
            </div>
          </div>
        </div>
        <div >
          <Image
          className="animate__animated animate__fadeInRight"
            src={ImgOne}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
