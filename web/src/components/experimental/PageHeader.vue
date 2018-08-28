<template lang="pug">

.page-header
	.title {{title}}
	.subtitle {{subtitle}}

</template>
<script>

export default {
	props: {
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
.page-header
	margin-top 100px
	
	@media (max-width: 650px)
		margin-top 20px

	.title
		text-align center
		font-size 250%
		font-weight 500
		color $dark-text

	.subtitle
		text-align center
		font-weight 500
		margin-top 5px
		font-size 120%
		color $dark-text
	

</style>
