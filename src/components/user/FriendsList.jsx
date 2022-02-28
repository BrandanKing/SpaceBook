import React, { useState, useEffect } from 'react';
import { Text } from 'native-base';
import userService from 'services/userService';
import { SwipeListView } from 'react-native-swipe-list-view';
import { toastError } from 'utils/toastUtil';

// TODO: Create friend overview component - useable for search, friends & friend requests

const FriendsList = () => {
	const [friendsList, setFriendsList] = useState([]);

	const onMount = async () => {
		try {
			const response = await userService.getFriends(8);
			setFriendsList([...friendsList, response]);
		} catch (error) {
			toastError(error);
		}
	};

	useEffect(() => {
		onMount();
	}, []);

	const renderHiddenItem = (data, rowMap) => <Text>Hidden</Text>;
	const renderItem = ({ item, index }) => <Text key={index}>Test</Text>;

	return (
		<>
			{friendsList.length > 0 && (
				<SwipeListView
					data={friendsList}
					rightOpenValue={-130}
					previewRowKey={'0'}
					previewOpenValue={-40}
					previewOpenDelay={3000}
					renderHiddenItem={renderHiddenItem}
					renderItem={renderItem}
					//keyExtractor={(friend) => friend.user_id.toString()}
				/>
			)}
		</>
	);
};

export default FriendsList;
