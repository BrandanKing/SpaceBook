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
		try {
			const { user } = await authService.login(data);

			setUser(user);
			setIsAuthLoading(false);
			setIsAuthenticated(true);

			return true;
		} catch (error) {
			return handleError(error);
		}
	}

	async function register(data) {
		setIsAuthLoading(true);
		try {
			await authService.register(data);
			await login(data);

			return true;
		} catch (error) {
			return handleError(error);
		}
	}

	async function logout() {
		setIsAuthLoading(true);

		await authService.logout();

		setUser(null);
		setIsAuthLoading(false);
		setIsAuthenticated(false);

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
		register,
		logout,
	};
}
