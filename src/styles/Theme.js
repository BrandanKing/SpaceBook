import { extendTheme, themeTools } from "native-base";
const { mode } = themeTools;

const themeConfig = {
	fontConfig: {
		OpenSans: {
			400: {
				normal: "open-sans",
			},
			500: {
				normal: "open-sans",
			},
			600: {
				normal: "open-sans-bold",
			},
			700: {
				normal: "open-sans-bold",
			},
			900: {
				normal: "open-sans-bold",
			},
		},
	},
	fonts: {
		heading: "OpenSans",
		body: "OpenSans",
		mono: "OpenSans",
	},
	colors: {},
	config: {
		useSystemColorMode: true,
	},
	components: {
		Container: {
			baseStyle: {
				width: "100%",
				maxWidth: "100%",
				px: "16px",
			},
		},
		FormControlLabel: {
			baseStyle: (props) => {
				return {
					_text: {
						color: mode("dark.50", "white")(props),
					},
				};
			},
		},
		Input: {
			variants: {
				outline: (props) => {
					return {
						color: mode("dark.50", "white")(props),
						borderColor: mode("dark.50", "white")(props),
						_hover: {
							bg: "transparent",
						},
						_focus: {
							bg: "transparent",
							borderColor: mode("darkBlue.700", "white")(props),
						},
					};
				},
			},
		},
		ModalContent: {
			baseStyle: (props) => {
				return {
					bg: mode("white", "dark.100")(props),
					_text: {
						color: mode("dark.50", "white")(props),
					},
				};
			},
		},
		ModalFooter: {
			baseStyle: (props) => {
				return {
					bg: mode("white", "dark.100")(props),
					borderTopWidth: "1",
					borderColor: mode("coolGray.200", "gray.600")(props),
				};
			},
		},
	},
};

const Theme = extendTheme(themeConfig);

export default Theme;
