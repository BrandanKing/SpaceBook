import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon } from 'native-base';
import { toastError, toastSuccess } from 'utils/toastUtil';
import { addLike, deleteLike } from 'services/userService';

const LikePost = ({ id, post_id }) => {
	const likePost = async () => {
		try {
			await addLike(id, post_id);
			toastSuccess('Post Liked');
		} catch (error) {
			toastError(error);
		}
	};
	const removeLike = async () => {
		try {
			await deleteLike(id, post_id);
			toastSuccess('Like Removed');
		} catch (error) {
			toastError(error);
		}
	};

	return (
		<>
			<Icon as={MaterialCommunityIcons} name='heart-plus' size='sm' onPress={likePost} />
			<Icon as={MaterialCommunityIcons} name='heart-minus' size='sm' onPress={removeLike} />
		</>
	);
};

export default LikePost;
