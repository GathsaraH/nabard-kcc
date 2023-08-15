import axios from 'axios';
import Cookies from 'js-cookie';
import { ShowErrorAlert } from 'src/Alerts/AlertComponent';
import { UrlConstants } from 'src/constants/UrlConstants';

const { BASE_URL } = UrlConstants;


const getBearerToken = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authToken = Cookies.get('authToken');

  // Implement the logic to get the bearer token dynamically, e.g. from local storage, cookies, or another API call.
  // Replace the following line with the logic to fetch the actual token.
  const bearerToken = authToken;

  return bearerToken;
};




const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getBearerToken()}`,
  // Add any other headers you might need, e.g. Authorization, etc.
};

/**
 * Create a custom Error object with additional status information.
 * @param {string} message - The error message.
 * @param {number} status - The HTTP status code of the error.
 * @returns {Error} - The custom Error object.
 */
const createError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/**
 * Handle the Axios response and return the data or throw an Error with the message.
 * @param {Object} response - The Axios response object.
 * @returns {Object} - The data returned by the API.
 * @throws {Error} - Throws an Error with the API error message if the status is not 200 or 201.
 */
const handleResponse = (response) => {
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else if (response.status === 400 || response.status === 404) {
    throw new Error(response.data.message);
  } else {
    throw new Error('An error occurred');
  }
};

/**
 * Handle Axios request errors and throw a custom Error object with the error message.
 * @param {Error} error - The Axios error object.
 * @throws {Error} - Throws a custom Error object with the error message and status.
 */
const handleRequestError = (error) => {
  let errorMessage = 'An error occurred';
  let status = 500; // Default status code for internal server error

  if (error.response && error.response.data && error.response.data.title) {
    errorMessage = error.response.data.title;
    // eslint-disable-next-line prefer-destructuring
    status = error.response.status;
  }

  throw createError(errorMessage, status);
};

const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: headers,
});

// Add an Axios interceptor to handle error responses globally
apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data && error.response.data.title) {
      ShowErrorAlert(error.response.data.title);
    }
    return Promise.reject(error);
  }
);

/**
 * Perform an HTTP GET request to the specified URL.
 * @param {string} url - The URL to send the GET request to.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const get = async (url, params) => {
  try {
    const response = await apiInstance.get(url, { params });
    return handleResponse(response);
  } catch (error) {
    handleRequestError(error);
  }
};

/**
 * Perform an HTTP POST request to the specified URL.
 * @param {string} url - The URL to send the POST request to.
 * @param {Object} data - The data to be sent in the request body.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const post = async (url, data, params) => {
  try {
    const response = await apiInstance.post(url, data, { params });
    return handleResponse(response);
  } catch (error) {
    handleRequestError(error);
  }
};

/**
 * Perform an HTTP PUT request to the specified URL.
 * @param {string} url - The URL to send the PUT request to.
 * @param {Object} data - The data to be sent in the request body.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const put = async (url, data, params) => {
  try {
    const response = await apiInstance.put(url, data, { params });
    return handleResponse(response);
  } catch (error) {
    handleRequestError(error);
  }
};

/**
 * Perform an HTTP DELETE request to the specified URL.
 * @param {string} url - The URL to send the DELETE request to.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const remove = async (url, params) => {
  try {
    const response = await apiInstance.delete(url, { params });
    return handleResponse(response);
  } catch (error) {
    handleRequestError(error);
  }
};

export { get, post, put, remove };


