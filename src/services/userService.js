import httpService from 'services/httpService';
import authService from 'services/authService';

export async function getProfilePicture(id) {
	try {
		const token = await authService.getUserTokenFromAsyncStorage();
		const response = await httpService.get(`http://localhost:3333/api/1.0.0/user/${id}/photo`, {
			responseType: 'blob',
			headers: {
				'X-Authorization': token,
			},
		});
		return response;
	} catch (error) {
		throw 'Unathorized';
	}
}

export async function getFriends(id) {
	try {
		const token = await authService.getUserTokenFromAsyncStorage();
		const response = await httpService.get(
			`http://localhost:3333/api/1.0.0/user/${id}/friends`,
			{
				headers: {
					'X-Authorization': token,
				},
			}
		);
		return response;
	} catch (error) {
		console.log(error);
		throw 'Unathorized';
	}
}

export default {
	getProfilePicture,
	getFriends,
};
