import React, { useState, useContext } from 'react';
import { ImageBackground } from 'react-native';
import { Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {
	KeyboardAvoidingView,
	ScrollView,
	Box,
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
	useToast,
} from 'native-base';
import { AuthContext } from '../constants/index';
const LoginScreen = ({ navigation }) => {
	const [show, setShow] = useState(false);
	const toast = useToast();

	const { signIn } = useContext(AuthContext);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		signIn(data);
	};

	return (
		<KeyboardAvoidingView
			flex={1}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			bg='darkBlue.900'>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ImageBackground
					resizeMode='cover'
					source={require('../assets/background.png')}
					style={{ flex: 1 }}>
					<Center flex={1}>
						<Box w='100%' maxWidth={375} alignItems='center'>
							<Container safeArea my={3}>
								<ScrollView>
									<Icon
										as={MaterialCommunityIcons}
										size='xl'
										name='space-invaders'
										color='white'
									/>
									<Heading>Welcome to SpaceBook</Heading>
									<Text fontWeight='700' mt={4}>
										Sign in to continue!
									</Text>
									<VStack space={4} mt={4} alignItems='center' w='100%'>
										<FormControl
											isRequired
											isInvalid
											isInvalid={'email' in errors}>
											<FormControl.Label>Email Address</FormControl.Label>
											<Controller
												control={control}
												render={({
													field: { onChange, onBlur, value },
												}) => (
													<Input
														placeholder='Enter email address'
														onChangeText={onChange}
														onBlur={onBlur}
														value={value}
													/>
												)}
												name='email'
												rules={{
													required: 'Please enter your email',
													pattern: {
														value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
														message: 'Please enter a valid email',
													},
												}}
												defaultValue=''
											/>
											<FormControl.ErrorMessage>
												{errors.email?.message}
											</FormControl.ErrorMessage>
										</FormControl>
										<FormControl
											isRequired
											isInvalid
											isInvalid={'password' in errors}>
											<FormControl.Label>Password</FormControl.Label>
											<Controller
												control={control}
												render={({
													field: { onChange, onBlur, value },
												}) => (
													<Input
														placeholder='Enter password'
														onChangeText={onChange}
														onBlur={onBlur}
														value={value}
														type={show ? 'text' : 'password'}
														InputRightElement={
															<Icon
																as={
																	<MaterialIcons
																		name={
																			show
																				? 'visibility'
																				: 'visibility-off'
																		}
																	/>
																}
																size={5}
																mr={2}
																color='muted.400'
																onPress={() => setShow(!show)}
															/>
														}
													/>
												)}
												name='password'
												rules={{
													required: 'Please enter a password',
												}}
												defaultValue=''
											/>
											<FormControl.ErrorMessage>
												{errors.password?.message}
											</FormControl.ErrorMessage>
										</FormControl>
									</VStack>
									<Button mt='4' onPress={handleSubmit(onSubmit)}>
										Sign In
									</Button>
									<HStack mt='6' justifyContent='center'>
										<Text fontSize='sm' color='white'>
											New to SpaceBook?{' '}
										</Text>
										<Link
											_text={{
												color: 'primary.300',
												fontWeight: 'bold',
												fontSize: 'sm',
												textDecoration: 'none',
											}}
											onPress={() => {
												navigation.navigate('Register');
											}}>
											Join Now
										</Link>
									</HStack>
								</ScrollView>
							</Container>
						</Box>
					</Center>
				</ImageBackground>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};
export default LoginScreen;
