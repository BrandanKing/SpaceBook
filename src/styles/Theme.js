import { extendTheme, themeTools } from 'native-base';
const themeConfig = {
	fontConfig: {
		OpenSans: {
			400: {
				normal: 'open-sans',
			},
			500: {
				normal: 'open-sans',
			},
			600: {
				normal: 'open-sans-bold',
			},
			700: {
				normal: 'open-sans-bold',
			},
			900: {
				normal: 'open-sans-bold',
			},
		},
	},
	fonts: {
		heading: 'OpenSans',
		body: 'OpenSans',
		mono: 'OpenSans',
	},
	colors: {},
	config: {
		useSystemColorMode: true,
	},
	components: {
		Container: {
			baseStyle: {
				width: '100%',
				maxWidth: '100%',
				px: '16px',
			},
		},
	},
};

const Theme = extendTheme(themeConfig);

export default Theme;
