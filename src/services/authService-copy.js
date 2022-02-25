import AsyncStorage from '@react-native-async-storage/async-storage';
import httpService from 'services/httpService';

export default {
	login,
	register,
	logout,
	updateUser,
	getUserFromAsyncStorage,
};

export async function getUserFromAsyncStorage() {
	const user = await AsyncStorage.getItem('@user');
	return JSON.parse(user);
}

export async function getUserTokenFromAsyncStorage() {
	const userToken = await AsyncStorage.getItem('@user_token');
	return userToken;
}

export async function saveUserToAsyncStorage(user) {
	return await AsyncStorage.setItem('@user', JSON.stringify(user));
}

export async function saveUserTokenToAsyncStorage(token) {
	return await AsyncStorage.setItem('@user_token', token);
}

export async function login(data) {
	const { id, token, responseType, responseMessage } = await httpService.post(
		'http://localhost:3333/api/1.0.0/login',
		data
	);
	const result = {
		response: { responseType, responseMessage },
	};

	if (responseType != 'SUCCESS') return result;

	await saveUserTokenToAsyncStorage(responseType === 'SUCCESS' ? token : null);
	const { user, response } = await getUser(id, token);

	if (response.responseType != 'SUCCESS') return { response };

	result['user'] = user;

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
	const token = await getUserTokenFromAsyncStorage();
	await httpService.post('http://localhost:3333/api/1.0.0/logout', null, {
		headers: {
			'X-Authorization': token,
		},
	});
	await AsyncStorage.removeItem('@user_token');
	await AsyncStorage.removeItem('@user');
}

export async function getUser(id, token) {
	const { first_name, last_name, email, responseType, responseMessage } = await httpService.get(
		`http://localhost:3333/api/1.0.0/user/${id}`,
		{
			headers: {
				'X-Authorization': token,
			},
		}
	);

	const response = {
		user: {
			id,
			first_name,
			last_name,
			email,
		},
		response: { responseType, responseMessage },
	};
	await saveUserToAsyncStorage(responseType === 'SUCCESS' ? response.user : null);

	return response;
}

export async function updateUser(id, data) {
	const token = await getUserTokenFromAsyncStorage();
	const { responseType, responseMessage } = await httpService.patch(
		`http://localhost:3333/api/1.0.0/user/${id}`,
		data,
		{
			headers: {
				'X-Authorization': token,
			},
		}
	);
	const result = {
		response: { responseType, responseMessage },
	};
	if (responseType != 'SUCCESS') return result;

	const { user, response } = await getUser(id, token);
	if (response.responseType != 'SUCCESS') return { response };
	result['user'] = user;

	return result;
}
