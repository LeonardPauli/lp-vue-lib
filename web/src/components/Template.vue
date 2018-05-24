<template lang="pug">
div
  h1 Jaaajajaja {{ options }}


</template>
<script>

export default {
	props: {
		options: {type: Object, default: ()=> ({})},
	},
	data () {
		return {}
	},
}

</script>
<style lang="stylus" scoped>

</style>
