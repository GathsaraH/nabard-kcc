import { useRouter } from 'next/router';
import React,{useState} from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai';
import TickSvg from 'src/assets/svg/tickSvg';
import DefaultButtonComponent from 'src/components/Button/DefaultButtonComponent';
import IconButton from 'src/components/Button/IconButtonComponent';
import DefaultInput from 'src/components/Input/TextField/DefaultInput'
import ModalContainer from 'src/components/Modal/ModalContainer';
import BlankLayout from 'src/layouts/BlankLayout';

const ForgotPassword = () => {
    const [authData, setAuthData] = useState({ email: ''});
    const [errors, setErrors] = useState({});
    const[resetLink , setResetLink] = useState(false);
    const router = useRouter();
    const handleModal = () => {
        setResetLink(true)
    }
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

        // Helper function to check if email is valid using regex
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };
        if (id === 'email') {
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
        }
        }

    const submitForm = (e) => {
        // Form validation
        let formIsValid = true;
        const validationErrors = {};
        if (authData.email.trim() === '') {
            validationErrors.email = 'Email is required.';
            formIsValid = false;
        }
        setErrors(validationErrors);
        if (formIsValid) {
            // Form submission logic here
            setResetLink(true);
        }
    };
  return (
    <div className="flex min-h-screen  items-center justify-center">
    <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
        <h2 className="mb-3 text-xl font-bold">Forgot Password</h2>
        <hr className="h-5" />
        <form data-testid="forgot-password-form" className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
                <DefaultInput
                    value={authData.email}
                    label="Email"
                    id="email"
                    placeholder="Enter Email"
                    onChange={handleInputChange}
                    error={errors.email}
                    className="mb-5"
                />
                <div className='flex justify-end mt-4'>
                <IconButton icon={<AiOutlineArrowRight/>} onClick={submitForm} label="Submit" />
                </div>
            </div>
        </form>
          {/* modal starts here */}
          <ModalContainer hideCloseButton showModal={resetLink} handleModal={handleModal}>
            <div className="flex flex-col items-center justify-center p-5">
                  <TickSvg width={100} height={100} />
                  <p className="mt-4 text-xl font-bold text-center">Reset Password Link Successfully</p>
                  <br/>
                  <br/>
                  <DefaultButtonComponent title="OK" onClick={() => router.push("/")} />
                </div>
            </ModalContainer>
    </div>
</div>
  )
}
ForgotPassword.getLayout = (page) => {
    return <BlankLayout>{page}</BlankLayout>;
};

export default ForgotPassword