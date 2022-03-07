import axios from "axios";

async function post(url, data, config = {}) {
	try {
		let response = await axios.post(url, data, config);
		return response.data;
	} catch (error) {
		return isInValidResponse(error.response);
	}
}

async function get(url, config = {}) {
	try {
		let response = await axios.get(url, config);
		return response.data;
	} catch (error) {
		isInValidResponse(error.response);
	}
}

async function getAll(requests) {
	try {
		let data = await requests.map((request) => axios.get(request.url, request.config));
		let response = await axios.all(data);
		return response;
	} catch (error) {
		isInValidResponse(error.response);
	}
}

async function patch(url, data, config = {}) {
	try {
		let response = await axios.patch(url, data, config);
		return response.data;
	} catch (error) {
		return isInValidResponse(error.response);
	}
}

async function del(url, config = {}) {
	try {
		let response = await axios.delete(url, config);
		return response.data;
	} catch (error) {
		console.log(error.response);
		return isInValidResponse(error.response);
	}
}

function isInValidResponse(response) {
	console.log("Axios error:", response);
	throw {
		responseType: "EXCEPTION",
		responseMessage: response.data,
	};
}

export default {
	post,
	get,
	getAll,
	patch,
	del,
};
