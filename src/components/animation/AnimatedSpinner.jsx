import React from 'react';
import { Center, Spinner } from 'native-base';

const AnimatedSpinner = () => {
	return (
		<Center
			bg='black'
			opacity='0.85'
			zIndex={1}
			flex={1}
			position='fixed'
			top={0}
			bottom={0}
			left={0}
			right={0}>
			<Spinner size='lg' color='white' />
		</Center>
	);
};
export default AnimatedSpinner;
