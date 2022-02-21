import React, { useLayoutEffect } from 'react';
import { Platform, ImageBackground } from 'react-native';
import { Image, ScrollView, Container, VStack, HStack, Skeleton } from 'native-base';
import AnimatedSpinner from 'components/animation/AnimatedSpinner';
import Body from 'components/layout/Body';
import { useAuth } from 'hooks/useAuth';
const AccountScreen = ({ navigation }) => {
	const { user, isAuthLoading } = useAuth();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: user.first_name + ' ' + user.last_name,
		});
	}, [navigation]);
	console.log(user);
	return (
		<Body flex={1} w='100%'>
			<ScrollView w='100%'>
				<ImageBackground
					resizeMode='cover'
					source={require('assets/nightsky.jpg')}
					style={{ height: '200px', width: '100%' }}></ImageBackground>
				<Container>
					<VStack space={6} w='100%' alignItems='center'>
						<Skeleton
							borderWidth={1}
							borderColor='coolGray.200'
							endColor='warmGray.50'
							size='20'
							rounded='full'
							mt='-50'
						/>
						<HStack space='2'>
							<Skeleton size='5' rounded='full' />
							<Skeleton size='5' rounded='full' />
							<Skeleton size='5' rounded='full' />
							<Skeleton size='5' rounded='full' />
							<Skeleton size='5' rounded='full' />
						</HStack>
						<Skeleton.Text lines={3} alignItems='center' px='12' />
						<Skeleton mb='3' w='40' rounded='20' />
					</VStack>
				</Container>
			</ScrollView>
		</Body>
	);
};

export default AccountScreen;
