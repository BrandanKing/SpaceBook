import React, { useState, useEffect } from "react";
import { FlatList, Heading } from "native-base";
import { getPosts } from "services/userService";
import { toastError } from "utils/toastUtil";
import Post from "components/user/posts/Post";

const Posts = ({ id, posts, setPosts }) => {
	const [currentPosts, setCurrentPosts] = useState([]); // Create a blank state to refresh posts
	const [isSearching, setIsSearching] = useState(false);

	const onMount = async () => {
		try {
			const response = await getPosts(id);
			setCurrentPosts(response);
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
	}, [posts]);

	if (!isSearching) return <></>;

	return (
		<>
			{currentPosts.length > 0 ? (
				<FlatList
					data={currentPosts}
					renderItem={(item) => <Post {...item} id={id} setPosts={setPosts} />}
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

export default Posts;
