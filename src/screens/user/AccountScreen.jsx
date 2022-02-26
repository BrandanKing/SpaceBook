import React, { useState, useLayoutEffect } from 'react';
import { ImageBackground } from 'react-native';
import { ScrollView, Container, VStack, HStack, Heading, Button, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from 'hooks/useAuth';
import Body from 'components/layout/Body';
import ProfilePicture from 'components/user/ProfilePicture';
import UpdateProfile from 'components/user/UpdateProfile';
import FriendsOverview from 'components/user/FriendsOverview';
import FriendsList from 'components/user/FriendsList';

const AccountScreen = ({ navigation }) => {
	const [showModal, setShowModal] = useState(false);
	const { user } = useAuth();

	useLayoutEffect(() => {
		if (user) {
			navigation.setOptions({
				title: user.first_name + ' ' + user.last_name,
			});
		}
	}, [navigation, user]);

	return (
		<Body flex={1} w='100%'>
			<ScrollView w='100%'>
				<Container mt='4'>
					<ImageBackground
						resizeMode='cover'
						source={require('assets/nightsky.jpg')}
						style={{
							height: '200px',
							width: '100%',
							borderTopRightRadius: '18px',
							borderTopLeftRadius: '18px',
							overflow: 'hidden',
						}}></ImageBackground>
					<VStack space={2} w='100%' alignItems='center'>
						{user && (
							<>
								<ProfilePicture
									id={user.user_id}
									alt='Profile Picture'
									rounded='full'
									borderWidth={1}
									size='150px'
									mt='-75px'
									borderWidth='4'
									_light={{ bg: 'white', borderColor: 'white' }}
									_dark={{ bg: 'dark.50', borderColor: 'dark.50' }}
								/>
								<Heading>{user.first_name + ' ' + user.last_name}</Heading>
								<FriendsOverview id={user.user_id} />
							</>
						)}
					</VStack>
					<HStack space={2} w='100%' mt={2} justifyContent='center'>
						<Button
							_light={{ bg: 'white', _text: { color: 'darkBlue.700' } }}
							_dark={{ _text: { color: 'white' } }}
							_pressed={{ bg: 'darkBlue.700', _text: { color: 'white' } }}
							variant='ghost'
							colorSheme='darkBlue'
							onPress={() => setShowModal(true)}
							leftIcon={
								<Icon as={MaterialCommunityIcons} name='account-edit' size='sm' />
							}>
							Edit Profile
						</Button>
						<UpdateProfile showModal={showModal} onClose={setShowModal} />
					</HStack>
					<ScrollView showsVerticalScrollIndicator={false}>
						<FriendsList />
					</ScrollView>
				</Container>
			</ScrollView>
		</Body>
	);
};

export default AccountScreen;
