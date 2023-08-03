import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import BlankLayout from 'src/layouts/BlankLayout';
import OtpSvg from 'src/assets/svg/OtpSvg';
import GeneratePasswordSvg from 'src/assets/svg/GeneratePasswordSvg';
import Tippy from '@tippyjs/react';
import InfoSvg from 'src/assets/svg/InfoSvg';
import OtpComponent from 'src/components/Input/Otp/OtpInput';
import TimerComponent from 'src/components/Timer/TimerComponent';
import DefaultButtonComponent from 'src/components/Button/DefaultButtonComponent';
import PasswordInput from 'src/components/Input/TextField/PasswordInput';
import ModalContainer from 'src/components/Modal/ModalContainer';
import { GiEarthAmerica } from 'react-icons/gi'
import loginBG from '../../../assets/images/b3.svg'
import Image from 'next/image';
import CardContainer from 'src/components/Card/CardContainer';
import { AiOutlineRight, AiOutlineLock } from 'react-icons/ai'
import StarCheckSvg from 'src/assets/svg/StarCheckSvg';

import styles from './generate-password.module.css';
import { TokenConstants } from 'src/constants/TokenConstants';
import { GeneratePasswordApi, GeneratePasswordSendOtpApi, GeneratePasswordVerifyOtpApi } from 'src/services/Auth/AuthApi';
import { ShowSuccessAlert } from 'src/Alerts/AlertComponent';

/**
 * GeneratePassword is a page for generating passwords using a multi-step process.
 * It allows users to select a verification method, enter an OTP, and generate a new password.
 */
