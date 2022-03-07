import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable, HStack, Text } from "native-base";
import ProfilePicture from "components/user/ProfilePicture";

const FriendDisplay = ({ item, renderedButtons, requests }) => {
	const navigation = useNavigation();

	return (
		<Pressable
			onPress={() => {
				navigation.push("Account", {
					user_id: item.user_id,
				});
			}}>
			<HStack
				space={3}
				position="relative"
				justifyContent="space-between"
				borderBottomWidth="1"
				p={3}
				pr={0}
				_dark={{
					borderColor: "white",
				}}
				_light={{
					borderColor: "gray.600",
				}}>
				<HStack space={3} alignItems="center">
					<ProfilePicture rounded="full" size="32px" id={item.user_id} />
					<Text isTruncated maxW="150px">
						{requests
							? item.first_name + " " + item.last_name
							: item.user_givenname + " " + item.user_familyname}
					</Text>
				</HStack>
				{renderedButtons}
			</HStack>
		</Pressable>
	);
};

export default FriendDisplay;
