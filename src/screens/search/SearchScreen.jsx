import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, FlatList, VStack, Input, Icon, FormControl, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { toastError } from 'utils/toastUtil';
import { search } from 'services/userService';
import AnimatedSpinner from 'components/animation/AnimatedSpinner';
import Body from 'components/layout/Body';
import FriendDisplay from 'components/layout/FriendDisplay';
import AddFriend from 'components/user/AddFriend';

const SearchScreen = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const { control, handleSubmit, formState } = useForm();
	const { errors, isSubmitting } = formState;

	const onSubmit = async (data) => {
		try {
			const response = await search(data.query);
			setSearchQuery(data.query);
			setSearchResults(response);

			if (response.length <= 0) {
				throw 'No results found for ' + data.query;
			}
		} catch (error) {
			toastError(error);
		}
	};

	return (
		<Body>
			{isSubmitting && <AnimatedSpinner />}
			<Container>
				<VStack space={2} flex={1} w='100%' mt={4}>
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
											onPress={handleSubmit(onSubmit)}
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
					{searchResults.length > 0 && (
						<>
							<Text key='searchResultsTest'>
								Search Results for <Text bold>{searchQuery}</Text>
							</Text>
							<FlatList
								w='100%'
								data={searchResults}
								renderItem={(item) => (
									<FriendDisplay
										{...item}
										renderedButtons={
											<AddFriend colorScheme='success' user={item.item}>
												Add
											</AddFriend>
										}
									/>
								)}
								keyExtractor={(item) => item.user_id.toString()}
							/>
						</>
					)}
				</VStack>
			</Container>
		</Body>
	);
};

export default SearchScreen;
