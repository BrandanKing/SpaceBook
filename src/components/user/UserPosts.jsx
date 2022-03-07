import React, { useState, useEffect } from "react";
import { FlatList, Heading } from "native-base";
import { getPosts } from "services/userService";
import { toastError } from "utils/toastUtil";
import Post from "components/layout/Post";

const UserPosts = ({ id, updatePosts, updatePostsState }) => {
	const [posts, setPosts] = useState([]); // Create a blank state to refresh posts
	const [isSearching, setIsSearching] = useState(false);

	const onMount = async () => {
		try {
			const response = await getPosts(id);
			setPosts(response);
		} catch (error) {
			toastError(error);
		}
		setIsSearching(true);
	};

	useEffect(() => {
		onMount();
	}, []);

	useEffect(() => {
		onMount();
	}, [updatePosts]);
	if (!isSearching) return <></>;

	return (
		<>
			{posts.length > 0 ? (
				<FlatList
					data={posts}
					renderItem={(item) => (
						<Post {...item} id={id} updatePostsState={updatePostsState} />
					)}
					keyExtractor={(item) => item.post_id.toString()}
				/>
			) : (
				<Heading mt={2} fontSize="lg">
					No Posts Found
				</Heading>
			)}
		</>
	);
};

export default UserPosts;
