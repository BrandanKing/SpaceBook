import React, { useState, useEffect, useContext, createContext } from 'react';
import { toastError } from 'utils/toastUtil';
import authService from 'services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	return useContext(AuthContext);
};

function useProvideAuth() {
	const [user, setUser] = useState(null);
	const [isAuthLoading, setIsAuthLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	function handleError(error) {
		setIsAuthLoading(false);
		toastError(error);
	}

	async function login(data) {
		setIsAuthLoading(true);
		const { user, response } = await authService.login(data);

		if (response.responseType !== 'SUCCESS') return handleError(response.responseMessage);

		setUser(user);
		setIsAuthLoading(false);
		setIsAuthenticated(true);

		return true;
	}

	async function register(data) {
		setIsAuthLoading(true);

		const { user, response } = await authService.register(data);

		if (response.responseType !== 'SUCCESS') return handleError(response.responseMessage);

		return login(user);
	}

	async function logout() {
		await authService.logout();
		setUser(null);
		setIsAuthenticated(false);

		return true;
	}

	async function updateUser(userID, data) {
		const { user, response } = await authService.updateUser(userID, data);

		if (response.responseType !== 'SUCCESS') return handleError(response.responseMessage);

		setUser(user);

		return true;
	}

	useEffect(() => {
		onMount();
	}, []);

	async function onMount() {
		const user = await authService.getUserFromAsyncStorage();

		setUser(user);
		setIsAuthenticated(!!user);
		setIsAuthLoading(false);
	}

	return {
		user,
		isAuthLoading,
		isAuthenticated,
		login,
		logout,
		register,
		updateUser,
	};
}
