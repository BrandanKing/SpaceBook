import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';
import { useAuth } from 'hooks/useAuth';
import { toastConfig } from 'utils/toastUtil';
import LoginScreen from 'screens/auth/LoginScreen';
import RegisterScreen from 'screens/auth/RegisterScreen';
import HomeScreen from 'screens/home/HomeScreen';
import AccountScreen from 'screens/user/AccountScreen';
import Header from 'components/core/Header';
import Nav from 'components/core/Nav';

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Routing = () => {
	const { isAuthenticated } = useAuth();
	const header = (props) => <Header {...props} />;
	return (
		<NavigationContainer>
			{isAuthenticated ? (
				<Tab.Navigator
					initialRouteName='Account'
					tabBar={(props) => <Nav {...props} />}
					screenOptions={{
						header,
					}}>
					<Tab.Screen
						name='Home'
						component={HomeScreen}
						options={{
							title: 'SpaceBook',
							tabBarLabel: 'Home',
							tabBarIcon: {
								as: MaterialCommunityIcons,
								name: 'home',
							},
						}}
					/>
					<Tab.Screen
						name='Search'
						component={HomeScreen}
						options={{
							tabBarIcon: {
								as: MaterialIcons,
								name: 'search',
							},
						}}
					/>
					<Tab.Screen
						name='Account'
						component={AccountScreen}
						options={{
							tabBarLabel: 'Account',
							tabBarIcon: {
								as: MaterialCommunityIcons,
								name: 'account',
							},
						}}
					/>
				</Tab.Navigator>
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
