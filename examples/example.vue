<template>
<div>
	<h1>Hello</h1>
	<ui-button :handler="notice">asdfa</ui-button>
</div>
</template>
<script>
import Vue from 'vue'
import libplugin, {UI} from '@leonardpauli/lp-vue-lib'
import '@leonardpauli/lp-vue-lib/dist/@leonardpauli/lp-vue-lib.css'

Vue.use(libplugin, {config: {a: 'hello'}})

export default {
	name: 'hello',
	components: {...UI},
	methods: {
		// eslint-disable-next-line no-console
		notice: ()=> console.log('handler pressed')
	}
}
</script>