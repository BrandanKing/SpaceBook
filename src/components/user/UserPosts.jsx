import React, { useState, useEffect } from 'react';
import { FlatList } from 'native-base';
import { getPosts } from 'services/userService';
import { toastError } from 'utils/toastUtil';
import Post from 'components/layout/Post';

const UserPosts = ({ id, updatePosts, updatePostsState, ...props }) => {
	const [posts, setPosts] = useState([]); // Create a blank state to refresh posts

	const onMount = async () => {
		try {
			const response = await getPosts(id);
			setPosts(response);
		} catch (error) {
			toastError(error);
		}
	};

	useEffect(() => {
		onMount();
	}, []);

	useEffect(() => {
		onMount();
	}, [updatePosts]);

	return (
		<FlatList
			data={posts}
			renderItem={(item) => <Post {...item} id={id} updatePostsState={updatePostsState} />}
			keyExtractor={(item) => item.post_id.toString()}
		/>
	);
};

export default UserPosts;
