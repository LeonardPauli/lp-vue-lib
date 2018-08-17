import Vue from 'vue'
import App from './showroom/App.vue'
import router from './showroom/router'
import './showroom/registerServiceWorker'

Vue.config.productionTip = false

new Vue({
	router,
	render: h=> h(App),
}).$mount('#app')
