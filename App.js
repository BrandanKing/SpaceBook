import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { NativeBaseProvider } from 'native-base';
import { Theme } from './constants/index';
import { LoggedOutNavigation } from './navigation/index';

const fetchFonts = async () => {
	await Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});
};

const App = () => {
	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
				onError={console.warn}
			/>
		);
	}

	Theme.config = {
		useSystemColorMode: false,
		initialColorMode: 'dark',
	};
	return (
		<NativeBaseProvider theme={Theme}>
			<LoggedOutNavigation />
		</NativeBaseProvider>
	);
};
export default App;
