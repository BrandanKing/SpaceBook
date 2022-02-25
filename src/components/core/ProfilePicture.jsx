import React, { useState, useEffect } from 'react';
import { Image } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpService from 'services/httpService';
import { toastError } from 'utils/toastUtil';

const ProfilePicture = ({ id, ...props }) => {
	const [profilePic, setProfilePic] = useState(null);

	useEffect(() => {
		async function getProfilePicture() {
			try {
				const token = await AsyncStorage.getItem('@user_token');
				const response = await httpService.get(
					`http://localhost:3333/api/1.0.0/user/${id}/photo`,
					{
						responseType: 'blob',
						headers: {
							'X-Authorization': token,
						},
					}
				);
				let imageURL = URL.createObjectURL(response);
				setProfilePic(imageURL);
			} catch (error) {
				toastError(error);
			}
		}
		getProfilePicture();
	}, []);

	return (
		<Image
			source={{
				uri: profilePic,
			}}
			{...props}
		/>
	);
};

export default ProfilePicture;
