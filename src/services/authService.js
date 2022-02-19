import AsyncStorage from '@react-native-async-storage/async-storage';
import httpService from 'services/httpService';

export default {
	login,
	register,
	logout,
	getUserFromAsyncStorage,
};

export async function getUserFromAsyncStorage() {
	const user = await AsyncStorage.getItem('@user');
	return JSON.parse(user);
}

export async function saveUserToAsyncStorage(user) {
	return await AsyncStorage.setItem('@user', JSON.stringify(user));
}

export async function login(data) {
	// Send login request, destructure response
	const { id, token, responseType, responseMessage } = await httpService.post(
		'http://localhost:3333/api/1.0.0/login',
		data
	);

	// Create object to split out the user details from the response properties so we
	// don't save the response properties to secure storage.
	const result = {
		user: {
			id,
			token,
		},
		response: { responseType, responseMessage },
	};

	// Save the user into the secure store, if the request failed clear the user
	await saveUserToAsyncStorage(responseType === 'SUCCESS' ? result.user : null);

	// Return our result object
	return result;
}

export async function register(data) {
	const { responseType, responseMessage } = await httpService.post(
		'http://localhost:3333/api/1.0.0/user',
		data
	);
	const result = {
		user: {
			email: data.email,
			password: data.password,
		},
		response: { responseType, responseMessage },
	};
	return result;
}

export async function logout() {
	const { token } = await getUserFromAsyncStorage();
	await httpService.post('http://localhost:3333/api/1.0.0/logout', null, {
		headers: {
			'X-Authorization': token,
		},
	});
	await AsyncStorage.removeItem('@user');
}
