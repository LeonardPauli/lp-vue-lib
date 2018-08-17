<template lang="pug">

.root(:class="{invalid}")
	textarea(:name="name", :placeholder="placeholder", :class="{empty: !actualValue || !actualValue.length}", v-model="bindingValue")

</template>
<script>

export default {
	props: {
		placeholder: {type: String, default: ''},
		value: {type: String, default: ''},
		name: {type: String, default: ''},
		invalid: {type: Boolean, default: false},
	},
	data () {
		return {
    	actualValue: '',
		}
	},
	computed: {
  	bindingValue: {
  		get () {
  			return this.actualValue
  		},
  		set (value) {
  			this.actualValue = value
  			this.$emit('input', value)
  		},
  	},
	},
	watch: {
  	value (value) {
  		this.actualValue = value
  	},
	},
	mounted () {
		this.actualValue = this.value
	},
}

</script>
<style lang="stylus" scoped>

.root
	textarea
		display block
		height 42px
		width 100%
		background: $input-background
		border: 1px solid alpha($input_border_color, 0);
		border-radius: 4px;
		padding 12px 17px
		box-sizing border-box
		
		font-size: 13px;
		color hsl(0, 0%, 25%)
		letter-spacing: -0.2px;

		
		min-height 135px
		max-width 100%
		min-width 100%
		
		&.empty
			color alpha($input-label-text, 0.5);

		&:focus
			focusedInput()
			
	&.invalid textarea
		invalidInput()
		
</style>
