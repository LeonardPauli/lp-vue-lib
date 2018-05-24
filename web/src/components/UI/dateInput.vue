<template lang="pug">

.root
	ui-input(
		:label="label",
		:name="name",
		:value="tv",
		:placeholder="placeholder",
		@input="changed",
		@blur="didBlur",
		:invalid="styleAsInvalid || invalid",
		:info="overriddenInfo")

</template>
<script>
import uiInput from './input.vue'

export default {
	components: {
		'ui-input': uiInput,
	},
	props: {
		label: {type: [String, Boolean], default: false},
		info: {type: String, default: ''},
		value: {type: String, default: ''},
		name: {type: String, default: ''},
		invalid: {type: Boolean, default: false},
		placeholder: {type: String, default: 'YYYY/MM/dd'},
	},
	data () {
		return {
			tv: '',
			// eslint-disable-next-line vue/no-reserved-keys
			_isInvalid: false,
			// eslint-disable-next-line vue/no-reserved-keys
			_styleAsInvalidTimeout: null,
			styleAsInvalid: false,
		}
	},
	computed: {
		isInvalid: {
			get () {
				return this._isInvalid
			},
			set (value) {
				clearTimeout(this._styleAsInvalidTimeout)
				if (!value) {
					this.styleAsInvalid = false
				} else this._styleAsInvalidTimeout = setTimeout(()=>
					this.styleAsInvalid = true, 200)
				return this._isInvalid = value
			},
		},
		valueAsText: {
			get () {
				const date = this.dateFromText(this.tv)
				return isNaN(date.getTime())? '': date.toDateString()
			},
		},
		currentValue: {
			get () {
				return !this.tv || !this.tv.length? null: this.dateFromText(this.tv)
			},
		},
		overriddenInfo: {
			get () {
				return this.info && this.info.length? this.info: this.valueAsText
			},
		},
	},
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
			if (this.tv.length && new Date(this.tv)-value === 0) return

			if (!value || !(value instanceof Date)) {
				this.tv = ''
				this.isInvalid = false
				return
			}
			
			const isInvalid = isNaN(value.getTime())
			if (isInvalid) return

			this.tv = this.textFromDate(value)
			return this.isInvalid = isInvalid
		},
		textFromDate (value) {
			return !this.value || isNaN(this.value.getTime())? null: this.value.toDateString()
		},
		dateFromText (text) {
			return new Date((text || '').replace(/\//g, '-'))
		},
		changed (text) {
			this.tv = text
			if (!text || !text.length) {
				this.isInvalid = false
				this.$emit('input', null)
				return
			}
			const value = this.dateFromText(text)
			this.isInvalid = isNaN(value.getTime())
		},
		didBlur () {
			this.$emit('input', this.currentValue)
		},
	},
}

</script>
<style lang="stylus" scoped>

.root
	display inline-block
	.ui-input
		width 100%

</style>
