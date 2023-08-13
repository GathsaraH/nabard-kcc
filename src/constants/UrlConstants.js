// Constants for URLs used in the application
export const UrlConstants = {
    // Base URL for API requests
    // BASE_URL: 'http://115.166.142.18:8084/nabnext/api',
    BASE_URL: 'http://192.168.29.132:8084/nabnext/api',
  
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

    // API endpoint to get all state
    GET_ALL_STATE: '/states',

    // API endpoint to get all district by state id
    GET_DISTRICT_BY_STATE_ID: '/states',


    // API endpoint to get all sub district by district id
    GET_SUB_DISTRICT_BY_DISTRICT_ID: '/districts',


    // API endpoint to get all village by sub district id
    GET_VILLAGES_BY_SUB_DISTRICT: '/sub-districts',

    //  API endpoint to create or save bank hierarchy 
    ADD_BANK : "/add/bank-masters" ,

    // API endpoint to get all bank types 
    GET_ALL_BANK_TYPE : "/bank-type-masters",

       // API endpoint to get all bank names 
       GET_ALL_BANK_NAME : "/bank-name-masters",

       
  };
