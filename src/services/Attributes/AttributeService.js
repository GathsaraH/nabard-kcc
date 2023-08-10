import { UrlConstants } from "src/constants/UrlConstants";
import { get } from "src/services/apiService";

/**
 * Gets all state from the API.
 * @returns {Object} - An object containing the API response status and data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function getAllStateApi() {
  try {
    // Make a POST request to the API to check if the email exists
    const response = await get(`${UrlConstants.GET_ALL_STATE}`);
    if (response.dataList) {
        const convertedArray = response.dataList.map(item => {
            return {
              value: item.id,
              label: item.name,
            };
          });
          
      return { status: response.status, data: convertedArray };
    } else {
      return { status: response.status, data: response.dataList };
    }
    // Return a structured response object containing the API status and data
  } catch (error) {
    // Rethrow any error that occurs during the API request
    throw error;
  }
}


/**
 * Gets all district by state id from the API.
 * @param {String} stateId  - The id of the state.
 * @returns {Object} - An object containing the API response status and data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function getAllDistrictApi(stateId) {
  try {
    // Make a POST request to the API to check if the email exists
    const response = await get(`${UrlConstants.GET_DISTRICT_BY_STATE_ID}/${stateId}/districts/v2`);
    if (response.dataList) {
        const convertedArray = response.dataList.map(item => {
            return {
              value: item.id, 
              label: item.name,
            };
          });
          
      return { status: response.status, data: convertedArray };
    } else {
      return { status: response.status, data: response.dataList };
    }
    // Return a structured response object containing the API status and data
  } catch (error) {
    // Rethrow any error that occurs during the API request
    throw error;
  }
}


/**
 * Gets all sub district by district id from the API.
 * @param {String} districtId  - The id of the district.
 * @returns {Object} - An object containing the API response status and data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function getAllSubDistrictApi(districtId) {
  try {
    // Make a POST request to the API to check if the email exists
    const response = await get(`${UrlConstants.GET_SUB_DISTRICT_BY_DISTRICT_ID}/${districtId}/sub-districts?search=`);
    if (response.dataList) {
        const convertedArray = response.dataList.map(item => {
            return {
              value: item.id,
              label: item.name,
            };
          });
          
      return { status: response.status, data: convertedArray };
    } else {
      return { status: response.status, data: response.dataList };
    }
    // Return a structured response object containing the API status and data
  } catch (error) {
    // Rethrow any error that occurs during the API request
    throw error;
  }
}



/**
 * Gets all village by sub district id from the API.
 * @param {String} subDistrictId  - The id of the sub district.
 * @returns {Object} - An object containing the API response status and data.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function getAllVillageApi(subDistrictId) {
  try {
    // Make a POST request to the API to check if the email exists
    const response = await get(`${UrlConstants.GET_VILLAGES_BY_SUB_DISTRICT}/${subDistrictId}/villages?search=`);
    if (response.dataList) {
        const convertedArray = response.dataList.map(item => {
            return {
              value: item.id,
              label: item.name,
            };
          });
          
      return { status: response.status, data: convertedArray };
    } else {
      return { status: response.status, data: response.dataList };
    }
    // Return a structured response object containing the API status and data
  } catch (error) {
    // Rethrow any error that occurs during the API request
    throw error;
  }
}
