import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatList, Container, Heading, Text, FormControl, Icon, Input } from 'native-base';

import { toastError } from 'utils/toastUtil';
import { getFriends, search } from 'services/userService';

import Body from 'components/layout/Body';
import AnimatedSpinner from 'components/animation/AnimatedSpinner';
import FriendDisplay from 'components/layout/FriendDisplay';

const FriendsListScreen = ({ navigation, route }) => {
	const { user_id } = route.params;
	const [friendsList, setFriendsList] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const { control, handleSubmit, formState } = useForm();
	const { errors, isSubmitting } = formState;

	const onMount = async () => {
		try {
			const response = await getFriends(user_id);
			setFriendsList(response);
		} catch (error) {
			toastError(error);
		}
		setIsSearching(true);
	};

	const searchFriends = async (data) => {
		try {
			const response = await search(data.query, 'friends');
			setSearchQuery(data.query);
			setFriendsList(response);

			if (response.length <= 0) {
				throw 'No results found for ' + data.query;
			}
		} catch (error) {
			toastError(error);
		}
	};

	useEffect(() => {
		onMount();
	}, []);

	if (!isSearching || isSubmitting) return <AnimatedSpinner />;

	return (
		<Body>
			<Container mt={4}>
				<FormControl isRequired isInvalid={'query' in errors}>
					<Controller
						control={control}
						name='query'
						defaultValue=''
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder='Search'
								onChangeText={onChange}
								onBlur={onBlur}
								value={value}
								InputRightElement={
									<Icon
										onPress={handleSubmit(searchFriends)}
										as={MaterialIcons}
										name='search'
										size={5}
										m={2}
									/>
								}
							/>
						)}
						rules={{
							required: 'Please enter before submitting',
						}}
					/>
					<FormControl.ErrorMessage>{errors.query?.message}</FormControl.ErrorMessage>
				</FormControl>
				{searchQuery && (
					<Text mt={2} key='searchResultsTest'>
						Search Results for <Text bold>{searchQuery}</Text>
					</Text>
				)}
				{friendsList.length > 0 ? (
					<FlatList
						w='100%'
						data={friendsList}
						renderItem={(item) => <FriendDisplay {...item} />}
						keyExtractor={(item) => item.user_id.toString()}
					/>
				) : (
					<Heading mt={2} fontSize='lg'>
						No Friends Found
					</Heading>
				)}
			</Container>
		</Body>
	);
};
export default FriendsListScreen;
