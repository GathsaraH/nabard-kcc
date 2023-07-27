import React from 'react';
import loginBG from '../../../../assets/images/profileBackground.svg';
import styles from './index.module.css';
import Image from 'next/image';
import avatarSample from '../../../../assets/images/avatarSample.png';

const Index = () => {



  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-center">
        <span className="text-2xl font-bold">User profile</span>
      </div>
      <div
        className="flex justify-center bg-info mt-5 h-[300px] sm:h-[500px]"
        style={{ backgroundImage: `url(${loginBG.src})` }}
      >
        <section className={`${styles.profileBackgroundCard} profileEdit bg-white h-[500px] sm:h-[500px] w-3/5 sm:w-1/2`}>
            <Image className="portraitEdit h-32 w-32 rounded-full overflow-hidden object-cover" src={avatarSample} alt="img" />
          <div className="flex justify-center mt-4">
            <span className="text-xl font-bold">Akash Poddar</span>
          </div>
         
          
          {/* Center the grid element */}
          <div className=" ml-[20%] flex justify-center items-center mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Address</span>
                <span className="text-md">
                  Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Mobile Number</span>
                <span className="text-md">
                  +91 84012 72401
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Email</span>
                <span className="text-md">
                  example@test.com
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Designation</span>
                <span className="text-md">
                  Web Developer
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Place Of Posting</span>
                <span className="text-md">
                Head admin
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">Role</span>
                <span className="text-md">
                Delete Employee
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
