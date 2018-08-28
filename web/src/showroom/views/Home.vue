<template lang="pug">
.home
	//- img(src='../../assets/logo.png')
	//- HelloWorld(msg='Welcome to Your Vue.js App')
	h3 ui-button
	ui-button(title="hello", :handler="handler", :visible="false")
	ui-button(title="hello", :handler="handler", disabled)
	ui-button(title="hello", :handler="handler")
	ui-button(title="hello", :handler="handler", kind="destructive")
	ui-button(title="hello", :handler="handler", kind="discreet")
	
	h3 ui-input
	ui-input
	ui-input(label="Label", info="some info", placeholder="Example value")
	ui-input(value="some value", name="name-eg-form-id", :invalid="true")
	br
	ui-input
	ui-input
	//- TODO: stringify, parser, delaysInputUntilBlur
	//- TODO: different style on label and info

	h3 ui-date-input
	ui-date-input(label="What date?", :info="dateVal", v-model="dateVal")

	h3 ui-image-input
	//- TODO: add assets
	ui-image-input(v-model="img")
	ui-image-input(:circular="false", :editable="false", :borderWidth="2", v-model="img")

	h3 ui-textarea
	ui-textarea(placeholder="some text")

	h3 ui-select
	//- TODO: disabled options / menu titles?
	ui-select(:items="items", :value="'alt2'")
	//- label, info, name, invalid

	h3 ui-choices
	ui-choices(:items="items", :value="['alt2']")

	h3 mainInfo
	main-info(title="Some Title", subtitle="with some subtitle")

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/experimental/HelloWorld.vue'
import UI from '@/components/UI'
import mainInfo from '@/components/UI/mainInfo'

export default {
	name: 'Home',
	components: {
		...UI,
		HelloWorld,
		mainInfo,
	},
	data: ()=> ({
		img: void 0,
		items: [
			{title: 'Alt 1', value: 1},
			{title: 'Alt 2', value: 'alt2'},
			{title: 'Alt 3', value: 3},
		],
		dateVal: void 0,
	}),
	methods: {
		handler () { console.log('hello') },
	},
}
</script>
<style lang="stylus" scoped>
.home
	.ui-button, .ui-input
		margin-right 10px
		margin-bottom 10px
	.ui-image-input, .ui-textarea
		display inline-block
</style>
