import React from "react";
import { Button, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { toastError, toastSuccess } from "utils/toastUtil";
import { acceptFriendRequest } from "services/userService";

const AcceptFriend = ({ user, index, children, removeRequest, ...props }) => {
	const acceptRequest = async () => {
		try {
			await acceptFriendRequest(user.user_id);
			toastSuccess("Friend Added");
			removeRequest(index);
		} catch (error) {
			toastError(error);
		}
	};
	return (
		<Button
			onPress={acceptRequest}
			endIcon={<Icon as={MaterialIcons} name="person-add" size="xs" />}
			{...props}>
			{children}
		</Button>
	);
};

export default AcceptFriend;
