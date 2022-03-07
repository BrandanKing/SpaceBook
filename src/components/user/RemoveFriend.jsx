import React, { useRef, useState } from 'react';
import { AlertDialog, Button, Icon, Text } from 'native-base';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const RemoveFriend = ({ user }) => {
	const [isOpen, setIsOpen] = useState(false);

	const onClose = () => setIsOpen(false);

	const cancelRef = useRef(null);

	return (
		<>
			<Button
				colorScheme='danger'
				onPress={() => setIsOpen(!isOpen)}
				endIcon={
					<Icon as={MaterialCommunityIcons} name='trash-can-outline' size='xs' />
				}></Button>
			<AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
				<AlertDialog.Content>
					<AlertDialog.CloseButton />
					<AlertDialog.Header>
						<Text>Remove {user.user_givenname + ' ' + user.user_familyname}</Text>
					</AlertDialog.Header>
					<AlertDialog.Body>
						<Text>
							This will remove {user.user_givenname + ' ' + user.user_familyname} from
							your friends list.
						</Text>
					</AlertDialog.Body>
					<AlertDialog.Footer>
						<Button.Group space={2}>
							<Button
								variant='unstyled'
								colorScheme='coolGray'
								onPress={onClose}
								ref={cancelRef}>
								Cancel
							</Button>
							<Button colorScheme='danger' onPress={onClose}>
								Remove
							</Button>
						</Button.Group>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog>
		</>
	);
};

export default RemoveFriend;
