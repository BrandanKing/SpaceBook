import React, { useState, useEffect, useReducer, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import axios from 'axios';

import { Theme, AuthContext } from './constants/index';
import { LoggedOutNavigation, LoggedInNavigation } from './navigation/index';

const fetchFonts = async () => {
	await Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});
};

const App = () => {
	const [fontLoaded, setFontLoaded] = useState(false);

	const [state, dispatch] = useReducer(
		(prevState, action) => {
			switch (action.type) {
				case 'RESTORE_TOKEN':
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
					};
				case 'SIGN_IN':
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
					};
				case 'SIGN_OUT':
					return {
						...prevState,
						isSignout: true,
						userToken: null,
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null,
		}
	);

	useEffect(() => {
		// AsyncStorage.clear();
		const getUserToken = async () => {
			let userToken;
			try {
				userToken = await AsyncStorage.getItem('@userToken');
			} catch (e) {
				console.error(e);
			}
			dispatch({ type: 'RESTORE_TOKEN', token: userToken });
		};

		getUserToken();
	}, []);
	const authContext = useMemo(
		() => ({
			signIn: async (data) => {
				try {
					const response = await axios.post(
						'http://localhost:3333/api/1.0.0/login',
						data
					);

					const token = response.data.token;
					await AsyncStorage.setItem('@userToken', token);

					dispatch({ type: 'SIGN_IN', token: token });
					return response;
				} catch (error) {
					return error.response;
				}
			},
			signOut: () => {
				// Still Needs creating
				dispatch({ type: 'SIGN_OUT' });
			},
			signUp: async (data) => {
				try {
					const response = await axios.post('http://localhost:3333/api/1.0.0/user', data);

					const login_data = {
						email: data.email,
						password: data.password,
					};

					return authContext.signIn(login_data);
				} catch (error) {
					return error.response;
				}
			},
		}),
		[]
	);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
				onError={console.warn}
			/>
		);
	}

	// Set Login & Register page to use dark theme only
	if (state.userToken == null) {
		Theme.config = {
			useSystemColorMode: false,
			initialColorMode: 'dark',
		};
	}

	return (
		<NativeBaseProvider theme={Theme}>
			<AuthContext.Provider value={authContext}>
				<NavigationContainer>
					{state.userToken == null ? <LoggedOutNavigation /> : <LoggedInNavigation />}
				</NavigationContainer>
			</AuthContext.Provider>
		</NativeBaseProvider>
	);
};

export default App;
