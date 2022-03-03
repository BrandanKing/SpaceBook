import React, { useEffect, useState } from 'react';
import { Button, TextArea, FormControl, Container } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { getPost, deletePost, updatePost } from 'services/userService';
import { toastError, toastSuccess } from 'utils/toastUtil';
import { useAuth } from 'hooks/useAuth';

import Body from 'components/layout/Body';
import AnimatedSpinner from 'components/animation/AnimatedSpinner';

const EditPostScreen = ({ navigation, route }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const { control, handleSubmit, formState, reset } = useForm();
	const { errors, isSubmitting, isDirty } = formState;

	const { authUser } = useAuth();
	const { post_id } = route.params;

	const onSubmit = async (data) => {
		try {
			await updatePost(authUser.id, post_id, data);
			toastSuccess('Post Updated');
			reset(data);
		} catch (error) {
			toastError(error);
		}
	};

	const onMount = async () => {
		try {
			const postData = await getPost(authUser.id, post_id);
			reset({ text: postData.text });
		} catch (error) {
			toastError(error);
		}
		setIsLoaded(true);
	};

	const removePost = async () => {
		try {
			await deletePost(authUser.id, post_id);
			toastSuccess('Post Deleted');
			navigation.goBack();
		} catch (error) {
			toastError(error);
		}
	};

	useEffect(() => {
		onMount();
	}, []);

	if (!isLoaded || isSubmitting) return <AnimatedSpinner />;

	return (
		<Body>
			<Container mt={4}>
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
					<Button onPress={removePost} colorScheme='danger' py={1.5}>
						Delete
					</Button>
					<Button
						colorScheme='darkBlue'
						_text={{ color: 'white' }}
						py={1.5}
						onPress={handleSubmit(onSubmit)}
						isDisabled={!isDirty}
						isLoading={isSubmitting}
						isLoadingText='Updating'>
						Post
					</Button>
				</Button.Group>
			</Container>
		</Body>
	);
};

export default EditPostScreen;
