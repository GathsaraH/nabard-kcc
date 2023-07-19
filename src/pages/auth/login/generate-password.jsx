import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
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
import PasswordInput from 'src/components/Input/TextField/PasswordInput';
import TickSvg from 'src/assets/svg/tickSvg';
import ModalContainer from 'src/components/Modal/ModalContainer';

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


    const handleModal = (item) => {
        setpasswordChangedModal(item)
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Recover Id Box'));
    }, []);
    const router = useRouter();


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

        const guidelineItems = [
            {
                id: 1,
                text: 'Must contain at least one uppercase letter',
                icon: newPassword.match(/[A-Z]/) ? <TickSvg width={20} height={20} /> : <span className="w-3 h-3 bg-dark rounded-full mr-2"></span>,
            },
            {
                id: 2,
                text: 'Must contain at least one lowercase letter',
                icon: newPassword.match(/[a-z]/) ? <TickSvg width={20} height={20} /> : <span className="w-3 h-3 bg-dark rounded-full mr-2"></span>,
            },
            {
                id: 3,
                text: 'Must contain at least one numeric digit',
                icon: newPassword.match(/[0-9]/) ? <TickSvg width={20} height={20} /> : <span className="w-3 h-3 bg-dark rounded-full mr-2"></span>,
            },
            {
                id: 4,
                text: 'Must contain at least one special character',
                icon: newPassword.match(/[!@#$%^&*]/) ? <TickSvg width={20} height={20} /> : <span className="w-3 h-3 bg-dark rounded-full mr-2"></span>,
            },
            {
                id: 5,
                text: 'Must be at least 8 characters long',
                icon: newPassword.length >= 8 ? <TickSvg width={20} height={20} /> : <span className="w-3 h-3 bg-dark rounded-full mr-2"></span>,
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
                <div className="w-1/2">
                    <PasswordInput
                        value={newPassword}
                        passwordShow={false}
                        placeholder="New Password"
                        onChange={(e) => handlePasswordChange(e)}
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

    /**
     * Handles the click event for the Forward button.
     * Changes the active step to the next step.
     */
    const handleForwardButton = () => {
        const errors = {};

        if (activeTab === 1) {
            if (preferredOtpMethod) {
                setActiveTab(2);
                setInputErrors({});
            } else {
                errors.method = "Please select any method";
                setInputErrors(errors);
            }
        } else if (activeTab === 2) {
            if (otp) {
                setActiveTab(3);
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
                setpasswordChangedModal(true)
                // alert("Password changed");
                console.log("Passwords matched, ready for submission");
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel m-6 w-1/2">
                {console.log(inputErrors)}
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
                                    className={`${activeTab === 1 ? '!border-primary !bg-primary text-white' : ''
                                        } border-[3px] border-[#f3f2ee] bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center w-16 h-16 rounded-full`}
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
            <ModalContainer hideCloseButton showModal={passwordChangedModal} handleModal={handleModal}>
            <div className="flex flex-col items-center justify-center p-5">
                  <TickSvg width={100} height={100} />
                  <p className="mt-4 text-xl font-bold text-center">Password Created Successfully</p>
                  <br/>
                  <br/>
                  <DefaultButtonComponent title="Proceed to login" onClick={() => router.push("/")} />
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
