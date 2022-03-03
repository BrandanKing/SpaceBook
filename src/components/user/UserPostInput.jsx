import React from 'react';
import { Box, Button, TextArea, FormControl } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { addPost } from 'services/userService';
import { toastError, toastSuccess } from 'utils/toastUtil';

const UserPostInput = ({ id, updatePostsState, ...props }) => {
	const { control, handleSubmit, formState, reset } = useForm();
	const { errors, isSubmitting } = formState;

	const onSubmit = async (data) => {
		try {
			await addPost(id, data);
			reset({ text: '' });
			updatePostsState({});
			toastSuccess('Post added successfully');
		} catch (error) {
			toastError(error);
		}
	};
	return (
		<Box alignItems='flex-end' w='100%'>
			<FormControl isRequired isInvalid={'text' in errors}>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextArea
							placeholder='Enter Message'
							w='100%'
							totalLines={2}
							onChangeText={onChange}
							onBlur={onBlur}
							value={value}
						/>
					)}
					name='text'
					rules={{
						required: 'Cannot submit a blank post',
					}}
				/>
				<FormControl.ErrorMessage>{errors.text?.message}</FormControl.ErrorMessage>
			</FormControl>
			<Button.Group mt={3} isAttached>
				<Button variant='outline' colorScheme='darkBlue' py={1.5}>
					Save
				</Button>
				<Button
					colorScheme='darkBlue'
					_text={{ color: 'white' }}
					py={1.5}
					onPress={handleSubmit(onSubmit)}
					isLoading={isSubmitting}
					isLoadingText='Updating'>
					Post
				</Button>
			</Button.Group>
		</Box>
	);
};

export default UserPostInput;
