import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

import authService from "services/authService";
import httpService from "services/httpService";

export async function saveDraftPost(draft) {
	const date = format(new Date(), "Pp");
	draft["date"] = date;

	let drafts = await getDraftPost();
	drafts.push(draft);

	drafts.sort(function (a, b) {
		return new Date(b.date) - new Date(a.date);
	});

	return await AsyncStorage.setItem("@user_drafts", JSON.stringify(drafts));
}

export async function getDraftPost() {
	const drafts = await AsyncStorage.getItem("@user_drafts");
	return drafts ? JSON.parse(drafts) : [];
}

export async function getProfilePicture(id) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const response = await httpService.get(`http://localhost:3333/api/1.0.0/user/${id}/photo`, {
			responseType: "blob",
			headers: {
				"X-Authorization": token,
			},
		});
		return response;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function updateProfilePicture(id, data) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const response = await httpService.post(
			`http://localhost:3333/api/1.0.0/user/${id}/photo`,
			data,
			{
				headers: {
					"Content-Type": "image/png",
					"X-Authorization": token,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function addFriend(user_id) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const response = await httpService.post(
			`http://localhost:3333/api/1.0.0/user/${user_id}/friends`,
			null,
			{
				headers: {
					"X-Authorization": token,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function getFriends(id) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const response = await httpService.get(
			`http://localhost:3333/api/1.0.0/user/${id}/friends`,
			{
				headers: {
					"X-Authorization": token,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function getFriendRequests() {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const response = await httpService.get(`http://localhost:3333/api/1.0.0/friendrequests`, {
			headers: {
				"X-Authorization": token,
			},
		});
		return response;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function acceptFriendRequest(user_id) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const response = await httpService.post(
			`http://localhost:3333/api/1.0.0/friendrequests/${user_id}`,
			null,
			{
				headers: {
					"X-Authorization": token,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function rejectFriendRequest(user_id) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const response = await httpService.del(
			`http://localhost:3333/api/1.0.0/friendrequests/${user_id}`,
			{
				headers: {
					"X-Authorization": token,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function getUser(user_id) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const user = await httpService.get(`http://localhost:3333/api/1.0.0/user/${user_id}`, {
			headers: {
				"X-Authorization": token,
			},
		});
		return user;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function search(query, searchIn = "all", limit = 10, offset = 0) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const user = await httpService.get(`http://localhost:3333/api/1.0.0/search`, {
			headers: {
				"X-Authorization": token,
			},
			params: {
				q: query,
				search_in: searchIn,
				limit: limit,
				offset: offset,
			},
		});
		return user;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function addPost(user_id, data) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const response = await httpService.post(
			`http://localhost:3333/api/1.0.0/user/${user_id}/post`,
			data,
			{
				headers: {
					"X-Authorization": token,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function getPosts(user_id) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const response = await httpService.get(
			`http://localhost:3333/api/1.0.0/user/${user_id}/post`,
			{
				headers: {
					"X-Authorization": token,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function getPost(user_id, post_id) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const response = await httpService.get(
			`http://localhost:3333/api/1.0.0/user/${user_id}/post/${post_id}`,
			{
				headers: {
					"X-Authorization": token,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function updatePost(user_id, post_id, data) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const response = await httpService.patch(
			`http://localhost:3333/api/1.0.0/user/${user_id}/post/${post_id}`,
			data,
			{
				headers: {
					"X-Authorization": token,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function deletePost(user_id, post_id) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const response = await httpService.del(
			`http://localhost:3333/api/1.0.0/user/${user_id}/post/${post_id}`,
			{
				headers: {
					"X-Authorization": token,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function addLike(user_id, post_id) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const response = await httpService.post(
			`http://localhost:3333/api/1.0.0/user/${user_id}/post/${post_id}/like`,
			null,
			{
				headers: {
					"X-Authorization": token,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export async function deleteLike(user_id, post_id) {
	try {
		const { token } = await authService.getUserFromAsyncStorage();
		const response = await httpService.del(
			`http://localhost:3333/api/1.0.0/user/${user_id}/post/${post_id}/like`,
			{
				headers: {
					"X-Authorization": token,
				},
			}
		);
		return response;
	} catch (error) {
		console.log("HTTP error:", error);
		throw error.responseMessage;
	}
}

export default {
	getProfilePicture,
	updateProfilePicture,
	getFriends,
	addFriend,
	getFriendRequests,
	acceptFriendRequest,
	rejectFriendRequest,
	getUser,
	search,

	// Post Management
	addPost,
	getPosts,
	getPost,
	updatePost,
	deletePost,
	addLike,
	deleteLike,

	// Draft
	saveDraftPost,
	getDraftPost,
};
