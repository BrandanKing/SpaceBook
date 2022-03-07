import AsyncStorage from "@react-native-async-storage/async-storage";
import httpService from "services/httpService";

export async function saveUserToAsyncStorage(user) {
	return await AsyncStorage.setItem("@user", JSON.stringify(user));
}

export async function getUserFromAsyncStorage() {
	const user = await AsyncStorage.getItem("@user");
	return JSON.parse(user);
}

export async function login(data) {
	try {
		const user = await httpService.post("http://localhost:3333/api/1.0.0/login", data);
		await saveUserToAsyncStorage(user);
		return user;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function register(data) {
	try {
		await httpService.post("http://localhost:3333/api/1.0.0/user", data);
		return true;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function updateUser(data) {
	try {
		const { id, token } = await getUserFromAsyncStorage();
		await httpService.patch(`http://localhost:3333/api/1.0.0/user/${id}`, data, {
			headers: {
				"X-Authorization": token,
			},
		});
		return true;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function logout() {
	const { token } = await getUserFromAsyncStorage();
	await httpService.post("http://localhost:3333/api/1.0.0/logout", null, {
		headers: {
			"X-Authorization": token,
		},
	});
	await AsyncStorage.removeItem("@user");
}

export default {
	login,
	register,
	updateUser,
	logout,
	getUserFromAsyncStorage,
};
