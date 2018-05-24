<template lang="pug">
.Slider
	.page(v-for='Slide in Slides')
	.dots
	.slides
	ui-button(title="➜", floating='true', :handler="nextSlide")
</template>
<script>
import UI from '@/components/UI'
// import Slides from 'pages'

export default {
	components: {...UI}, // ...Slides
	props: {
		pages: {type: String, default: ''},
	},
	data () {
		return {
		}
	},
	methods: {
		nextSlide () {
			this.Alert('hej')
		},
	},
}

</script>
<style scoped lang="stylus">



</style>
