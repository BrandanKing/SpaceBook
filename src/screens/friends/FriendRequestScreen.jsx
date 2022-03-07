import React, { useState, useEffect } from "react";

import { FlatList, Container, Heading, Button } from "native-base";

import { toastError } from "utils/toastUtil";
import { getFriendRequests } from "services/userService";

import Body from "components/layout/Body";
import AnimatedSpinner from "components/animation/AnimatedSpinner";
import FriendDisplay from "components/layout/FriendDisplay";
import AcceptFriend from "components/user/AcceptFriend";
import RejectFriend from "components/user/RejectFriend";

const FriendRequestScreen = () => {
	const [requestList, setRequestList] = useState([]);
	const [hasSearched, setHasSearched] = useState(false);

	const removeRequest = (index) => {
		const newData = [...requestList];
		newData.splice(index, 1);
		setRequestList(newData);
	};

	const onMount = async () => {
		try {
			const response = await getFriendRequests();
			setRequestList(response);
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
				{requestList.length > 0 ? (
					<FlatList
						w="100%"
						data={requestList}
						extraData={requestList}
						renderItem={(item) => (
							<FriendDisplay
								{...item}
								requests={true}
								renderedButtons={
									<Button.Group>
										<RejectFriend
											{...item}
											colorScheme="danger"
											user={item.item}
											removeRequest={removeRequest}></RejectFriend>
										<AcceptFriend
											{...item}
											colorScheme="success"
											user={item.item}
											removeRequest={removeRequest}></AcceptFriend>
									</Button.Group>
								}
							/>
						)}
						keyExtractor={(item) => item.user_id.toString()}
					/>
				) : (
					<Heading>Currently no pending friend requests</Heading>
				)}
			</Container>
		</Body>
	);
};
export default FriendRequestScreen;
