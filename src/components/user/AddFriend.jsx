import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { addFriend } from 'services/userService';
import { toastError, toastSuccess } from 'utils/toastUtil';
import { Button, Icon } from 'native-base';

const AddFriend = ({ user, ...props }) => {
	const friendRequest = async () => {
		try {
			const response = await addFriend(user.user_id);
			toastSuccess(response);
		} catch (error) {
			toastError(error);
		}
	};
	return (
		<Button
			{...props}
			onPress={friendRequest}
			endIcon={<Icon as={MaterialIcons} name='person-add' size='xs' />}>
			{props.children}
		</Button>
	);
};

export default AddFriend;
