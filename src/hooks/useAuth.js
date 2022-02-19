// Custom hook for handling auth logic
import React, { useState, useEffect, useContext, createContext } from 'react';
import { toastError } from 'utils/toastUtil';
import authService from 'services/authService';

const AuthContext = createContext();

// Provider component that wraps your app and makes auth object
// available to any child component that calls useAuth().
export function AuthProvider({ children }) {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Hook for child components to get the auth object
// and re-render when it changes.
export const useAuth = () => {
	return useContext(AuthContext);
};

function useProvideAuth() {
	const [user, setUser] = useState(null);
	const [isAuthLoading, setIsAuthLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	function handleError(error) {
		console.log('Error', error);
		setIsAuthLoading(false);
		toastError(error);
	}

	async function login(data) {
		setIsAuthLoading(true);
		const { user, response } = await authService.login(data);

		// Request failed, handle error
		if (response.responseType !== 'SUCCESS') return handleError(response.responseMessage);

		// Request was a success, update state
		setUser(user);
		setIsAuthLoading(false);
		setIsAuthenticated(true);

		// Return true so we know the user successfully logged in
		return true;
	}

	async function logout() {
		await authService.logout();
		setUser(null);
		setIsAuthenticated(false);
	}

	async function register(data) {
		setIsAuthLoading(true);
		const { user, response } = await authService.register(data);

		// Request failed, handle error
		if (response.responseType !== 'SUCCESS') return handleError(response.responseMessage);

		return login(user);
	}

	// Load user on mount this will cause any component that uses this
	// hook to re-render with the latest auth object
	useEffect(() => {
		onMount();
	}, []);

	async function onMount() {
		const user = await authService.getUserFromAsyncStorage();

		setUser(user);
		setIsAuthenticated(!!user); // Converts object to boolean
		setIsAuthLoading(false);
	}

	return {
		user,
		isAuthLoading,
		isAuthenticated,
		login,
		logout,
		register,
	};
}
