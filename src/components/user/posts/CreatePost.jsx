import React from "react";
import { useNavigation } from "@react-navigation/native";
import { VStack, HStack, Button, TextArea, FormControl } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { addPost, saveDraft } from "services/userService";
import { toastError, toastSuccess } from "utils/toastUtil";
import { useAuth } from "hooks/useAuth";

const CreatePost = ({ user, setPosts }) => {
	const { control, handleSubmit, formState, reset } = useForm();
	const { errors, isSubmitting } = formState;
	const { authUser } = useAuth();
	const { user_id, first_name, last_name } = user;

	const navigation = useNavigation();

	const onSubmit = async (data) => {
		try {
			await addPost(user_id, data);
			reset({ text: "" });
			setPosts({});
			toastSuccess("Post added successfully");
		} catch (error) {
			toastError(error);
		}
	};

	const createDraft = async (data) => {
		try {
			data["user"] = {
				user_id,
				first_name,
				last_name,
			};
			await saveDraft(data);
			reset({ text: "" });
			toastSuccess("Draft saved successfully");
		} catch (error) {
			toastError("Draft saved failed");
		}
	};

	return (
		<VStack space={3} w="100%">
			<FormControl isRequired isInvalid={"text" in errors}>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextArea
							placeholder="Enter Post"
							w="100%"
							totalLines={2}
							onChangeText={onChange}
							onBlur={onBlur}
							value={value}
						/>
					)}
					name="text"
					rules={{
						required: "Cannot submit a blank post",
					}}
				/>
				<FormControl.ErrorMessage>{errors.text?.message}</FormControl.ErrorMessage>
			</FormControl>
			<HStack justifyContent="space-between" w="100%">
				{user_id == authUser.id && (
					<Button
						colorScheme="light"
						_text={{ fontSize: "xs" }}
						onPress={() => {
							navigation.push("Drafts");
						}}>
						View Drafts
					</Button>
				)}
				<Button.Group isAttached>
					<Button
						variant="outline"
						colorScheme="darkBlue"
						py={1.5}
						onPress={handleSubmit(createDraft)}>
						Save as Draft
					</Button>
					<Button
						colorScheme="darkBlue"
						_text={{ color: "white" }}
						py={1.5}
						onPress={handleSubmit(onSubmit)}
						isLoading={isSubmitting}
						isLoadingText="">
						Post
					</Button>
				</Button.Group>
			</HStack>
		</VStack>
	);
};

export default CreatePost;
