import React, { useState } from "react";
import { Dimensions } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";

import { Container, FlatList, VStack, Input, Icon, FormControl, Text } from "native-base";

import { toastError } from "utils/toastUtil";
import { search } from "services/userService";

import Body from "components/layout/Body";
import AnimatedSpinner from "components/animation/AnimatedSpinner";
import Friend from "components/user/friends/Friend";
import AddFriend from "components/user/friends/AddFriend";

const SearchScreen = () => {
	const searchLimit = 10;
	const flatListHeight = Dimensions.get("window").height - 100;
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [searchCount, setSearchCount] = useState(0);
	const { control, handleSubmit, formState } = useForm();
	const { errors, isSubmitting } = formState;

	const onSubmit = async (data) => {
		try {
			const response = await search(data.query, "all", searchLimit);
			setSearchQuery(data.query);
			setSearchResults(response);
			setSearchCount(1);
			if (response.length <= 0) {
				throw "No results found for " + data.query;
			}
		} catch (error) {
			toastError(error);
		}
	};

	const loadMore = async () => {
		try {
			const response = await search(
				searchQuery,
				"all",
				searchLimit,
				searchLimit * searchCount
			);
			if (response.length > 0) {
				setSearchResults([...searchResults, ...response]);
				setSearchCount(searchCount + 1);
			}
		} catch (error) {
			toastError(error);
		}
	};

	return (
		<Body>
			{isSubmitting && <AnimatedSpinner />}
			<Container>
				<VStack space={2} flex={1} w="100%" mt={4}>
					<FormControl isRequired isInvalid={"query" in errors}>
						<Controller
							control={control}
							name="query"
							defaultValue=""
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									placeholder="Search"
									onChangeText={onChange}
									onBlur={onBlur}
									value={value}
									InputRightElement={
										<Icon
											onPress={handleSubmit(onSubmit)}
											as={MaterialIcons}
											name="search"
											size={5}
											m={2}
										/>
									}
								/>
							)}
							rules={{
								required: "Please enter before submitting",
							}}
						/>
						<FormControl.ErrorMessage>{errors.query?.message}</FormControl.ErrorMessage>
					</FormControl>
					{searchResults.length > 0 && (
						<>
							<Text key="searchResultsTest">
								Search Results for <Text bold>{searchQuery}</Text>
							</Text>
							<FlatList
								maxH={flatListHeight}
								w="100%"
								data={searchResults}
								onEndReached={loadMore}
								renderItem={(item) => (
									<Friend
										{...item}
										renderedButtons={
											<AddFriend colorScheme="success" user={item.item}>
												Add
											</AddFriend>
										}
									/>
								)}
								keyExtractor={(item) => item.user_id.toString()}
							/>
						</>
					)}
				</VStack>
			</Container>
		</Body>
	);
};

export default SearchScreen;
