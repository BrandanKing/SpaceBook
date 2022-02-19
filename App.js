import React from 'react';
import Routing from 'components/core/Routing';
import { AuthProvider } from 'hooks/useAuth';
import Fonts from 'components/core/Fonts';
import Theme from 'styles/Theme';

import { NativeBaseProvider } from 'native-base';

const App = () => {
	return (
		<Fonts>
			<NativeBaseProvider theme={Theme}>
				<AuthProvider>
					<Routing />
				</AuthProvider>
			</NativeBaseProvider>
		</Fonts>
	);
};

export default App;
