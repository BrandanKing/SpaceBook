import { axiosInstance } from 'utils/axiosUtil';

async function get(url, config) {
	try {
		//console.log("GET", url, config)
		let response = await axiosInstance.get(url, config);
		return checkResponse(response);
	} catch (error) {
		console.log('Axios error:', error);
		return {
			responseType: 'EXCEPTION',
			responseMessage: String(error.message || error),
		};
	}
}

async function post(url, data, config = {}) {
	try {
		//console.log("POST", url, config)
		let response = await axiosInstance.post(url, data, config);
		return checkResponse(response);
	} catch (error) {
		console.log('Axios error:', error.response);
		return {
			responseType: 'EXCEPTION',
			responseMessage: error.response.data,
		};
	}
}

function checkResponse(response) {
	if (response.data) {
		return {
			...response.data,
			responseType: 'SUCCESS',
			responseMessage: 'Success',
			// Added an isSuccess property to each response object so we don't have to
			// keep checking the response type is equal to SUCCESS in every component
			isSuccess: response.status === 200 ? true : false,
		};
	}
	return {
		isSuccess: false,
		responseType: 'EXCEPTION',
		responseMessage:
			response.status +
			': ' +
			(!response.statusText || response.statusText === 'undefined'
				? 'Something went wrong'
				: response.statusText),
	};
}

export default {
	get,
	post,
	// put: axiosInstance.put,
	// del,
	// setDefaultHeader,
};
