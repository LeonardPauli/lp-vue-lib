// var log = require('string-from-object').log

/* global module process require */

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
	// const vueLoaderLoaders = config.module.rules
	// 	.find(r=> 'a.vue'.match(r.test))
	// 	.use.find(l=> l.loader=='vue-loader').options.loaders
	const concat = xs=> xs.reduce((a, b)=> a.concat(b))
	const unwrap = (xs, k)=> concat(xs.map(l=> l[k]))

	const stylusLoadersMain = config.module.rules
		.filter(r=> 'a.styl'.match(r.test) || 'a.stylus'.match(r.test))
	const stylusLoaders = unwrap(unwrap(stylusLoadersMain, 'oneOf'), 'use')
		.filter(l=> l.loader=='stylus-loader')

	const nib = require('nib')

	stylusLoaders.forEach((l, i)=> {
		const {options} = l
		// options.use = options.use || []
		// options.use.push(nib())
		options.import = options.import || []
		options.import.push('~nib/lib/nib/index.styl')
		options.import.push('~@/style/index')
	})
}
