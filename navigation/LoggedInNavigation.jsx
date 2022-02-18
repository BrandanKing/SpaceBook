import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/index';

const Stack = createStackNavigator();

const LoggedInNavigation = (props) => {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Home' component={HomeScreen} />
		</Stack.Navigator>
	);
};

export default LoggedInNavigation;
