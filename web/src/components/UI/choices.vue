<template lang="pug">

.root(:class="{invalid}")
	label(:for="name")
		| {{ label }}
		.info(v-if="info") {{ info }}
	.container
		label.box(v-for="item, idx in parsedItems",
			:for="rndName+idx",
			:value="idx",
			:class="{checked: internalValue.indexOf(item.value)>=0}")
			input(type="checkbox",
				:name="name",
				:id="rndName+idx",
				:value="item.value",
				v-model="internalValue",
				:disabled="item.disabled == true")
			| {{ item.title }}

//-
//- @input="changed",
</template>
<script>

export default {
	props: {
		label: {type: [String, Boolean], default: false},
		info: {type: String, default: ''},
		placeholder: {type: String, default: ''},
		value: {type: [Array], default: ()=> []},
		items: {type: Array, validator: value=> {
			if (!(value instanceof Array)) return false
			if (!value.length) return true
			const [first] = value
			if (typeof first === 'string') return true
			if (!first.value || !first.title) return false
			return true
		}, default: ()=> []},
		name: {type: String, default: ''},
		invalid: {type: Boolean, default: false},
	},
	data () {
		return {
			rndName: 'ch'+Math.random().toString(16).substr(2),
			internalValue: [],
		}
	},
	computed: {
		// selectedValue () {
		// 	return this.value!==undefined && this.value!==null? this.value:
		// 		this.parsedItems.length? this.parsedItems[0].value: undefined
		// },
		parsedItems () {
			let items = !this.items.length
				? []
				: this.items.map(item=> {
					if (typeof item === 'string')
						return { value: item, title: item }
					if (item.title === undefined) item.title = item.value || ''
					if (item.value === undefined) item.value = item.title || ''
					return item
				})
			if (this.placeholder) items = [{
				value: this.placeholder,
				title: this.placeholder,
				disabled: true,
			}].concat(items)
			return items
		},
	},
	watch: {
		internalValue (value, ov) {
			this.$emit('input', value)
			// console.log('III', value)
			// this.internalValue = value.slice()
		},
		value (value, ov) {
			if (value.length==ov.length && !value.some((v, i)=> v!=ov[i])) return
			// console.log('YYY', value, ov)
			this.internalValue = value.slice()
		},
		items (value, ov) {
			const filtered = this.internalValue.filter(v=> value.some(o=> o.value==v))
			if (filtered.length != this.internalValue.length)
				this.internalValue = filtered
		},
	},
	mounted () {
		// this.internalValue = this.value.slice()
		// console.log('UU', this.value.slice())
		this.internalValue = this.value.slice()
	},
	methods: {
		// isItemChecked (item) {
		// 	// return this.internalValue.some(x=> x==item.value)
		// },
		// changed (event) {
		// 	const value = event.target.value
		// 	console.log('UUIASUDIA', value, event.target)
		// 	//this.$emit('input', )
		// },
	},
}

</script>
<style lang="stylus" scoped>

.root
	display inline-block
	
	> label
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
		// display block
		// height 42px
		// width 100%
		// background: $base_bg;
		// border: 1px solid $input_border_color;
		// border-radius: 4px;
		// padding 17px 12px
		// box-sizing border-box
		
		// font-size: 13px;
		// color: $input-label-text;
		// letter-spacing: -0.2px;
		
		&:focus
			focusedInput()
			
	&.invalid input
		invalidInput()
		
	.box
		display inline-block
		width 200px
		margin-right 10px
		margin-bottom 7px
		
		padding 10px 12px
		background $base_bg
		border: 1px solid $input_border_color;
		border-radius: 4px;
		box-sizing border-box
		font-size: 13px;
		color: $input-label-text;
		letter-spacing: -0.2px;

		&.checked
			background hsl(92, 100%, 89%)
			border 1px solid hsl(122, 38%, 54%)

		&> input
			margin-right 7px


.theme-dark-bg
	.root
		&> label
			color alpha(white, 0.8)

</style>
