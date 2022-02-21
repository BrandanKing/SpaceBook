import React from 'react';
import { Button } from 'react-native';
import { useAuth } from 'hooks/useAuth';
const HomeScreen = ({ navigation }) => {
	const { user, logout, isAuthLoading } = useAuth();
	return (
		<Button
			title='Logout'
			onPress={() => {
				navigation.navigate('Search');
			}}
		/>
	);
};

export default HomeScreen;
