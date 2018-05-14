module.exports = {
	lintOnSave: false,
	configureWebpack: config=> {

		addStylusNib(config)

		// for debugging without console or breakpoints (??)
		// Object.keys(config).map(k=> config[k] = 9)
		// config.a = stylusLoaders

		if (process.env.NODE_ENV === 'production') {
			// mutate config for production...
			// return
		}
		// mutate for development...
	},
}

// add nib to stylus-loader (s)
const addStylusNib = config=> {
	const vueLoaderLoaders = config.module.rules.find(r=> 'a.vue'.match(r.test))
		.use.find(l=> l.loader=='vue-loader').options.loaders
	const stylusLoaders = config.module.rules
		.filter(r=> r.test.toString().match(/\.styl(us)?\$/))
	const nib = require('nib')
	;[vueLoaderLoaders.styl, vueLoaderLoaders.stylus, ...stylusLoaders].forEach((_l, i)=> {
		const l = Array.isArray(_l)? _l: _l.use
		const {options} = l.find(l=> l.loader=='stylus-loader')
		// options.use = options.use || []
		// options.use.push(nib())
		options.import = options.import || []
		options.import.push('~nib/lib/nib/index.styl')
	})
}
