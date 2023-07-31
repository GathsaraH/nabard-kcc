import { UrlConstants } from "src/constants/UrlConstants";
import { post } from 'src/services/apiService';



/**
 * Check if the given email exists by making an API request.
 * @param {string} email - The email address to check for existence.
 * @returns {Object} - An object containing the API response status and data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function CheckIfEmailExists(email) {
  try {
    // Make a POST request to the API to check if the email exists
    const response = await post(`${UrlConstants.CHECK_IF_EMAIL_EXISTS_API}${email}`);

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
export async function loginApi(email) {
  try {
    // Make a POST request to the API to check if the email exists
    const response = await post(`${UrlConstants.CHECK_IF_EMAIL_EXISTS_API}${email}`);

    // Return a structured response object containing the API status and data
    return { status: response.status, data: response.data };
  } catch (error) {
    // Rethrow any error that occurs during the API request
    throw error;
  }
}
