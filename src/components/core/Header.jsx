import React from 'react';
import { HStack, IconButton, Icon, Text, useColorMode } from 'native-base';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from 'hooks/useAuth';

const Header = ({ navigation, back, route, options }) => {
	const { logout } = useAuth();
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<HStack
			safeAreaTop
			_light={{ bg: 'darkBlue.700' }}
			_dark={{ bg: 'darkBlue.800' }}
			p='3'
			justifyContent='space-between'
			alignItems='center'
			w='100%'>
			<HStack alignItems='center'>
				{back && (
					<IconButton
						onPress={navigation.goBack}
						icon={
							<Icon
								as={MaterialIcons}
								name='arrow-back-ios'
								size='sm'
								color='white'
							/>
						}
					/>
				)}
				<Icon
					as={MaterialCommunityIcons}
					size='sm'
					mr='3'
					name='space-invaders'
					color='white'
				/>
				<Text color='white' fontSize='lg' fontWeight='bold'>
					{options.title ? options.title : route.name}
				</Text>
			</HStack>
			<HStack>
				<IconButton
					icon={
						<Icon
							as={MaterialCommunityIcons}
							name={colorMode === 'light' ? 'flashlight' : 'flashlight-off'}
							size='sm'
							color='white'
							onPress={toggleColorMode}
						/>
					}
				/>
				<IconButton
					icon={
						<Icon
							as={MaterialIcons}
							name='logout'
							size='sm'
							color='white'
							onPress={logout}
						/>
					}
				/>
			</HStack>
		</HStack>
	);
};

export default Header;
