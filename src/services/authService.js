import AsyncStorage from '@react-native-async-storage/async-storage';
import httpService from 'services/httpService';

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
	try {
		const { id, token } = await httpService.post('http://localhost:3333/api/1.0.0/login', data);
		const user = await httpService.get(`http://localhost:3333/api/1.0.0/user/${id}`, {
			headers: {
				'X-Authorization': token,
			},
		});

		await saveUserTokenToAsyncStorage(token);
		await saveUserToAsyncStorage(user);
		return user;
	} catch (error) {
		throw error.responseMessage;
	}
}

export async function register(data) {
	try {
		await httpService.post('http://localhost:3333/api/1.0.0/user', data);
		return true;
	} catch (error) {
		throw error.responseMessage;
	}
}

export async function updateUser(data) {
	try {
		const token = await getUserTokenFromAsyncStorage();
		const user = await getUserFromAsyncStorage();
		await httpService.patch(`http://localhost:3333/api/1.0.0/user/${user.user_id}`, data, {
			headers: {
				'X-Authorization': token,
			},
		});
		const updatedUser = Object.assign(user, data);
		await saveUserToAsyncStorage(updatedUser);
		return updatedUser;
	} catch (error) {
		throw error.responseMessage;
	}
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

export default {
	login,
	register,
	updateUser,
	logout,
	getUserFromAsyncStorage,
	getUserTokenFromAsyncStorage,
};
