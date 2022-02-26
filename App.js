import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import Routing from 'components/core/Routing';
import { AuthProvider } from 'hooks/useAuth';
import Fonts from 'components/core/Fonts';
import Theme from 'styles/Theme';

const App = () => {
	return (
		<Fonts>
			<NativeBaseProvider theme={Theme}>
				<AuthProvider>
					<StatusBar style='dark' />
					<Routing />
				</AuthProvider>
			</NativeBaseProvider>
		</Fonts>
	);
};

export default App;
