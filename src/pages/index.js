import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setPageTitle } from '../../store/themeConfigSlice';
import BlankLayout from 'src/layouts/BlankLayout';
import LoginInput from 'src/components/Input/TextField/LoginInput';
import ModalContainer from 'src/components/Modal/ModalContainer';

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

    const submitForm = (e) => {

        // Form validation
        let formIsValid = true;
        const validationErrors = {};

        if (authData.email.trim() === '') {
            validationErrors.email = 'Email is required.';
            formIsValid = false;
        }

        if (authData.password.trim() === '') {
            validationErrors.password = 'Password is required.';
            formIsValid = false;
        }

        setErrors(validationErrors);

        if (formIsValid) {
            // Form submission logic here
            // router.push('/dashboard');
        }
    };


    const checkIfAccountIsCreated = (text) => {
        setloading(true);
        let formIsValid = true;
        const validationErrors = {};
    
        if (authData.email.trim() === '') {
            validationErrors.email = 'Email is required.';
            formIsValid = false;
        }
    
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
            // No validation errors, proceed with the code
    
            if (authData.email === 'admin@test.com') {
                if (showPassword) {
                    // router.push('/dashboard');
                } else {
                    setShowPassword(true);
                }
            } else {
                setPasswordNotGenerated(true);
                // router.push('/dashboard');
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
        <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
                <h2 className="mb-3 text-3xl font-bold">Sign In</h2>
                <hr className="h-5" />
                <p className="mb-7 text-lg">Please enter your email</p>
                <form data-testid = "login-form" className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <LoginInput
                            value={authData.email}
                            label="Email"
                            id="email"
                            placeholder="Enter Email"
                            onChange={handleInputChange}
                            showPassword={showPassword}
                            onClick={checkIfAccountIsCreated}
                            loading={loading}
                            error={errors.email}
                        />
                    </div>
                    {showPassword && (
                        <div>
                            <LoginInput
                                value={authData.password}
                                label="Password"
                                data-testid = "Password"
                                id="password"
                                type="password"
                                placeholder="Enter Password"
                                onChange={handleInputChange}
                                onClick={submitForm}
                                loading={loading}
                                error={errors.password}
                            />
                        </div>
                    )}
                </form>
                {passwordNotGenerated && (
                    <p className="mt-5 text-gray-500 text-lg">
                        The password has not been generated,{" "}
                        <span onClick={() => navigateToGeneratePasswordPage()} className="text-blue-500">
                            click here
                        </span>{" "}
                        to create it
                    </p>
                )}
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
