import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from 'hooks/useAuth';
import Toast from 'react-native-toast-message';
import { toastConfig } from 'utils/toastUtil';
import LoginScreen from 'screens/auth/LoginScreen';
import RegisterScreen from 'screens/auth/RegisterScreen';
import HomeScreen from 'screens/home/HomeScreen';
import AnimatedSpinner from 'components/animation/AnimatedSpinner';

const Stack = createStackNavigator();
const Routing = () => {
	const { isAuthenticated, isAuthLoading } = useAuth();

	if (isAuthLoading) return <AnimatedSpinner />;
	return (
		<NavigationContainer>
			{isAuthenticated ? (
				<Stack.Navigator>
					<Stack.Screen name='Home' component={HomeScreen} />
				</Stack.Navigator>
			) : (
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}>
					<Stack.Screen name='Login' component={LoginScreen} />
					<Stack.Screen name='Register' component={RegisterScreen} />
				</Stack.Navigator>
			)}
			<Toast config={toastConfig} />
		</NavigationContainer>
	);
};

export default Routing;
