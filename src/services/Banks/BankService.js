import { UrlConstants } from "src/constants/UrlConstants";
import { get , post } from "../apiService";


/**
 * Retrieves a list of all bank types from the API.
 * @returns {Promise<{ response: Array<{ id: number, name: string }> }>} A structured response object with the API status and data.
 * @throws {Error} If an error occurs during the API request.
 */
export async function getAllBankTypeApi() {
    try {
      // Make a POST request to the API to check if the email exists
      const response = await get(`${UrlConstants.GET_ALL_BANK_TYPE}`);
      if (response) {
          // const convertedArray = response.map(item => {
          //     return {
          //       id: item.id,
          //       name: item.name,
          //     };
          //   });
          const formattedData = response.map(item => ({ id: item.id, name: item.name }));    
        return {response: formattedData };
      } else {
        return { response: response };
      }
      // Return a structured response object containing the API status and data
    } catch (error) {
      // Rethrow any error that occurs during the API request
      throw error;
    }
  }
  /**
 * Retrieves a list of all bank names from the API.
 * @returns {Promise<{ response: Array<{ id: number, name: string }> }>} A structured response object with the API status and data.
 * @throws {Error} If an error occurs during the API request.
 */
  export async function getAllBankNameApi() {
    try {
      // Make a POST request to the API to check if the email exists
      const response = await get(`${UrlConstants.GET_ALL_BANK_NAME}`);
      if (response) {
          // const convertedArray = response.map(item => {
          //     return {
          //       id: item.id,
          //       name: item.name,
          //     };
          //   });
          const formattedData = response.map(item => ({ id: item.id, name: item.name }));    
            
        return {response: formattedData };
      } else {
        return { response: response.data };
      }
      // Return a structured response object containing the API status and data
    } catch (error) {
      // Rethrow any error that occurs during the API request
      throw error;
    }
  }

/**
 * Adds or creates bank hierarchy using the provided data.
 * @param {Object} bankData - The data for creating the bank hierarchy.
 * @returns {Promise<{ status: number, data: any }>} A structured response object with the API status and data.
 * @throws {Error} If an error occurs during the API request.
 */
  export async function addBankMastersApi(bankData) {
    try{
        // make a POST request to add or create bank hierarchy 
        const response = await post(`${UrlConstants.ADD_BANK}` , bankData)
         // Return a structured response object containing the API status and data
    return { status: response.status, data: response };
    }
    catch (error){
      throw error ;
      // Rethrow any error that occurs during API request
    }
  }