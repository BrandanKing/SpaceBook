import React from 'react';

import { Box } from 'native-base';

const Body = ({ children, ...rest }) => {
	return (
		<Box flex={1} pb='20px' fac _light={{ bg: 'white' }} _dark={{ bg: 'dark.50' }} {...rest}>
			{children}
		</Box>
	);
};

export default Body;
