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
			},
		},
		ScrollView: {
			baseStyle: {
				width: '100%',
				_contentContainerStyle: {
					flexGrow: 1,
					justifyContent: 'center',
				},
			},
		},
		Heading: {
			baseStyle: (props) => {
				let color = themeTools.mode('darkBlue.900', 'white')(props);
				return {
					color: color,
				};
			},
		},
		Input: {
			defaultProps: {
				size: 'md',
				variant: 'custom',
			},
			variants: {
				custom: (props) => {
					let color = themeTools.mode('darkBlue.900', 'white')(props);
					return {
						borderWidth: 1,
						width: '100%',
						color: color,
						borderRadius: 'md',
						borderColor: color,
						borderLeftWidth: 1,
						_focus: {
							borderColor: 'darkBlue.300',
						},
					};
				},
			},
		},
	},
};

const Theme = extendTheme(themeConfig);

export default Theme;
