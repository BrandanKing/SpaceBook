import React from 'react';
import { ImageBackground } from 'react-native';
import { Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
	Center,
	Container,
	Heading,
	Text,
	Link,
	FormControl,
	Input,
	Button,
	VStack,
	HStack,
	Icon,
	KeyboardAvoidingView,
	Factory,
	ScrollView,
	Box,
} from 'native-base';

const RegisterScreen = ({ navigation }) => {
	const BackgroundImage = Factory(ImageBackground);
	return (
		<KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<BackgroundImage
					resizeMode='cover'
					source={require('../assets/background.png')}
					w='100%'
					flex={1}
					bg='darkBlue.900'>
					<Center flex={1}>
						<Box maxWidth={375} alignItems='center'>
							<Container w='100%' safeArea my={3}>
								<ScrollView>
									<Icon
										as={MaterialCommunityIcons}
										size='xl'
										name='space-invaders'
										color='white'
									/>
									<Heading>Welcome to SpaceBook</Heading>
									<Text fontWeight='700' mt={4}>
										Register to continue!
									</Text>
									<VStack space={4} mt={4} alignItems='center' w='100%'>
										<FormControl isRequired isInvalid>
											<FormControl.Label>First Name</FormControl.Label>
											<Input placeholder='Enter first name' />
											<FormControl.ErrorMessage>
												Please enter your first name
											</FormControl.ErrorMessage>
										</FormControl>
										<FormControl isRequired isInvalid>
											<FormControl.Label>Last Name</FormControl.Label>
											<Input placeholder='Enter last name' />
											<FormControl.ErrorMessage>
												Please enter your last name
											</FormControl.ErrorMessage>
										</FormControl>
										<FormControl isRequired isInvalid>
											<FormControl.Label>Email Address</FormControl.Label>
											<Input placeholder='Enter email address' />
											<FormControl.ErrorMessage>
												Please enter an email address
											</FormControl.ErrorMessage>
										</FormControl>
										<FormControl isRequired isInvalid>
											<FormControl.Label>Password</FormControl.Label>
											<Input placeholder='Enter password' />
											<FormControl.ErrorMessage>
												Please enter a password
											</FormControl.ErrorMessage>
										</FormControl>
									</VStack>
									<Button mt='4'>Register</Button>
									<HStack mt='6' justifyContent='center'>
										<Text fontSize='sm' color='white'>
											Already have an account.{' '}
										</Text>
										<Link
											_text={{
												color: 'primary.300',
												fontWeight: 'bold',
												fontSize: 'sm',
												textDecoration: 'none',
											}}
											onPress={() => {
												navigation.navigate('Login');
											}}>
											Sign In
										</Link>
									</HStack>
								</ScrollView>
							</Container>
						</Box>
					</Center>
				</BackgroundImage>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default RegisterScreen;
