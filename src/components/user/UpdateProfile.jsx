import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, FormControl, Input, Modal, VStack } from 'native-base';

import { useAuth } from 'hooks/useAuth';

const UpdateProfile = ({ showEditUser, onClose, user, onSave, ...props }) => {
	const { updateUser } = useAuth();
	const { control, handleSubmit, formState, reset } = useForm({
		defaultValues: user,
	});
	const { errors, isDirty, isSubmitting } = formState;

	useEffect(() => {
		reset({ ...user });
	}, [user]);

	const onSubmit = async (data) => {
		let updated_data = {};
		if (user.first_name != data.first_name) updated_data.first_name = data.first_name;
		if (user.last_name != data.last_name) updated_data.last_name = data.last_name;
		if (user.email != data.email) updated_data.email = data.email;
		if (Object.keys(updated_data).length != 0) {
			await updateUser(updated_data);
			onSave(data);
			onClose(false);
		}
	};
	return (
		<Modal
			isOpen={showEditUser}
			onClose={() => onClose(false)}
			avoidKeyboard={true}
			animationPreset='slide'>
			<Modal.Content w='90%'>
				<Modal.CloseButton />
				<Modal.Header>Edit Profile</Modal.Header>
				<Modal.Body>
					<VStack space={4} alignItems='center' w='100%'>
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
				</Modal.Body>
				<Modal.Footer>
					<Button.Group space={2}>
						<Button
							variant='ghost'
							colorScheme='blueGray'
							onPress={() => onClose(false)}>
							Close
						</Button>
						<Button
							onPress={handleSubmit(onSubmit)}
							isDisabled={!isDirty}
							isLoading={isSubmitting}
							isLoadingText='Updating'>
							Update
						</Button>
					</Button.Group>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	);
};

export default UpdateProfile;
