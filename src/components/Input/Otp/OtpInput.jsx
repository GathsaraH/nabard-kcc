import React, { useState } from 'react';

const OtpComponent = () => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move focus to the next input box
    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput.focus();
      nextInput.select();
    }
  };

  const handleOtpKeyPress = (index, event) => {
    if (
      (event.key === 'Backspace' || event.key === 'Delete') &&
      !otp[index] &&
      index > 0
    ) {
      const updatedOtp = [...otp];
      updatedOtp[index] = '';
      updatedOtp[index - 1] = '';
      setOtp(updatedOtp);
      
      const previousInput = document.getElementById(`otp-${index - 1}`);
      previousInput.focus();
      previousInput.select();
    } else if (event.target.value.length === 1 && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const getOtpAsString = () => {
    return otp.join('');
  };

  return (
    <div className="flex justify-center">
      {console.log(otp)}
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          maxLength={1}
          className="w-12 h-12 text-3xl text-center border border-gray-300 rounded-md mx-1"
          value={digit}
          onChange={(event) => handleOtpChange(index, event.target.value)}
          onKeyDown={(event) => handleOtpKeyPress(index, event)}
        />
      ))}
      {/* <p>OTP: {getOtpAsString()}</p> */}
    </div>
  );
};

export default OtpComponent;
