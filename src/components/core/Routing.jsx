import React from 'react';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from 'hooks/useAuth';
import { toastConfig } from 'utils/toastUtil';
import Header from 'components/core/Header';
import AnimatedSpinner from 'components/animation/AnimatedSpinner';

import LoginScreen from 'screens/auth/LoginScreen';
import RegisterScreen from 'screens/auth/RegisterScreen';

import AccountScreen from 'screens/user/AccountScreen';
import FriendsListScreen from 'screens/friends/FriendsListScreen';
import FriendRequestScreen from 'screens/friends/FriendRequestScreen';
import SearchScreen from 'screens/search/SearchScreen';

const Stack = createStackNavigator();

const Routing = () => {
	const { authUser, isAuthenticated, isAuthLoading } = useAuth();
	const header = (props) => <Header {...props} />;

	if (isAuthLoading) return <AnimatedSpinner />;
	return (
		<NavigationContainer>
			{isAuthenticated ? (
				<Stack.Navigator
					tabBar={(props) => <Nav {...props} />}
					screenOptions={{
						header,
					}}>
					<Stack.Screen
						name='Account'
						component={AccountScreen}
						initialParams={authUser && { user_id: authUser.id }}
						options={{
							title: 'SpaceBook',
						}}
					/>
					<Stack.Screen
						name='Friends'
						component={FriendsListScreen}
						initialParams={authUser && { user_id: authUser.id }}
					/>
					<Stack.Screen name='Friend Requests' component={FriendRequestScreen} />
					<Stack.Screen name='Search' component={SearchScreen} />
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