const GeneratePassword = () => {
    const [preferredOtpMethod, setPreferredOtpMethod] = useState('');
    const [activeTab, setActiveTab] = useState(1);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [areGuidelinesMatched, setAreGuidelinesMatched] = useState(false);
    const [inputErrors, setInputErrors] = useState({})
    const [otp, setOtp] = useState("")
    const [passwordChangedModal, setpasswordChangedModal] = useState(false)
    const router = useRouter();
    const [email, setemail] = useState("")

    const handleModal = (item) => {
        setpasswordChangedModal(item)
    }

    const dispatch = useDispatch();
    useEffect(() => {
        const email = localStorage.getItem(TokenConstants.EMAIL)
        setemail(email)
        dispatch(setPageTitle('Recover Id Box'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /**
    * Handles the change event for the password input fields.
    * Updates the new password and confirms password values,
    * and checks if the entered password meets the guidelines.
    * 
    * @param {Object} e - The event object.
    * @param {boolean} isConfirmPassword - Flag indicating if it's the confirm password field.
    */
    const handlePasswordChange = (e, isConfirmPassword = false) => {
        const password = e.target.value;
        if (isConfirmPassword) {
            setConfirmPassword(password);
            setInputErrors({});
        } else {
            setNewPassword(password);
            setAreGuidelinesMatched(
                password.match(/[A-Z]/) &&
                password.match(/[a-z]/) &&
                password.match(/[0-9]/) &&
                password.match(/[!@#$%^&*]/) &&
                password.length >= 8
            );
        }
    };

    /**
   * Handles the form submission.
   * Validates if the new password and confirm password match.
   * 
   * @param {Object} e - The event object.
   */
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (newPassword === confirmPassword) {

    //         // Passwords match, proceed with submission
    //         // ...
    //     } else {
    //         // Passwords do not match, show an error or take appropriate action
    //         // ...
    //     }
    // };

    /**
    * Handles the change event for the preferred OTP method.
    * 
    * @param {Object} e - The event object.
    */
    const handlePreferredOtpMethodChange = (e) => {
        setPreferredOtpMethod(e.target.value);
        setInputErrors({})
    };


    /**
   * PasswordGuidelinesNote is a component that displays the guidelines for passwords.
   * It shows the password requirements and indicates whether each requirement is met.
   */
    const PasswordGuidelinesNote = () => {
        const width = 20;
        const height = 20;

        const guidelineItems = [
            {
                id: 1,
                text: 'Must contain at least one uppercase letter',
                // icon: newPassword.match(/[A-Z]/) ? <StarCheckSvg checked width={20} height={20} /> : <span className="w-3 h-3 bg-dark rounded-full mr-2"></span>,
                icon: <StarCheckSvg width={width} height={height} checked={newPassword.match(/[A-Z]/)} />,
            },
            {
                id: 2,
                text: 'Must contain at least one lowercase letter',
                icon: <StarCheckSvg width={width} height={height} checked={newPassword.match(/[a-z]/)} />,
            },
            {
                id: 3,
                text: 'Must contain at least one numeric digit',
                icon: <StarCheckSvg width={width} height={height} checked={newPassword.match(/[0-9]/)} />,
            },
            {
                id: 4,
                text: 'Must contain at least one special character',
                icon: <StarCheckSvg width={width} height={height} checked={newPassword.match(/[!@#$%^&*]/)} />,
            },
            {
                id: 5,
                text: 'Must be at least 8 characters long',
                icon: <StarCheckSvg width={width} height={height} checked={newPassword.length >= 8} />,
            },
        ];

        /**
        * GuidelineItem is a component that displays a single password guideline item.
        * It shows an icon indicating whether the guideline is met and the text of the guideline.
        *
        * @param {Object} icon - The icon component to display.
        * @param {string} text - The text of the guideline.
        */
        const GuidelineItem = ({ icon, text }) => (
            <li className="flex items-center">
                {icon}
                <span className="text-base font-medium text-black ml-3">{text}</span>
            </li>
        );

        return (
            <div className="text-left">
                <h4 className="text-xl font-semibold mb-2 ml-5">Guidelines for passwords:</h4>
                <ul className="pl-6 space-y-1">
                    {guidelineItems.map((item) => (
                        <GuidelineItem key={item.id} icon={item.icon} text={item.text} />
                    ))}
                </ul>
            </div>

        );
    };

    /**
        * FirstStep is a component that represents the first step of the password generation process.
        * It allows the user to select their preferred verification method.
        */
    function FirstStep() {





        return (
            <div className="flex-1 p-5">
                <h2 className="font-bold text-lg">
                    {!preferredOtpMethod.length > 0
                        ? 'Please select your preferred verification method:'
                        : `You will receive an OTP on your ${preferredOtpMethod}.`}
                </h2>
                <br />
                <div className='flex justify-evenly' >
                    <CardContainer width="w-1/2 sm:w-1/3" shadow={"shadow-lg"}>
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
                    </CardContainer>
                    <CardContainer width="w-1/2 sm:w-1/3" shadow={"shadow-lg"}>
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
                    </CardContainer>

                </div>
                {
                    inputErrors.method && <p className="text-red-500 text-sm mt-1">{inputErrors.method}</p>
                }
            </div>
        );
    }


    /**
    * SecondStep is a component that represents the second step of the password generation process.
    * It prompts the user to enter the OTP received through their preferred method.
    */
    function SecondStep() {
        return (
            <div className="flex flex-col items-center p-5 text-center">
                <h4 className="mb-3 font-bold text-lg">
                    Please enter One Time Password (OTP) that has been sent to your{' '}
                    {preferredOtpMethod}
                </h4>
                <br />
                <OtpComponent onChange={setOtp} error={inputErrors.otp} setError={setInputErrors} />
                <br />
                {
                    inputErrors.otp && <p className="text-red-500 text-sm mt-1">{inputErrors.otp}</p>
                }
                <br />
                <DefaultButtonComponent className="mb-5" title="Resend OTP" />
                <h5 className="mb-3 font-bold text-md">OTP will expire in</h5>
                <TimerComponent time={300} />
            </div>
        );
    }

    /**
     * ThirdStep is a component that represents the third step of the password generation process.
     * It allows the user to generate a new password and confirm it.
     */
    function ThirdStep() {
        return (
            <div className="flex flex-col p-5 items-center text-center">
                <br />
                <div className="w-full sm:w-1/2">
                    <PasswordInput
                        value={newPassword}
                        passwordShow={false}
                        placeholder="New Password"
                        onChange={(e) => handlePasswordChange(e)}
                        icon={<AiOutlineLock size={25} color='gray' />}
                    />
                    {
                        inputErrors.newPassword && !newPassword && <p className="text-red-500 text-sm mt-1">{inputErrors.newPassword}</p>
                    }
                    <br />
                    {newPassword && areGuidelinesMatched ? <></> : <PasswordGuidelinesNote />}
                    <br />
                    {
                        areGuidelinesMatched && <PasswordInput
                            value={confirmPassword}
                            passwordShow={false}
                            placeholder="Confirm Password"
                            onChange={(e) => handlePasswordChange(e, true)}
                            icon={<AiOutlineLock size={25} color='gray' />}
                        />
                    }
                    {
                        inputErrors.confirmPassword && !confirmPassword && <p className="text-red-500 text-sm mt-1">{inputErrors.confirmPassword}</p>
                    }
                    {
                        // Show the error message for confirm password beneath the input field
                        inputErrors.confirmPassword && confirmPassword && <p className="text-red-500 text-sm mt-1">{inputErrors.confirmPassword}</p>
                    }

                </div>
            </div>
        );
    }

    /**
     * Handles the click event for the Back button.
     * Changes the active step to the previous step.
     */
    const handleBackButton = () => {
        if (activeTab === 1) {
            setActiveTab(activeTab === 3 ? 2 : 1);
        } else if (activeTab === 2) {
            setActiveTab(activeTab === 3 ? 2 : 1);
        } else if (activeTab === 3) {
            setActiveTab(1);
            setOtp("")
        }
    };

    const sendOtpFunction = async () => {
        const OtpType = preferredOtpMethod
        try {
            const data = await GeneratePasswordSendOtpApi(email, OtpType)
            if (data.status === 200) {
                return true
            }
        } catch (error) {

        }
    }

    const VerifyOtpFunction = async () => {
        const OtpType = preferredOtpMethod
        try {
            const data = await GeneratePasswordVerifyOtpApi(email, OtpType, otp)
            if (data) {
                return true
            }
        } catch (error) {

        }
    }
    const GeneratePassword = async () => {
        try {
            const data = await GeneratePasswordApi(email, newPassword)
            if (data) {
                return true
            }
        } catch (error) {

        }
    }



    /**
     * Handles the click event for the Forward button.
     * Changes the active step to the next step.
     */
    const handleForwardButton = async () => {
        const errors = {};

        if (activeTab === 1) {
            if (preferredOtpMethod) {
                // setActiveTab(2);
                // setInputErrors({});
                const sendOtp = await sendOtpFunction()
                if (sendOtp) {
                    ShowSuccessAlert("OTP sent successfully")
                    setActiveTab(2);
                    setInputErrors({});
                }

            } else {
                errors.method = "Please select any method";
                setInputErrors(errors);
            }
        } else if (activeTab === 2) {
            if (otp) {
                // setActiveTab(3);
                const verifyOtp = await VerifyOtpFunction()
                if (verifyOtp) {
                    ShowSuccessAlert("OTP verified successfully")
                    setActiveTab(3);
                    setInputErrors({});
                }
            } else {
                errors.otp = "Please enter OTP";
                setInputErrors(errors);
            }
        } else if (activeTab === 3) {
            if (!newPassword) {
                errors.newPassword = "Please enter password";
                setInputErrors(errors);
            } else if (!confirmPassword) {
                errors.confirmPassword = "Please enter password";
                setInputErrors(errors);
            } else if (newPassword !== confirmPassword) {
                errors.confirmPassword = "Passwords do not match";
                setInputErrors(errors);
            } else {
                const data = await GeneratePassword()
                if(data) {
                    setpasswordChangedModal(true)
                }
                // alert("Password changed");
            }
        }
    };


    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-white bg-cover md:bg-white md:bg-cover md:bg-no-repeat md:bg-center" style={{ backgroundImage: `url(${loginBG.src})` }}>
            <div className="logo-container">
                {/* <Image src={circle} alt="logo" width={250} height={150} /> */}
                <Image src="../../../assets/images/NABNextLogo.svg" alt="logo" width={250} height={250} />
            </div>
            <div className={`${styles.boxContainer}  panel m-6 w-[350px] sm:w-1/2 shadow-2xl rounded-2xl`}>
                <div className='flex justify-center'>
                    <h2 className="signText font-bold">
                        Generate Password
                        <Tippy
                            trigger="mouseenter focus"
                            placement="bottom"
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
                                <InfoSvg className="mt-5" />
                            </button>
                        </Tippy>
                    </h2>
                </div>
                <br />
                <br />
                <div className="inline-block w-full">
                    <div className="relative z-[1]">
                        <div
                            className={`${activeTab === 1
                                ? 'w-[0%] bg-primary'
                                : activeTab === 2
                                    ? 'w-[50%] bg-primary-light'
                                    : activeTab === 3
                                        ? 'w-[81%] bg-primary-light'
                                        : ''
                                }   w-[15%] h-2 absolute ltr:left-0 rtl:right-0 top-[40px] m-auto -z-[1] transition-[width]`}
                        ></div>
                        <ul className="mb-5 grid grid-cols-3">
                            <li className="mx-auto">
                                <button
                                    type="button"
                                    className={`${activeTab === 1 || activeTab === 2 || activeTab === 3 ? '!bg-primary text-white' : ''
                                        }   ${activeTab === 2 || activeTab === 3 ? "!bg-primary-light" : ""} bg-white  flex justify-center items-center w-20 h-20 rounded-full`}
                                >
                                    <GiEarthAmerica color={'white'} size={38} />
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
                                    className={`${activeTab === 2 || activeTab === 3
                                        ? '!bg-primary text-white '
                                        : 'bg-[#EEEEEE]'
                                        } ${activeTab === 3 ? "!bg-primary-light" : " "}  bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-20 h-20 rounded-full`}
                                >
                                    <OtpSvg color={activeTab === 2 || activeTab === 3 ? 'white' : '#888EA8'} />
                                    {/* <Image src={mobileOTp.src} alt="logo" width={30} height={30} /> */}
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
                                        ? ' !bg-primary text-white'
                                        : 'bg-[#EEEEEE]'
                                        }   bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-20 h-20 rounded-full`}
                                >
                                    <GeneratePasswordSvg
                                        color={activeTab === 3 ? 'white' : '#888EA8'}
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
                    <div className={`flex ${activeTab === 1 ? "justify-center" : ""}`}>
                        <DefaultButtonComponent
                            className={activeTab === 1 ? 'hidden' : ''}
                            title="Back"
                            onClick={handleBackButton}
                        />
                        <DefaultButtonComponent
                            icon={<AiOutlineRight />}
                            className={`${activeTab !== 1 ? `ltr:ml-auto rtl:mr-auto` : "mt-20"}`}
                            title={
                                activeTab === 1
                                    ? 'Send OTP'
                                    : activeTab === 2
                                        ? 'Verify OTP'
                                        : activeTab === 3 && 'Generate'
                            }
                            onClick={handleForwardButton}
                        />
                    </div>
                </div>
            </div>
            <ModalContainer classname="p-10" hideCloseButton showModal={passwordChangedModal} handleModal={handleModal}>
                <div className="flex flex-col items-center justify-center p-5">
                    <StarCheckSvg width={100} height={100} checked />
                    <p className="mt-4 text-2xl font-bold text-center">Password Created Successfully</p>
                    <br />
                    <br />
                    <DefaultButtonComponent className='text-xl' title="Proceed to login" onClick={() => router.push("/")} icon={<AiOutlineRight />} />
                </div>
            </ModalContainer>
        </div>
    );
};


/**
 * Specifies the layout for the GeneratePassword page.
 *
 * @param {React.Component} page - The page component.
 * @returns {React.Component} - The page component wrapped in the BlankLayout.
 */
GeneratePassword.getLayout = (page) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default GeneratePassword;
