<template lang="pug">

.root(:class="{invalid}")
	label(:for="name", v-if="label!==false")
		| {{ label }}
		.info(v-if="info") {{ info }}
	input(ref="input",
		:type='type'
		:name="name",
		:value="internalTextValue",
		:placeholder="placeholder",
		@keyup.enter='$emit("enter")'
		@input="changed",
		@blur="onBlur")

</template>
<script>

export default {
	props: {
		label: {type: [String, Boolean], default: false},
		info: {type: String, default: ''},
		placeholder: {type: String, default: ''},
		value: {type: String, default: ''},
		type: {type: String, default: 'text' },
		name: {type: String, default: ''},
		invalid: {type: Boolean, default: false},
		stringify: {type: Function, default: value=> ''+value},
		parser: {type: Function, default: string=> string},
		delaysInputUntilBlur: {type: Boolean, default: false},
	},
	data () {
		return {
			internalTextValue: null,
		}
	},
	computed: {},
	watch: {
		value (value) {
			this.valueUpdated(value)
		},
	},
	mounted () {
		this.valueUpdated(this.value)
	},
	methods: {
		valueUpdated (value) {
			this.internalTextValue = this.stringify(value)
		},
		changed (event) {
			this.internalTextValue = event.target.value
			if (!this.delaysInputUntilBlur)
				this.$emit('input', this.parser(this.internalTextValue))
		},
		onBlur (event) {
			const parsedValue = this.parser(this.internalTextValue)
			const stringifiedValue = this.stringify(parsedValue)
			this.internalTextValue = stringifiedValue

			if (this.delaysInputUntilBlur)
				this.$emit('input', parsedValue)

			this.$emit('blur', event)
		},
	},
}

</script>
<style lang="stylus" scoped>

.root
	display inline-block
	
	label
		font-size: 13px;
		color: $input-label-text;
		letter-spacing: -0.2px;
		margin-bottom 4px
		display block
		width 100%
		
		.info
			display inline-block
			margin-left 4px
			
	
	input
		display block
		height 42px
		width 100%
		background: $input-background
		border: 0px solid $input_border_color;
		border-radius: 4px;
		padding 12px 12px
		box-sizing border-box
		
		font-size: 13px;
		color: $input-label-text;
		letter-spacing: -0.2px;
		
		transition border .2s, box-shadow .2s
		
		&:focus
			focusedInput()
			
	&.invalid input
		invalidInput()

</style>
