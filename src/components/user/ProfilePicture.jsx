import React, { useState, useEffect } from 'react';
import { Skeleton, Avatar } from 'native-base';
import { getProfilePicture } from 'services/userService';
import { toastError } from 'utils/toastUtil';

const ProfilePicture = ({ id, ...props }) => {
	const [profilePic, setProfilePic] = useState(null);

	const onMount = async () => {
		try {
			const response = await getProfilePicture(id);
			let imageURL = URL.createObjectURL(response);
			setProfilePic(imageURL);
		} catch (error) {
			toastError(error);
		}
	};

	useEffect(() => {
		onMount();
	}, []);

	return (
		<Skeleton {...props} isLoaded={profilePic}>
			<Avatar
				source={{
					uri: profilePic,
				}}
				{...props}
			/>
		</Skeleton>
	);
};

export default ProfilePicture;
