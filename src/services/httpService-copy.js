import { axiosInstance } from 'utils/axiosUtil';

async function get(url, config) {
	try {
		let response = await axiosInstance.get(url, config);
		return isValidResponse(response);
	} catch (error) {
		return isInValidResponse(error.response);
	}
}

async function post(url, data, config = {}) {
	try {
		let response = await axiosInstance.post(url, data, config);
		return isValidResponse(response);
	} catch (error) {
		return isInValidResponse(error.response);
	}
}

async function patch(url, data, config = {}) {
	try {
		let response = await axiosInstance.patch(url, data, config);
		return isValidResponse(response);
	} catch (error) {
		return isInValidResponse(error.response);
	}
}

function isValidResponse(response) {
	return {
		...response.data,
		responseType: 'SUCCESS',
		responseMessage: 'Success',
	};
}
function isInValidResponse(response) {
	console.log('Axios error:', response);
	return {
		responseType: 'EXCEPTION',
		responseMessage: response.data,
	};
}

export default {
	get,
	post,
	patch,
};
