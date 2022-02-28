import React, { useState, useLayoutEffect, useCallback } from 'react';
import { ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, Container, VStack, HStack, Heading, Button, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getUser } from 'services/userService';
import { toastError } from 'utils/toastUtil';
import AnimatedSpinner from 'components/animation/AnimatedSpinner';
import UpdateProfile from 'components/user/UpdateProfile';
import AddFriend from 'components/user/AddFriend';

import Body from 'components/layout/Body';
import ProfilePicture from 'components/user/ProfilePicture';

import { useAuth } from 'hooks/useAuth';

const AccountScreen = ({ navigation, route }) => {
	const [user, setUser] = useState(null);
	const [showEditUser, setShowEditUser] = useState(false);

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
							<Button.Group>
								<Button
									onPress={() => {
										navigation.push('Friends', {
											user_id: user_id,
										});
									}}
									flex={1}
									variant='outline'
									colorScheme='darkBlue'
									px={2}
									py={1}>
									Friends
								</Button>
								{user_id === authUser.id ? (
									<Button
										onPress={() => {
											navigation.push('Friend Requests', {
												user_id: user_id,
											});
										}}
										flex={1}
										variant='outline'
										colorScheme='danger'
										px={2}
										py={1}>
										Requests
									</Button>
								) : (
									<AddFriend
										flex={1}
										variant='outline'
										px={2}
										py={1}
										colorScheme='success'
										user={user}>
										Add
									</AddFriend>
								)}
							</Button.Group>
						</VStack>
					</HStack>
				</Container>
			</ScrollView>
		</Body>
	);
};

export default AccountScreen;
