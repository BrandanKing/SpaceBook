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

const RegisterScreen = ({ navigation }) => {
	const [show, setShow] = useState(false);
	const toast = useToast();

	const { signUp } = useContext(AuthContext);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		signUp(data).then((response) => {
			console.log(response.data);
			if (response.status != 200) {
				const errorMessage = response.data.includes('email')
					? 'Account already exists'
					: 'An error has occurred, please review your data and try again.';
				toast.show({
					placement: 'top',
					title: 'Error',
					status: 'error',
					description: errorMessage,
				});
			}
		});
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
										Register to continue!
									</Text>
									<VStack space={4} mt={4} alignItems='center' w='100%'>
										<FormControl isRequired isInvalid={'first_name' in errors}>
											<FormControl.Label>First Name</FormControl.Label>
											<Controller
												control={control}
												render={({
													field: { onChange, onBlur, value },
												}) => (
													<Input
														placeholder='Enter first name'
														onChangeText={onChange}
														onBlur={onBlur}
														value={value}
													/>
												)}
												name='first_name'
												rules={{
													required: 'Please enter your first name',
													pattern: {
														value: /^[a-zA-Z]+$/,
														message: 'Please enter a valid first name',
													},
												}}
												defaultValue=''
											/>
											<FormControl.ErrorMessage>
												{errors.first_name?.message}
											</FormControl.ErrorMessage>
										</FormControl>
										<FormControl isRequired isInvalid={'last_name' in errors}>
											<FormControl.Label>Last Name</FormControl.Label>
											<Controller
												control={control}
												render={({
													field: { onChange, onBlur, value },
												}) => (
													<Input
														placeholder='Enter last name'
														onChangeText={onChange}
														onBlur={onBlur}
														value={value}
													/>
												)}
												name='last_name'
												rules={{
													required: 'Please enter your last name',
													pattern: {
														value: /^[a-zA-Z]+$/,
														message: 'Please enter a valid last name',
													},
												}}
												defaultValue=''
											/>
											<FormControl.ErrorMessage>
												{errors.last_name?.message}
											</FormControl.ErrorMessage>
										</FormControl>
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
													minLength: {
														value: 6,
														message:
															'Password must be at greater than 5 characters long',
													},
												}}
												defaultValue=''
											/>
											<FormControl.ErrorMessage>
												{errors.password?.message}
											</FormControl.ErrorMessage>
										</FormControl>
									</VStack>
									<Button mt='4' onPress={handleSubmit(onSubmit)}>
										Register
									</Button>
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
				</ImageBackground>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default RegisterScreen;
