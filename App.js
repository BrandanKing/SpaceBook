import React from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import Routing from "components/core/Routing";
import { AuthProvider } from "hooks/useAuth";
import Fonts from "components/core/Fonts";
import Theme from "styles/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const colorModeManager = {
	get: async () => {
		try {
			let val = await AsyncStorage.getItem("@color-mode");
			return val === "dark" ? "dark" : "light";
		} catch (e) {
			return "light";
		}
	},
	set: async (value) => {
		try {
			await AsyncStorage.setItem("@color-mode", value);
		} catch (e) {
			console.log(e);
		}
	},
};

const App = () => {
	return (
		<Fonts>
			<NativeBaseProvider colorModeManager={colorModeManager} theme={Theme}>
				<AuthProvider>
					<StatusBar style="dark" />
					<Routing />
				</AuthProvider>
			</NativeBaseProvider>
		</Fonts>
	);
};

export default App;
