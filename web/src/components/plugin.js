// lp-vue-lib
// created by Leonard Pauli, 20 aug 2018
// plugin

import {configExtend} from './config'

const LPLibPlugin = {}
LPLibPlugin.install = (Vue, options)=> {
	const {config} = options

	// global methods
	// Vue.myGlobalMethod = ()=> {}

	// global assets
	// Vue.directive('my-directive', {
	//   bind (el, binding, vnode, oldVnode) {
	//     // something logic ...
	//   }
	//   ...
	// })

	// component options injections
	// Vue.mixin({
	// 	created: function () {
	// 	  // something logic ...
	// 	}
	// 	...
	// })

	// instance methods
	// Vue.prototype.$lplib = function $lplib (methodOptions) {
	// 	// something logic ...
	// }
	
	Vue.prototype.$lplibc = configExtend(config)

}

export default LPLibPlugin
