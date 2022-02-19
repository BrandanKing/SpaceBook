import React from 'react';
import { Center, Spinner } from 'native-base';

const AnimatedSpinner = () => {
	return (
		<Center bg='darkBlue.900' flex={1}>
			<Spinner size='lg' color='white' />
		</Center>
	);
};
export default AnimatedSpinner;
