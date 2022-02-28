import React, { useState, useEffect } from 'react';
import { FlatList, Container, Heading } from 'native-base';
import { toastError } from 'utils/toastUtil';
import { getFriends } from 'services/userService';

import AnimatedSpinner from 'components/animation/AnimatedSpinner';
import Body from 'components/layout/Body';
import FriendDisplay from 'components/layout/FriendDisplay';

const FriendsListScreen = ({ navigation, route }) => {
	const { user_id } = route.params;
	const [friendsList, setFriendsList] = useState([]);
	const [hasSearched, setHasSearched] = useState(false);

	const onMount = async () => {
		try {
			const response = await getFriends(user_id);
			setFriendsList(response);
		} catch (error) {
			toastError(error);
		}
		setHasSearched(true);
	};

	useEffect(() => {
		onMount();
	}, []);

	if (!hasSearched) return <AnimatedSpinner />;

	return (
		<Body>
			<Container mt={4}>
				{friendsList.length > 0 ? (
					<FlatList
						w='100%'
						data={friendsList}
						renderItem={(item) => <FriendDisplay {...item} />}
						keyExtractor={(item) => item.user_id.toString()}
					/>
				) : (
					<Heading>Currently no friends</Heading>
				)}
			</Container>
		</Body>
	);
};
export default FriendsListScreen;
