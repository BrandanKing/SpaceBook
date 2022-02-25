import React from 'react';
import { ImageBackground } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, Container, VStack, Skeleton, FormControl, Button, Input } from 'native-base';
import Body from 'components/layout/Body';
import ProfilePicture from 'components/core/ProfilePicture';
import { useAuth } from 'hooks/useAuth';

const AccountScreen = ({ navigation }) => {
	const { user } = useAuth();
	const { control, handleSubmit, formState, reset } = useForm({
		defaultValues: user,
	});
	const { errors, isDirty, isSubmitting } = formState;

	const onSubmit = async (data) => {
		let updated_data = {};
		if (user.first_name != data.first_name) updated_data.first_name = data.first_name;
		if (user.last_name != data.last_name) updated_data.last_name = data.last_name;
		if (user.email != data.email) updated_data.email = data.email;
		if (Object.keys(updated_data).length != 0) {
			await updateUser(user.id, updated_data);
			toastSuccess('Account Details Updated');
		}
	};

	// TODO Refactor Update user

	return (
		<Body flex={1} w='100%'>
			<ScrollView w='100%'>
				<ImageBackground
					resizeMode='cover'
					source={require('assets/nightsky.jpg')}
					style={{
						height: '150px',
						width: '100%',
					}}></ImageBackground>
				<Container>
					<VStack space={6} w='100%' alignItems='center'>
						<ProfilePicture
							id={user.user_id}
							alt='Profile Picture'
							rounded='full'
							borderWidth={1}
							size='150px'
							mt='-75px'
							borderWidth='4'
							_light={{ borderColor: 'white' }}
							_dark={{ borderColor: 'dark.50' }}
							shadow={4}
						/>
					</VStack>
					<VStack space={4} mt={4} alignItems='center' w='100%'>
						<FormControl isRequired isInvalid={'first_name' in errors}>
							<FormControl.Label>First Name</FormControl.Label>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
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
							/>
							<FormControl.ErrorMessage>
								{errors.first_name?.message}
							</FormControl.ErrorMessage>
						</FormControl>
						<FormControl isRequired isInvalid={'last_name' in errors}>
							<FormControl.Label>Last Name</FormControl.Label>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
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
							/>
							<FormControl.ErrorMessage>
								{errors.last_name?.message}
							</FormControl.ErrorMessage>
						</FormControl>
						<FormControl isRequired isInvalid={'email' in errors}>
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
							/>
							<FormControl.ErrorMessage>
								{errors.email?.message}
							</FormControl.ErrorMessage>
						</FormControl>
					</VStack>
					<Button
						onPress={handleSubmit(onSubmit)}
						mt='4'
						w='100%'
						isDisabled={!isDirty}
						isLoading={isSubmitting}
						isLoadingText='Updating'>
						Update Details
					</Button>
				</Container>
			</ScrollView>
		</Body>
	);
};

export default AccountScreen;