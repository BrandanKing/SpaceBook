import React from "react";
import { HStack, IconButton, Icon, Text, useColorMode } from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "hooks/useAuth";

const Header = ({ navigation, back, route, options }) => {
	const { logout } = useAuth();
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<HStack
			safeAreaTop
			_light={{ bg: "darkBlue.700" }}
			_dark={{ bg: "darkBlue.800" }}
			p="3"
			justifyContent="space-between"
			alignItems="center"
			w="100%">
			<HStack alignItems="center">
				{back ? (
					<IconButton
						onPress={navigation.goBack}
						icon={
							<Icon
								as={MaterialIcons}
								name="arrow-back-ios"
								size="sm"
								color="white"
							/>
						}
					/>
				) : (
					<Icon
						as={MaterialCommunityIcons}
						size="sm"
						mr="2"
						name="space-invaders"
						color="white"
					/>
				)}
				<Text maxW="150px" color="white" fontSize="lg" fontWeight="bold" isTruncated>
					{options.title ? options.title : route.name}
				</Text>
			</HStack>
			<HStack>
				<IconButton
					variant="unstyled"
					icon={
						<Icon
							as={MaterialIcons}
							size="sm"
							name="search"
							color="white"
							onPress={() => {
								navigation.navigate("Search");
							}}
						/>
					}
				/>
				<IconButton
					variant="unstyled"
					icon={
						<Icon
							as={MaterialCommunityIcons}
							name={colorMode === "light" ? "flashlight" : "flashlight-off"}
							size="sm"
							color="white"
							onPress={toggleColorMode}
						/>
					}
				/>
				<IconButton
					variant="unstyled"
					icon={
						<Icon
							as={MaterialIcons}
							name="logout"
							size="sm"
							color="white"
							onPress={logout}
						/>
					}
				/>
			</HStack>
		</HStack>
	);
};

export default Header;
