import React from 'react';
import { Box } from 'native-base';
import { useAuth } from 'hooks/useAuth';
import AnimatedSpinner from 'components/animation/AnimatedSpinner';

const Body = ({ children, ...rest }) => {
	const { isAuthLoading } = useAuth();
	return (
		<Box
			w='100%'
			flex={1}
			pb='20px'
			_light={{ bg: 'white' }}
			_dark={{ bg: 'dark.50' }}
			{...rest}>
			{isAuthLoading && <AnimatedSpinner />}
			{children}
		</Box>
	);
};

export default Body;
