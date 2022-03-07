import React from "react";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HStack, VStack, Text, Pressable, Icon } from "native-base";
import { useAuth } from "hooks/useAuth";
import LikePost from "components/user/posts/LikePost";
import RemovePost from "components/user/posts/RemovePost";

const Post = ({ item, setPosts, id }) => {
	const navigation = useNavigation();
	const { author } = item;
	const { authUser } = useAuth();
	const date = format(new Date(item.timestamp), "PPPp");
	let postButtons;

	if (authUser.id === author.user_id) {
		postButtons = (
			<HStack space="2" alignItems="center">
				<Icon
					as={MaterialCommunityIcons}
					name="file-document-edit-outline"
					size="sm"
					onPress={() => {
						navigation.push("Edit Post", {
							post_id: item.post_id,
						});
					}}
				/>
				<RemovePost id={id} post_id={item.post_id} setPosts={setPosts}>
					<Icon
						as={MaterialCommunityIcons}
						name="delete-forever-outline"
						size="sm"
						color="danger.500"
					/>
				</RemovePost>
			</HStack>
		);
	} else if (authUser.id !== id) {
		postButtons = <LikePost id={id} post_id={item.post_id} />;
	}

	return (
		<Pressable
			onPress={() => {
				if (authUser.id !== author.user_id) {
					navigation.push("Account", {
						user_id: author.user_id,
					});
				}
			}}>
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
								{authUser.id !== author.user_id && "Posted By: "}
								{author.first_name + " " + author.last_name}
							</Text>
							<Text fontSize="10px" isTruncated>
								{date}
							</Text>
						</VStack>
					</HStack>
					<HStack space={2}>{postButtons}</HStack>
				</HStack>

				<VStack space={2} flex={1}>
					<Text>{item.text}</Text>
				</VStack>
			</VStack>
		</Pressable>
	);
};

export default Post;
