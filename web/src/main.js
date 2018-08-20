import Vue from 'vue'
import App from './showroom/App.vue'
import router from './showroom/router'
import './showroom/registerServiceWorker'
import libplugin from './components'

Vue.config.productionTip = false
Vue.use(libplugin, {config: {a: 'hello'}})

new Vue({
	router,
	render: h=> h(App),
}).$mount('#app')
