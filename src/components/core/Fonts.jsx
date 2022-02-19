import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

function Fonts({ children }) {
	const [fontsLoaded] = useFonts({
		'open-sans': require('assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('assets/fonts/OpenSans-Bold.ttf'),
	});

	if (!fontsLoaded) return <AppLoading />;
	return children;
}

export default Fonts;
