<template lang="pug">
.modal(v-if="options.visible"
	:class="{deactive, useFullWidth}",
	:style="{width: maxWidth+'px', marginLeft: maxWidth/-2+'px'}")

	.title: slot(name='title') {{ options.title }}
	
	.subtitle: slot(name='subtitle'): span(v-if="options.subtitle",
		v-html="$options.filters.md(options.subtitle)")
	
	.content.text: slot(name='text'): div(v-if="options.text",
		v-html="$options.filters.md(options.text)")
	
	.content: slot: component(
		v-if="options.contentView",
		:is="options.contentView",
		:options="options.contentViewOptions")
	
	.buttons: slot(name='buttons')
		ui-button(
			v-for="button in preparedButtons",
			:key="button.title",
			:title="button.title",
			:kind="button.kind",
			:handler="button.handler")

	.deactive-overlay
	.close(v-if="options.showsClose", @click="$emit('dismiss')")

</template>
<script>
import UI from '../UI'

export default {
	name: 'Modal',
	components: UI,
	filters: {
		md (t) {
			return t
				.replace(/</ig, '&lt;')
				.replace(/>/ig, '$gt;')
				.replace(/\n/ig, '<br/>')
		},
	},
	props: {
		options: {
			type: Object,
			default () {
				return {
					title: 'Title',
					buttons: [],
					visible: true,
					showsClose: true,
					width: null,
				}
			},
		},
		deactive: { type: Boolean, default: false },
	},
	data () {
		return {
			// mediaQueryList: null,
			useFullWidth: false,
		}
	},
	computed: {
		maxWidth () { return this.options.width || 650 },
		preparedButtons () {
			const dismiss = ()=> this.$emit('dismiss')
			return (this.options.buttons || ['OK']).map(x=> {
				if (typeof x == 'string') return {
					title: x,
					handler: dismiss,
				}

				const org = x.handler
				if (!org) x.handler = dismiss
				else x.handler = ()=> org(dismiss)
				return x
			})
		},
	},
	mounted () {
		if (typeof window !== 'undefined') {
			this.mediaQueryList = window.matchMedia(`(max-width: ${this.maxWidth}px)`)
			this.mediaQueryList.addListener(this.updateMatches)
			this.updateMatches()
		}
	},
	beforeDestroy () {
		if (this.mediaQueryList)
			this.mediaQueryList.removeListener(this.updateMatches)
	},
	methods: {
		updateMatches () { this.useFullWidth = this.mediaQueryList.matches },
	},
}
</script>
<style lang="stylus" scoped>

// Penner easing equation via http://matthewlein.com/ceaser/
//$easeOutQuad = cubic-bezier(0.250, 0.460, 0.450, 0.940)

.modal
	$b-radius = 4px
	min-height 200px
	border-radius $b-radius
	background-color #fafafa
	box-sizing border-box
	absolute top 90px left 50%
	box-shadow 0 0 210px 0 rgba(0, 0, 0, 0.21)
	transition transform 0.3s, -webkit-filter 0.3s, box-shadow 0.3s
	padding-bottom 70px
	&.useFullWidth
		// width 100% !important
		// margin-left 0px !important
		left 0px
		// top 0px
		// border-radius 0px
		width 90% !important
		margin 5% !important
		top 50%
		transform translateY(-50%)
		
	
	.title
		font-modal-title()
		margin 20px 40px
		font-size 200%
		font-weight 500
		color $accent-color
		noselect()
	.subtitle
		font-modal-title-sub()
		margin 20px 40px
		margin-top 3px
		
	.content
		margin 20px 40px
		&.text
			white-space pre-line

	.buttons
		width 100%
		text-align center
		absolute bottom 24px
		.button
			margin-left 10px
			
			&:first-child
				margin-left 0

	.deactive-overlay
		transition opacity .3s
		opacity 0
		pointer-events none
		
	&.deactive
		box-shadow 0 3px 20px 0 rgba(0,0,0,0.07)
		-webkit-filter brightness(0.7) saturate(0.9)
		transform scale(0.95) translateY(-20px)
		pointer-events none
		.deactive-overlay
			border-radius $b-radius
			background $overlay-bg
			absolute top 0px left 0px
			size 100%
			opacity 1
			
	.close
		absolute top 23px right 23px
		size 29px
		bg-image "ui/modal-close" "svg"
		background-size 12px 12px
		cursor pointer
		transition box-shadow .2s
		
		&:active, &:hover
			transform translateY(-0.2px)
			
.content
	>>> .ui-image-input
		margin 0 auto
		margin-bottom 24px

	>>> .row
		margin-bottom 20px
		width 100%
		&.c2 > *
			width calc(50% - 12px/2)
			margin-right 12px
			&:last-child
				margin-right 0px

</style>
