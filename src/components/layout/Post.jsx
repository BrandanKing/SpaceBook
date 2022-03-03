import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HStack, VStack, Text, Menu, Pressable, Icon, Skeleton } from 'native-base';
import { useAuth } from 'hooks/useAuth';
import { toastError, toastSuccess } from 'utils/toastUtil';
import { deletePost } from 'services/userService';
import LikePost from 'components/user/LikePost';

const Post = ({ item, updatePostsState, id }) => {
	const navigation = useNavigation();
	const { author } = item;
	const { authUser } = useAuth();
	const date = format(new Date(item.timestamp), 'PPPp');

	const removePost = async () => {
		try {
			await deletePost(id, item.post_id);
			toastSuccess('Post Deleted');
			updatePostsState({});
		} catch (error) {
			toastError(error);
		}
	};

	return (
		<Pressable
			onPress={() => {
				navigation.push('Account', {
					user_id: author.user_id,
				});
			}}>
			<VStack
				space={2}
				mt={2}
				_light={{ bg: 'dark.800' }}
				_dark={{ bg: 'dark.100' }}
				rounded={4}
				p={2}>
				<HStack space={2} justifyContent='space-between'>
					<HStack space={2}>
						<Skeleton rounded='full' size='40px' />
						<VStack maxW='155px'>
							<Text bold fontSize='xs' isTruncated>
								{author.first_name + ' ' + author.last_name}
							</Text>
							<Text fontSize='10px' isTruncated>
								{date}
							</Text>
						</VStack>
					</HStack>
					<HStack space={2}>
						{authUser.id !== author.user_id ? (
							<LikePost id={id} post_id={item.post_id} />
						) : (
							<Menu
								minW='100px'
								placement='left bottom'
								trigger={(triggerProps) => {
									return (
										<Pressable {...triggerProps}>
											<Icon
												as={MaterialCommunityIcons}
												name='dots-vertical'
												size='sm'
											/>
										</Pressable>
									);
								}}>
								<Menu.Item
									onPress={() => {
										navigation.push('Edit Post', {
											post_id: item.post_id,
										});
									}}>
									Edit
								</Menu.Item>
								<Menu.Item onPress={removePost}>Delete</Menu.Item>
							</Menu>
						)}
					</HStack>
				</HStack>

				<VStack space={2} flex={1}>
					<Text>{item.text}</Text>
				</VStack>
			</VStack>
		</Pressable>
	);
};

export default Post;
