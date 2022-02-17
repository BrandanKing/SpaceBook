import React from 'react';
import { NativeBaseProvider, Heading } from 'native-base';
import { Theme } from './constants/index';

const App = () => {
	return (
		<NativeBaseProvider theme={Theme}>
			<Heading>SpaceBook</Heading>
		</NativeBaseProvider>
	);
};
export default App;
