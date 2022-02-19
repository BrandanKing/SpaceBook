import React from 'react';

import { Box } from 'native-base';

const Body = ({ children, ...rest }) => {
	return (
		<Box flex={1} bg='darkBlue.900' {...rest}>
			{children}
		</Box>
	);
};

export default Body;
