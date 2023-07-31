/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setPageTitle } from '../../store/themeConfigSlice';
import BlankLayout from 'src/layouts/BlankLayout';
import ModalContainer from 'src/components/Modal/ModalContainer';
import DefaultInput from 'src/components/Input/TextField/DefaultInput';
import Image from 'next/image';
import loginBG from "../assets/images/b3.svg"
import nextCircle from "../assets/images/nextCircle.svg"
import loadingSvg from "../assets/images/Loading.svg"
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai"
import Loader from 'src/components/Loader/Loader';
import { CheckIfEmailExists } from 'src/services/Auth/AuthApi';


const Index = () => {
    const [authData, setAuthData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setloading] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordNotGenerated, setPasswordNotGenerated] = useState(false);
    const [chooseOtpModal, setchooseOtpModal] = useState(false);
    const [preferredOtpMethod, setPreferredOtpMethod] = useState('');

    const handleModal = (item) => {
        setchooseOtpModal(item);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Login')); // Set the page title to 'Login' when the component mounts
    }, [dispatch]);

    const router = useRouter();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setAuthData((prevData) => ({
            ...prevData,
            [id]: value,
        }));

        // Clear the corresponding error when the input value changes
        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: '',
        }));

        setPasswordNotGenerated(false);
        // Helper function to check if email is valid using regex
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
        if (id === 'email') {
            setShowPassword(false)
            if (!isValidEmail(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [id]: 'Invalid email format.',
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [id]: '',
                }));
            }
        }

        // Input validation rules
        if (id === 'email' && value.trim() === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [id]: 'Email is required.',
            }));
        } else if (id === 'password' && value.trim() === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [id]: 'Password is required.',
            }));
        }
    };

    const submitForm = () => {
        // Form validation
        const validationErrors = {};

        if (!authData.email.trim()) {
            validationErrors.email = 'Email is required.';
        }

        if (!authData.password.trim()) {
            validationErrors.password = 'Password is required.';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // Form submission logic here
            router.push('/dashboard');
        }
    };


    //This function checks if the account is created or not and password is generated or not
    const checkIfAccountIsCreated = async () => {
        const validationErrors = {};

        if (!authData.email.trim()) {
            validationErrors.email = 'Email is required.';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            if (showPassword) {
                if (!authData.password.trim()) {
                    validationErrors.password = 'Password is required.';
                    setErrors(validationErrors);
                } else {
                    // Call login API here since both email and password are provided
                }
            } else {
                setloading(true);

                try {
                    const data = await CheckIfEmailExists(authData.email);
                    setloading(false);

                    if (data.data) {
                        // If data.data is true, it means the account is created and the password is generated
                        setShowPassword(true);
                    } else {
                        // If it is false, it means the account is not created, and the password is not generated
                        setPasswordNotGenerated(true);
                    }
                } catch (error) {
                    setloading(false);
                }
            }
        }

        setloading(false);
    };



    const handlePreferredOtpMethodChange = (e) => {
        setPreferredOtpMethod(e.target.value);
    };

    const navigateToGeneratePasswordPage = () => {
        router.push('/auth/login/generate-password')

    }



    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-white bg-cover md:bg-white md:bg-cover md:bg-no-repeat md:bg-center" style={{ backgroundImage: `url(${loginBG.src})` }}>
            {
                loading && <Loader />
            }
            <div className="logo-container mb-10">
                {/* <Image src={circle} alt="logo" width={250} height={150} /> */}
                <Image src="/assets/images/NABNextLogo.svg" alt="logo" width={250} height={250} />
            </div>
            <div className="loginBox-Container panel m-6 w-full max-w-lg sm:w-[550px] shadow-2xl min-h-[200px]  rounded-2xl">
                <div className="flex flex-col justify-between h-full"> {/* Use flex column with justify-between to push content to bottom */}
                    <div>
                        <div className='flex justify-center'>
                            <h2 className="signText mb-3 text-2xl font-bold mt-5">Sign With Nabnext</h2>
                        </div>
                        <form data-testid="login-form" className="space-y-5 mt-5 p-2" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <DefaultInput
                                    value={authData.email}
                                    label="Email ID"
                                    id="email"
                                    placeholder="Enter Email"
                                    onChange={handleInputChange}
                                    showPassword={showPassword}
                                    onClick={checkIfAccountIsCreated}
                                    error={errors.email}
                                    icon={<AiOutlineMail size={24} className='mb-2 text-gray-500' />}
                                />
                            </div>
                            {showPassword && (
                                <div>
                                    <DefaultInput
                                        value={authData.password}
                                        label="Password"
                                        data-testid="Password"
                                        id="password"
                                        type="password"
                                        placeholder="Enter Password"
                                        onChange={handleInputChange}
                                        onClick={submitForm}

                                        error={errors.password}
                                        icon={<AiOutlineLock size={24} className='mb-2 text-gray-500' />}
                                    />
                                </div>
                            )}
                        </form>
                        {passwordNotGenerated && (
                            <p className=" passwordNotGeneratedText mt-5 ">
                                The password has not been generated,{" "}
                                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                                <span style={{ cursor: 'pointer' }} onClick={() => navigateToGeneratePasswordPage()} className="text-primary-light">
                                    click here
                                </span>{" "}
                                to create it
                            </p>
                        )}
                    </div> {/* authData.email */}
                    <div className={`flex items-center justify-end `}> {/* Flex container to position the image at the bottom */}
                        <button onClick={(e) => {
                            authData.email.length !== 0 && !loading ? checkIfAccountIsCreated() : e.preventDefault()
                        }} className={`${authData.email.length === 0 && `cursor-not-allowed`}`}>
                            <Image src={loading ? loadingSvg.src : nextCircle.src} alt="logo" width={50} height={50} />
                        </button>
                    </div>
                </div>
            </div>

            {/* modal starts here */}
            <ModalContainer title={"Generate password"} showModal={chooseOtpModal} handleModal={handleModal}>
                <p>Please select your preferred verification method:</p>
                <div className="flex-1 p-5">
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
                <div className='mb-5' >
                    <p> We will send you a One-Time Password (OTP) to the selected mode.</p>
                </div>
                <div className="note text-gray-700 bg-gray-200 rounded-md p-4">
                    <h2 className="text-xl font-semibold">Steps to generate password</h2>
                    <div className='p-3'>
                        <p>1. Choose mode.</p>
                        <p>2. Proceed to get OTP with your chosen methods.</p>
                        <p>3. Generate password.</p>
                    </div>
                </div>

            </ModalContainer>
        </div>
    );
};

Index.getLayout = (page) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default Index;
