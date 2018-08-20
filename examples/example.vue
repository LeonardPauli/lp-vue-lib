<template>
<div>
	<h1>Hello</h1>
	<ui-button :handler="notice">asdfa</ui-button>
</div>
</template>
<script>
import Vue from 'vue'
import libplugin, {UI, configHelpers} from '@leonardpauli/lp-vue-lib'
import '@leonardpauli/lp-vue-lib/dist/@leonardpauli/lp-vue-lib.css'
const {keyfix} = configHelpers

// TODO: ability to change dynamically + hmr + context layers
Vue.use(libplugin, {config: {
	ui: keyfix({
		style: keyfix({
		}),
		button: keyfix({
			'kind.default.style.main.backgroundColor': '#FFA8DB',
		}),
	}),
} })

export default {
	name: 'hello',
	components: {...UI},
	methods: {
		// eslint-disable-next-line no-console
		notice: ()=> console.log('handler pressed')
	}
}
</script>