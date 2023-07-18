import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import BlankLayout from 'src/layouts/BlankLayout';
import OtpSvg from 'src/assets/svg/OtpSvg';
import ChooseMethodSvg from 'src/assets/svg/ChooseMethodSvg';
import GeneratePasswordSvg from 'src/assets/svg/GeneratePasswordSvg';
import Tippy from '@tippyjs/react';
import InfoSvg from 'src/assets/svg/InfoSvg';
import OtpComponent from 'src/components/Input/Otp/OtpInput';
import TimerComponent from 'src/components/Timer/TimerComponent';
import DefaultButtonComponent from 'src/components/Button/DefaultButtonComponent';
import PasswordOnSvg from 'src/assets/svg/PasswordOnSvg';
import PasswordInput from 'src/components/Input/TextField/PasswordInput';
import TickSvg from 'src/assets/svg/tickSvg';


const GeneratePassword = () => {
    const [preferredOtpMethod, setPreferredOtpMethod] = useState('');
    const [activeTab, setActiveTab] = useState(1);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [areGuidelinesMatched, setAreGuidelinesMatched] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Recover Id Box'));
    });
    const router = useRouter();

    const handleNewPasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);
        setAreGuidelinesMatched(
            password.match(/[A-Z]/) &&
            password.match(/[a-z]/) &&
            password.match(/[0-9]/) &&
            password.match(/[!@#$%^&*]/) &&
            password.length >= 8
        );
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword === confirmPassword) {
            // Passwords match, proceed with submission
            // ...
        } else {
            // Passwords do not match, show an error or take appropriate action
            // ...
        }
    };

    const handlePreferredOtpMethodChange = (e) => {
        setPreferredOtpMethod(e.target.value);
    };

    const PasswordGuidelinesNote = () => {

        const guidelineItems = [
            {
                id: 1,
                text: 'Must contain at least one uppercase letter',
                icon: newPassword.match(/[A-Z]/) ? <TickSvg /> : <span className="w-3 h-3 bg-dark rounded-full mr-2"></span>,
            },
            {
                id: 2,
                text: 'Must contain at least one lowercase letter',
                icon: newPassword.match(/[a-z]/) ? <TickSvg /> : <span className="w-3 h-3 bg-dark rounded-full mr-2"></span>,
            },
            {
                id: 3,
                text: 'Must contain at least one numeric digit',
                icon: newPassword.match(/[0-9]/) ? <TickSvg /> : <span className="w-3 h-3 bg-dark rounded-full mr-2"></span>,
            },
            {
                id: 4,
                text: 'Must contain at least one special character',
                icon: newPassword.match(/[!@#$%^&*]/) ? <TickSvg /> : <span className="w-3 h-3 bg-dark rounded-full mr-2"></span>,
            },
            {
                id: 5,
                text: 'Must be at least 8 characters long',
                icon: newPassword.length >= 8 ? <TickSvg /> : <span className="w-3 h-3 bg-dark rounded-full mr-2"></span>,
            },
        ];

        const GuidelineItem = ({ icon, text }) => (
            <li className="flex items-center">
                {icon}
                <span className="text-base font-medium text-black">{text}</span>
            </li>
        );

        return (
            <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="text-2xl font-semibold mb-2">Guidelines for passwords:</h4>
                <ul className="pl-6 space-y-1">
                    {guidelineItems.map((item) => (
                        <GuidelineItem key={item.id} icon={item.icon} text={item.text} />
                    ))}
                </ul>
            </div>
        );
    };

    function FirstStep() {
        return (
            <div className="flex-1 p-5">
                <h2 className="font-bold text-lg">
                    {!preferredOtpMethod.length > 0
                        ? 'Please select your preferred verification method:'
                        : `You will receive an OTP on your ${preferredOtpMethod}.`}
                </h2>
                <br />
                <div className="mb-2">
                    <label className="mt-1 inline-flex cursor-pointer">
                        <input
                            type="radio"
                            name="otpMethod"
                            className="form-radio"
                            value="email"
                            checked={preferredOtpMethod === 'email'}
                            onChange={handlePreferredOtpMethodChange}
                        />
                        <span>Email</span>
                    </label>
                </div>
                <div className="mb-2">
                    <label className="mt-1 inline-flex cursor-pointer">
                        <input
                            type="radio"
                            name="otpMethod"
                            className="form-radio"
                            value="mobile"
                            checked={preferredOtpMethod === 'mobile'}
                            onChange={handlePreferredOtpMethodChange}
                        />
                        <span>Mobile</span>
                    </label>
                </div>
            </div>
        );
    }

    function SecondStep() {
        return (
            <div className="flex flex-col items-center p-5 text-center">
                <h4 className="mb-3 font-bold text-lg">
                    Please enter One Time Password (OTP) that has been sent to your{' '}
                    {preferredOtpMethod}
                </h4>
                <br />
                <OtpComponent />
                <br />
                <br />
                <DefaultButtonComponent className="mb-5" title="Resend OTP" />
                <h5 className="mb-3 font-bold text-md">OTP will expire in</h5>
                <TimerComponent time={300} />
            </div>
        );
    }

    function ThirdStep() {
        return (
            <div className="flex flex-col p-5 items-center text-center">
                <br />
                <div className="w-1/2">
                    <PasswordInput
                        value={newPassword}
                        passwordShow={false}
                        placeholder="New Password"
                        onChange={handleNewPasswordChange}
                    />
                    <br />
                    {newPassword && areGuidelinesMatched ? <></> : <PasswordGuidelinesNote /> }
                    <br />
                    {
                        areGuidelinesMatched && <PasswordInput
                            value={confirmPassword}
                            passwordShow={false}
                            placeholder="Confirm Password"
                            onChange={handleConfirmPasswordChange}
                        />
                    }

                </div>
            </div>
        );
    }

    const handleBackButton = () => {
        setActiveTab(activeTab === 3 ? 2 : 1);
    };

    const handleForwardButton = () => {
        setActiveTab(activeTab === 1 ? 2 : 3);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel m-6 w-1/2">
                <h2 className="mb-3 text-2xl font-bold">
                    Generate Password
                    <Tippy
                        trigger="mouseenter focus"
                        placement="right"
                        content={
                            <div className="panel p-3 w-full">
                                <h2 className="text-xl text-black font-semibold">
                                    Steps to generate password
                                </h2>
                                <div className="p-3 text-black">
                                    <p>1. Select the desired mode.</p>
                                    <p>2. Request an OTP using your chosen method.</p>
                                    <p>3. Generate a password.</p>
                                </div>
                            </div>
                        }
                    >
                        <button className="ml-2" type="button" data-trigger="mouseenter">
                            <InfoSvg />
                        </button>
                    </Tippy>
                </h2>
                <br />
                <br />
                <div className="inline-block w-full">
                    <div className="relative z-[1]">
                        <div
                            className={`${activeTab === 1
                                    ? 'w-[15%]'
                                    : activeTab === 2
                                        ? 'w-[48%]'
                                        : activeTab === 3
                                            ? 'w-[81%]'
                                            : ''
                                } bg-primary w-[15%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]`}
                        ></div>
                        <ul className="mb-5 grid grid-cols-3">
                            <li className="mx-auto">
                                <button
                                    type="button"
                                    className={`${activeTab === 1
                                            ? '!border-primary !bg-primary text-white'
                                            : ''
                                        } border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                    onClick={() => setActiveTab(1)}
                                >
                                    <ChooseMethodSvg />
                                </button>
                                <span
                                    className={`${activeTab === 1 ? 'text-primary ' : ''
                                        }text-center block mt-2`}
                                >
                                    Select method
                                </span>
                            </li>
                            <li className="mx-auto">
                                <button
                                    type="button"
                                    className={`${activeTab === 2
                                            ? '!border-primary !bg-primary text-white'
                                            : ''
                                        } border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                    onClick={() => setActiveTab(2)}
                                >
                                    <OtpSvg color={activeTab === 2 ? 'white' : 'black'} />
                                </button>
                                <span
                                    className={`${activeTab === 2 ? 'text-primary ' : ''
                                        }text-center block mt-2`}
                                >
                                    Verify OTP
                                </span>
                            </li>
                            <li className="mx-auto">
                                <button
                                    type="button"
                                    className={`${activeTab === 3
                                            ? '!border-primary !bg-primary text-white'
                                            : ''
                                        } border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
                                    onClick={() => setActiveTab(3)}
                                >
                                    <GeneratePasswordSvg
                                        color={activeTab === 3 ? 'white' : 'black'}
                                    />
                                </button>
                                <span
                                    className={`${activeTab === 3 ? 'text-primary ' : ''
                                        }text-center block mt-2`}
                                >
                                    Generate Password
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <hr />
                        {activeTab === 1
                            ? FirstStep()
                            : activeTab === 2
                                ? SecondStep()
                                : ThirdStep()}
                    </div>
                    <div className="flex justify-between">
                        <DefaultButtonComponent
                            className={activeTab === 1 ? 'hidden' : ''}
                            title="Back"
                            onClick={handleBackButton}
                        />
                        <DefaultButtonComponent
                            className="ltr:ml-auto rtl:mr-auto"
                            title={
                                activeTab === 1
                                    ? 'Send OTP'
                                    : activeTab === 2
                                        ? 'Verify'
                                        : activeTab === 3 && 'Generate'
                            }
                            onClick={handleForwardButton}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

GeneratePassword.getLayout = (page) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default GeneratePassword;
