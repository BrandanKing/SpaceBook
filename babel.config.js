module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					alias: {
						assets: './src/assets',
						components: './src/components',
						config: './src/config',
						context: './src/context',
						hooks: './src/hooks',
						screens: './src/screens',
						services: './src/services',
						styles: './src/styles',
						templates: './src/templates',
						utils: './src/utils',
					},
				},
			],
		],
	};
};
