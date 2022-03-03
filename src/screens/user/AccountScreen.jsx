import React, { useCallback, useLayoutEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { Button, Container, HStack, Heading, Icon, ScrollView, VStack } from 'native-base';

import { getUser } from 'services/userService';
import { toastError } from 'utils/toastUtil';
import { useAuth } from 'hooks/useAuth';

import Body from 'components/layout/Body';
import AddFriend from 'components/user/AddFriend';
import AnimatedSpinner from 'components/animation/AnimatedSpinner';
import ProfilePicture from 'components/user/ProfilePicture';
import UpdateProfile from 'components/user/UpdateProfile';
import UpdateProfilePicture from 'components/user/UpdateProfilePicture';
import UserPostInput from 'components/user/UserPostInput';
import UserPosts from 'components/user/UserPosts';

const AccountScreen = ({ navigation, route }) => {
	const [user, setUser] = useState(null);
	const [showEditUser, setShowEditUser] = useState(false);
	const [updatePosts, setUpdatePosts] = useState();

	const { authUser } = useAuth();
	const { user_id } = route.params;

	const onMount = async () => {
		try {
			const response = await getUser(user_id);
			setUser(response);
		} catch (error) {
			toastError(error);
		}
	};

	const onUpdate = (updatedUser) => {
		setUser(updatedUser);
	};

	useFocusEffect(
		useCallback(() => {
			onMount();
			return () => {
				setUser(null);
			};
		}, [])
	);

	useLayoutEffect(() => {
		if (user) {
			navigation.setOptions({
				title: user.first_name + ' ' + user.last_name,
			});
		}
	}, [user]);

	if (!user) return <AnimatedSpinner />;

	return (
		<Body>
			<ScrollView w='100%'>
				{user_id === authUser.id && (
					<UpdateProfile
						showEditUser={showEditUser}
						onClose={setShowEditUser}
						user={user}
						onSave={onUpdate}
					/>
				)}
				<Container mt='4'>
					<ImageBackground
						resizeMode='cover'
						source={require('assets/nightsky.jpg')}
						style={{
							height: '150px',
							width: '100%',
							borderTopRightRadius: '18px',
							borderTopLeftRadius: '18px',
							overflow: 'hidden',
						}}></ImageBackground>
					<HStack space={2} w='100%'>
						{user_id === authUser.id ? (
							<UpdateProfilePicture id={user_id}>
								<ProfilePicture
									id={user_id}
									alt='Profile Picture'
									rounded='full'
									borderWidth={1}
									size='100px'
									mt='-50px'
									borderWidth='4'
									_light={{ bg: 'white', borderColor: 'white' }}
									_dark={{ bg: 'dark.50', borderColor: 'dark.50' }}
								/>
							</UpdateProfilePicture>
						) : (
							<ProfilePicture
								id={user_id}
								alt='Profile Picture'
								rounded='full'
								borderWidth={1}
								size='100px'
								mt='-50px'
								borderWidth='4'
								_light={{ bg: 'white', borderColor: 'white' }}
								_dark={{ bg: 'dark.50', borderColor: 'dark.50' }}
							/>
						)}
						<VStack space={2} flex={1} mt={user_id === authUser.id ? '-32px' : '-24px'}>
							<HStack
								alignItems='center'
								alignItems='center'
								justifyContent='space-between'>
								<Heading color='white' fontSize='lg' isTruncated maxWidth='150px'>
									{user.first_name + ' ' + user.last_name}
								</Heading>
								{user_id === authUser.id && (
									<Icon
										as={MaterialCommunityIcons}
										name='account-edit'
										color='white'
										size='32px'
										onPress={() => setShowEditUser(true)}
									/>
								)}
							</HStack>
							<Button.Group isAttached>
								<Button
									py={1.5}
									_text={{ color: 'white' }}
									colorScheme='darkBlue'
									onPress={() => {
										navigation.push('Friends', {
											user_id: user_id,
										});
									}}>
									Friends
								</Button>
								{user_id === authUser.id ? (
									<Button
										py={1.5}
										onPress={() => {
											navigation.push('Friend Requests', {
												user_id: user_id,
											});
										}}
										colorScheme='danger'>
										Requests
									</Button>
								) : (
									<AddFriend py={1.5} colorScheme='success' user={user}>
										Add
									</AddFriend>
								)}
							</Button.Group>
						</VStack>
					</HStack>
					<VStack space={2} mt={4} w='100%'>
						<UserPostInput id={user_id} updatePostsState={setUpdatePosts} />
						<UserPosts
							id={user_id}
							updatePosts={updatePosts}
							updatePostsState={setUpdatePosts}
						/>
					</VStack>
				</Container>
			</ScrollView>
		</Body>
	);
};

export default AccountScreen;
