import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Icon } from 'native-base';
import { rejectFriendRequest } from 'services/userService';
import { toastError } from 'utils/toastUtil';

const RejectFriend = ({ user, index, children, removeRequest, ...props }) => {
	const friendRequest = async () => {
		try {
			const response = await rejectFriendRequest(user.user_id);
			toastError('Friend request rejected');
			removeRequest(index);
		} catch (error) {
			toastError(error);
		}
	};
	return (
		<Button
			onPress={friendRequest}
			{...props}
			endIcon={<Icon as={MaterialIcons} name='person-remove' size='xs' />}>
			{children}
		</Button>
	);
};

export default RejectFriend;
