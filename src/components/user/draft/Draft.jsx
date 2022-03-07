import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { HStack, VStack, Text, Icon, FormControl, TextArea } from "native-base";
import { useAuth } from "hooks/useAuth";
import { updateDraft } from "services/userService";
import { toastError, toastSuccess } from "utils/toastUtil";

const Draft = ({ item, index, publish, delDraft }) => {
	const [editDraft, setEditDraft] = useState(false);
	const { authUser } = useAuth();
	const { user, date } = item;
	const { control, handleSubmit, formState } = useForm({
		defaultValues: {
			text: item.text,
		},
	});
	const { errors } = formState;

	const update = async (data) => {
		try {
			await updateDraft(data, index);
			setEditDraft(false);
			toastSuccess("Draft updated successfully");
		} catch (error) {
			toastError("Error Updating Draft");
		}
	};

	const publishDraft = async (data) => publish(user.user_id, data, index);

	return (
		<VStack
			space={2}
			mt={2}
			_light={{ bg: "dark.800" }}
			_dark={{ bg: "dark.100" }}
			rounded={4}
			p={2}>
			<HStack space={2} justifyContent="space-between">
				<HStack space={2}>
					<VStack maxW="155px">
						<Text bold fontSize="xs" isTruncated>
							{authUser.id !== user.user_id && "Post To: "}
							{user.first_name + " " + user.last_name}
						</Text>
						<Text fontSize="10px" isTruncated>
							{date}
						</Text>
					</VStack>
				</HStack>
				<HStack space="2" alignItems="center">
					<Icon
						as={MaterialCommunityIcons}
						name="publish"
						size="sm"
						onPress={handleSubmit(publishDraft)}
					/>
					{!editDraft ? (
						<Icon
							as={MaterialCommunityIcons}
							name="file-document-edit-outline"
							size="sm"
							onPress={() => {
								setEditDraft(true);
							}}
						/>
					) : (
						<Icon
							as={MaterialCommunityIcons}
							name="content-save-edit-outline"
							size="sm"
							onPress={handleSubmit(update)}
						/>
					)}
					<Icon
						as={MaterialCommunityIcons}
						name="delete-forever-outline"
						size="sm"
						color="danger.500"
						onPress={() => {
							delDraft(index);
						}}
					/>
				</HStack>
			</HStack>
			<FormControl isRequired isInvalid={"text" in errors}>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextArea
							placeholder="Draft"
							onChangeText={onChange}
							onBlur={onBlur}
							value={value}
							isDisabled={!editDraft}
							borderWidth={0}
							px={editDraft ? 0 : 2}
							fontSize="sm"
							totalLines={2}
						/>
					)}
					name="text"
					rules={{
						required: "Cannot create a blank draft",
					}}
				/>
				<FormControl.ErrorMessage>{errors.text?.message}</FormControl.ErrorMessage>
			</FormControl>
		</VStack>
	);
};

export default Draft;
