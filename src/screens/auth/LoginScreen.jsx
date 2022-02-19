import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Platform, ImageBackground } from 'react-native';
import { useAuth } from 'hooks/useAuth';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {
	KeyboardAvoidingView,
	ScrollView,
	Container,
	Center,
	VStack,
	HStack,
	Heading,
	FormControl,
	Text,
	Link,
	Input,
	Button,
	Icon,
} from 'native-base';
import AnimatedSpinner from 'components/animation/AnimatedSpinner';
import Body from 'components/layout/Body';

const LoginScreen = ({ navigation }) => {
	const [showPassword, setShowPassword] = useState(false);
	const { login, isAuthLoading } = useAuth();
	const { control, handleSubmit, formState } = useForm();

	if (isAuthLoading) return <AnimatedSpinner />;
	const onSubmit = async (data) => {
		await login(data);
	};

	return (
		<Body>
			<ImageBackground
				resizeMode='cover'
				source={require('assets/background.png')}
				style={{ flex: 1 }}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					flex={1}
					keyboardVerticalOffset={15}>
					<Center flex={1} safeArea>
						<ScrollView w='100%' maxW={375} flexGrow={0}>
							<Container>
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
										isInvalid={'email' in formState.errors}>
										<FormControl.Label>Email Address</FormControl.Label>
										<Controller
											control={control}
											render={({ field: { onChange, onBlur, value } }) => (
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
													value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
													message: 'Invalid email address',
												},
											}}
											defaultValue=''
										/>
										<FormControl.ErrorMessage>
											{formState.errors.email?.message}
										</FormControl.ErrorMessage>
									</FormControl>
									<FormControl
										isRequired
										isInvalid
										isInvalid={'password' in formState.errors}>
										<FormControl.Label>Password</FormControl.Label>
										<Controller
											control={control}
											render={({ field: { onChange, onBlur, value } }) => (
												<Input
													placeholder='Enter password'
													onChangeText={onChange}
													onBlur={onBlur}
													value={value}
													type={showPassword ? 'text' : 'password'}
													InputRightElement={
														<Icon
															as={MaterialIcons}
															name={
																showPassword
																	? 'visibility'
																	: 'visibility-off'
															}
															size={5}
															m={2}
															color='white'
															onPress={() =>
																setShowPassword(!showPassword)
															}
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
											{formState.errors.password?.message}
										</FormControl.ErrorMessage>
									</FormControl>
								</VStack>
								<Button mt='4' w='100%' onPress={handleSubmit(onSubmit)}>
									Sign In
								</Button>
								<HStack mt='6' justifyContent='center' w='100%'>
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
							</Container>
						</ScrollView>
					</Center>
				</KeyboardAvoidingView>
			</ImageBackground>
		</Body>
	);
};

export default LoginScreen;
