<template lang="pug">

.root(:class="{invalid}")
	label(:for="name", v-if="label!==false")
		| {{ label }}
		.info(v-if="info") {{ info }}
	select(:name="name", :value="selectedIndex", @input="changed")
		option(v-for="item, idx in parsedItems",
			:value="idx",
			:selected="idx == selectedIndex") {{ item.title }}

</template>
<script>

export default {
	props: {
		label: {type: [String, Boolean], default: false},
		info: {type: String, default: ''},
		value: {type: [Object, String, Number, Boolean], required: true},
		items: {type: Array, validator: value=> {
			if (!(value instanceof Array)) return false
			if (!value.length) return true
			const [first] = value
			if (typeof first === 'string') return true
			if (typeof first.value === 'undefined' || !first.title) return false
			return true
		}, default: ()=> []},
		name: {type: String, default: ''},
		invalid: {type: Boolean, default: false},
	},
	data () {
		return {
			selectedIndex: 0,
		}
	},
	computed: {
		// selectedValue () {
		// 	return this.value!==undefined && this.value!==null? this.value:
		// 		this.parsedItems.length? this.parsedItems[0].value: undefined
		// },
		parsedItems () {
			if (!this.items.length) return []
			return this.items.map(item=> {
				if (typeof item === 'string')
					return { value: item, title: item }
				if (item.title === undefined) item.title = item.value || ''
				if (item.value === undefined) item.value = item.title || ''
				return item
			})
		},
	},
	watch: {
		value (value, ov) {
			this.selectedIndex = this.indexOfValue(value, true)
		},
	},
	mounted () {
		this.selectedIndex = this.indexOfValue(this.value, true)
	},
	methods: {
		changed (event) {
			const index = parseInt(event.target.value, 10)
			this.selectedIndex = index
			this.$emit('input', this.valueAtIndex(index))
		},
		indexOfValue (value, forceOne) {
			const index = this.parsedItems.findIndex(o=> o.value===value)
			return forceOne? Math.max(0, index): index
		},
		valueAtIndex (index) {
			if (!this.parsedItems[index]) return undefined
			return this.parsedItems[index].value
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
	
	select
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
		
		&:focus
			focusedInput()
			
	&.invalid select
		invalidInput()

</style>
