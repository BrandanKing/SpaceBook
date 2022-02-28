import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Icon } from 'native-base';
import { acceptFriendRequest } from 'services/userService';
import { toastError, toastSuccess } from 'utils/toastUtil';

const AcceptFriend = ({ user, index, children, removeRequest, ...props }) => {
	const friendRequest = async () => {
		try {
			const response = await acceptFriendRequest(user.user_id);
			toastSuccess('Friend Added');
			removeRequest(index);
		} catch (error) {
			toastError(error);
		}
	};
	return (
		<Button
			onPress={friendRequest}
			{...props}
			endIcon={<Icon as={MaterialIcons} name='person-add' size='xs' />}>
			{children}
		</Button>
	);
};

export default AcceptFriend;
