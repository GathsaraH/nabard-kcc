// Constants for URLs used in the application
export const UrlConstants = {
    // Base URL for API requests
    BASE_URL: 'http://115.166.142.18:8084/nab/api',
  
    // API endpoint to check if an email exists in the system
    // Params: email (string) - The email to check for existence
    CHECK_IF_EMAIL_EXISTS_API: '/nab-user/checkUser',
  
    // API endpoint for user authentication (login)
    LOGIN: '/authenticate',
  
    // API endpoint to send OTP for generating a password
    GENERATE_PASSWORD_SEND_OTP: '/nab-user/send-otp',
  
    // API endpoint to verify OTP during password generation
    GENERATE_PASSWORD_VERIFY_OTP: '/nab-user/verify',


    // API endpoint to generate password first time
    GENERATE_PASSWORD: '/nab-user/create-password',
  };
