<template lang="pug">

.root(v-if="visible")
	.title {{title}}
	.subtitle {{subtitle}}

</template>
<script>

export default {
	props: {
		visible: { type: Boolean, default: true },
		title: { type: String, default: '' },
		subtitle: { type: String, default: '' },
	},
	data () {
		return {
		}
	},
}

</script>
<style lang="stylus" scoped>

.title
	text-align center
	font-size 200%

.subtitle
	text-align center
	

</style>
