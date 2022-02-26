import React from 'react';
import { HStack, Icon, Text, Pressable, Center } from 'native-base';

const Nav = ({ state, descriptors, navigation }) => {
	return (
		<HStack
			_light={{ bg: 'darkBlue.700' }}
			_dark={{ bg: 'darkBlue.800' }}
			safeAreaBottom
			shadow={6}
			alignItems='center'
			overflow='hidden'>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate({ name: route.name, merge: true });
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<Pressable
						onPress={onPress}
						onLongPress={onLongPress}
						cursor='pointer'
						py='3'
						flex={1}
						opacity={isFocused ? 1 : 0.75}
						key={route.key}>
						<Center>
							{options.tabBarIcon && (
								<Icon
									mb='1'
									as={options.tabBarIcon.as}
									name={options.tabBarIcon.name}
									color='white'
									size='sm'
								/>
							)}
							<Text color='white' fontSize='12'>
								{label}
							</Text>
						</Center>
					</Pressable>
				);
			})}
		</HStack>
	);
};

export default Nav;
