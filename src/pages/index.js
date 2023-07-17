import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setPageTitle } from '../../store/themeConfigSlice';
import BlankLayout from 'src/layouts/BlankLayout';
import LoginInput from 'src/components/Input/TextField/LoginInput';
import ModalContainer from 'src/components/Modal/ModalContainer';


const Index = () => {
    const [authData, setAuthData] = useState({ email: 'admin2@test.com', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setloading] = useState(false)
    const [errors, setErrors] = useState({});
    const [passwordNotGenerated, setPasswordNotGenerated] = useState(false)
    const [chooseOtpModal, setchooseOtpModal] = useState(false)

    const handleModal = (item) => {
        setchooseOtpModal(item)
    }

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(setPageTitle('Login'));
    }, [dispatch]);

    const router = useRouter();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setAuthData({
            ...authData,
            [id]: value,
        });
        if (id == "email") {
            setAuthData((prevErrors) => ({
                ...prevErrors,
                ['password']: '',
            }));
            setShowPassword(false);
        } else {
        }
        // Clear the corresponding error when the input value changes
        setErrors((prevErrors) => ({
            ...prevErrors,
            [id]: '',
        }));

        setPasswordNotGenerated(false);

    };


    const submitForm = () => {
        // Form submission logic here
        router.push('/dashboard');
    };


    const checkIfAccountIsCreated = (text) => {
        setloading(true)
        if (authData.email === 'admin@test.com') {
            if (showPassword) {
                //   router.push('/dashboard');
            } else {
                setShowPassword(true);
            }
        } else {
            setPasswordNotGenerated(true)
            // router.push('/dashboard');
        }
        setloading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
                <h2 className="mb-3 text-3xl font-bold">Sign In</h2>
                <hr className="h-5" />
                <p className="mb-7 text-lg">Please enter your email</p>
                <form className="space-y-5" onSubmit={() => e.preventDefault()}>
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
                        />
                    </div>
                    {showPassword && (
                        <div>
                            <LoginInput
                                value={authData.password}
                                label="Password"
                                id="password"
                                type="password"
                                placeholder="Enter Password"
                                onChange={handleInputChange}
                                onClick={submitForm}
                                loading={loading}
                            />
                        </div>
                    )}
                </form>
                {
                    passwordNotGenerated &&
                    <p  className="mt-5 text-gray-500 text-lg">
                        The password has not been generated,{" "}
                        <span href="" onClick={() =>handleModal(true)} className="text-blue-500">
                            click here
                        </span>{" "}
                        to create it
                    </p>


                }
            </div>
            {/* modal starts here */}
            <ModalContainer showModal={chooseOtpModal} handleModal={handleModal} />
        </div>
    );
};

Index.getLayout = (page) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default Index;
