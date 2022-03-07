import React, { useEffect, useState } from "react";
import { Avatar, Skeleton } from "native-base";

import { getProfilePicture } from "services/userService";
import { toastError } from "utils/toastUtil";

const ProfilePicture = ({ id, pic_updated, ...props }) => {
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

	useEffect(() => {
		onMount();
	}, [pic_updated]);

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
