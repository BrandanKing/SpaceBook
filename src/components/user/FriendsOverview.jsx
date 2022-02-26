import React, { useState, useEffect } from 'react';
import { Skeleton, Text, Avatar } from 'native-base';
import userService from 'services/userService';
import { toastError } from 'utils/toastUtil';
import ProfilePicture from 'components/user/ProfilePicture';

const FriendsOverview = ({ id, ...props }) => {
	const [friends, setFriends] = useState([]);

	const onMount = async () => {
		try {
			const response = await userService.getFriends(id);
			setFriends(response);
		} catch (error) {
			toastError(error);
		}
	};

	useEffect(() => {
		onMount();
	}, []);

	return (
		<>
			<Skeleton.Text lines={1} isLoaded={!!friends} maxW='100px'>
				<Text fontWeight='bold' fontSize='lg' mb={1} {...props}>
					{friends && friends.length} Friends
				</Text>
			</Skeleton.Text>
			{friends.length > 0 && (
				<Avatar.Group max={3}>
					{friends.slice(0, 8).map((item, index) => {
						return (
							<ProfilePicture
								key={index}
								id={item.user_id}
								alt={item.user_givenname}
								rounded='full'
								borderWidth={1}
								borderWidth='2'
								size='40px'
								_light={{ bg: 'white', borderColor: 'white' }}
								_dark={{ bg: 'dark.50', borderColor: 'dark.50' }}
							/>
						);
					})}
				</Avatar.Group>
			)}
		</>
	);
};

export default FriendsOverview;
