import { UrlConstants } from "src/constants/UrlConstants";
import { post } from 'src/services/apiService';



/**
 * Check if the given email exists by making an API request.
 * @param {string} email - The email address to check for existence.
 * @returns {Object} - An object containing the API response status and data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function CheckIfEmailExists(email) {
  let postData = {
    email: email
  }
  try {
    // Make a POST request to the API to check if the email exists
    const response = await post(`${UrlConstants.CHECK_IF_EMAIL_EXISTS_API}`, postData);

    // Return a structured response object containing the API status and data
    return { status: response.status, data: response.data };
  } catch (error) {
    // Rethrow any error that occurs during the API request
    throw error;
  }
}


/**
 * Check if the given email exists by making an API request.
 * @param {string} body - This is the body of the request.
 * @returns {Object} - An object containing the API response status and data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function loginApi(postData) {
  try {
    // Make a POST request to the API to check if the email exists
    const response = await post(`${UrlConstants.LOGIN}`, postData);
    // Return a structured response object containing the API status and data
    return { status: response.status, data: response };
  } catch (error) {
    // Rethrow any error that occurs during the API request
    throw error;
  }
}


/**
 * Sends the OTP to generate password.
 * @param {string} email - The email address to check for existence.
 * @param {string} otpType - The type of OTP to be sent.
 * @returns {Object} - An object containing the API response status and data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function GeneratePasswordSendOtpApi(email,otpType ) {
  let postData = {
    email: email,
    otpType: otpType
  }
  try {
    // Make a POST request to the API to check if the email exists
    const response = await post(`${UrlConstants.GENERATE_PASSWORD_SEND_OTP}`, postData);
    // Return a structured response object containing the API status and data
    return { status: response.status, data: response };
  } catch (error) {
    // Rethrow any error that occurs during the API request
    throw error;
  }
}


/**
 * Verify the OTP to generate password.
 * @param {string} email - The email address to check for existence.
 * @param {string} otpType - The type of OTP to be sent.
 * @param {string} otpCode - The OTP code to be verified.
 * @returns {Object} - An object containing the API response status and data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function GeneratePasswordVerifyOtpApi(email,otpType, otpCode) {
  const postData = {
    email: email,
    otpType: otpType,
    code: otpCode
  }
  try {
    // Make a POST request to the API to check if the email exists
    const response = await post(`${UrlConstants.GENERATE_PASSWORD_VERIFY_OTP}`, postData);
    // Return a structured response object containing the API status and data
    return { status: response.status, data: response };
  } catch (error) {
    // Rethrow any error that occurs during the API request
    throw error;
  }
}


/**
 * Generate the password for the user first time.
 * @param {string} email - The email address to check for existence. 
 * @param {string} password - The password to be set. 
 * @returns {Object} - An object containing the API response status and data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function GeneratePasswordApi(email,password) {
  const postData = {
    email: email,
    password: password
  }
  try {
    // Make a POST request to the API to check if the email exists
    const response = await post(`${UrlConstants.GENERATE_PASSWORD}`, postData);
    // Return a structured response object containing the API status and data
    console.log(response);
    return { status: response.status, data: response };
  } catch (error) {
    // Rethrow any error that occurs during the API request
    throw error;
  }
}
