import React, { useState, useEffect } from 'react';
import { Box, FlatList, Button, HStack, Container, Text } from 'native-base';
import ProfilePicture from 'components/user/ProfilePicture';
import userService from 'services/userService';
import { toastError } from 'utils/toastUtil';

const renderItem = ({ item, index }) => {
	return (
		<HStack
			space={3}
			position='relative'
			justifyContent='space-between'
			borderBottomWidth='1'
			_dark={{
				borderColor: 'white',
			}}
			_light={{
				borderColor: 'gray.600',
			}}
			pl='4'
			py='2'>
			<HStack space={3} alignItems='center'>
				<ProfilePicture size='28px' id={8} />
				<Text>{item.user_givenname}</Text>
			</HStack>

			<Button.Group size='sm' isAttached>
				<Button colorScheme='red' variant='ghost' px={1}>
					Edit
				</Button>
				<Button
					colorScheme='unstyled'
					_dark={{
						_text: {
							color: 'white',
						},
					}}
					variant='ghost'
					px={1}>
					View
				</Button>
			</Button.Group>
		</HStack>
	);
};

const FriendsList = (props) => {
	const [friendsList, setFriendsList] = useState([]);

	const onMount = async () => {
		try {
			const response = await userService.getFriends(8);
			setFriendsList(response);
		} catch (error) {
			toastError(error);
		}
	};

	useEffect(() => {
		onMount();
	}, []);
	return (
		<Container>
			{friendsList.length > 0 && (
				<FlatList
					w='100%'
					data={friendsList}
					renderItem={renderItem}
					keyExtractor={(item) => item.user_id.toString()}
				/>
			)}
		</Container>
	);
};

export default FriendsList;
