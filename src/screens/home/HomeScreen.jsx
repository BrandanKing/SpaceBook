import React from 'react';
import { Button } from 'react-native';
import { useAuth } from 'hooks/useAuth';
const HomeScreen = ({ navigation }) => {
	const { logout, isAuthLoading } = useAuth();
	return (
		<Button
			title='Logout'
			onPress={() => {
				logout();
			}}
		/>
	);
};

export default HomeScreen;
