import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen, RegisterScreen } from '../screens/index';

const Stack = createStackNavigator();

const LoggedOutNavigation = (props) => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Register'
				screenOptions={{
					headerShown: false,
				}}>
				<Stack.Screen name='Login' component={LoginScreen} />
				<Stack.Screen name='Register' component={RegisterScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default LoggedOutNavigation;
