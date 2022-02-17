import React from 'react';
import { Center, Container, Heading, Text } from 'native-base';

const LoginScreen = () => {
	return (
		<Center w='100%' flex={1} safeArea bg='darkBlue.900'>
			<Container>
				<Heading color='white'>Welcome to SpaceBook</Heading>
				<Text mt='2' color='white'>
					Sign in to continue!
				</Text>
			</Container>
		</Center>
	);
};

export default LoginScreen;
