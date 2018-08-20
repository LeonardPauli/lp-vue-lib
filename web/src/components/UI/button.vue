<template lang="pug">

.button(
	v-if="visible",
	@click.prevent.stop="handler($event)",
	@mousedown="triggerGradient($event)",
	:class="[kind, disabled && 'disabled']",
	:style="styleMain"
	:floating="floating"
	) {{ title }}
	slot

</template>
<script>

const styleGet = ({
	me, conf=me.$lplibc.ui.button, kind=me.kind, sub='main',
})=> ({
	...conf.kind.default? conf.kind.default.style[sub]: {},
	...kind && conf.kind[kind]? conf.kind[kind].style[sub]: {},
})

export default {
	props: {
		disabled: {type: Boolean, default: false },
		visible: {type: Boolean, default: true },
		floating: {type: [Boolean, String], default: false },
		title: {type: String, default: '' },
		handler: {type: Function, required: true },
		kind: {type: String, default: '' }, // destructive, discreet, ''
	},
	data: ()=> ({}),
	computed: {
		styleMain () { return styleGet({me: this}) },
		styleGradient () { return styleGet({me: this, sub: 'gradient'}) },
	},
	methods: {
		triggerGradient (e) {
			const gradient = document.createElement('div')
			gradient.className = 'gradient'
			gradient.style.backgroundImage = this.styleGradient.backgroundImage
			this.$el.appendChild(gradient)
			
			gradient.style.marginLeft = e.offsetX+'px'
			gradient.style.marginTop = e.offsetY+'px'

			setTimeout(()=> {
				gradient.classList.add('flash')
				setTimeout(()=> gradient.remove(), 800)
			}, 10)
		},
	},
}

</script>
<style lang="stylus" scoped>

.button
	font-modal-button-title()
	display inline-block
	transition background-image 0.3s, opacity 0.2s
	box-shadow 0 1px 2px 0 rgba(100,100,100,0.50)
	border-radius 4px
	padding 10px 37px
	position relative
	overflow hidden
	cursor pointer
	text-align center
	color white
	text-transform uppercase
	font-weight 500
	noselect()

	&.disabled
		opacity 0.5
		-webkit-filter saturate(0.6)
		pointer-events none
		

	&[floating="add"]
		bg-image "ui/floating-button-add" "svg"
		
	&[floating="edit"]
		bg-image "ui/floating-button-edit" "svg"
		color transparent
		
	&[floating]:not([floating="false"])
		display block
		border-radius 50%
		line-height 75px
		padding 0px
		absolute bottom 28px right 25px
		transition box-shadow .2s, transform .2s
		&:hover
			box-shadow 0 2.2px 17px 0 rgba(100,100,100,0.55)
			transform translateY(-0.2px)
		&:active
			box-shadow 0 2px 5px 0 rgba(100,100,100,0.3)
			transform translateY(0.2px)
		
		size 75px
		background-size 21px
		&[size="small"]
			size 50px
			background-size 17px
	
	&:focus
		focusedInput()
			
	&.invalid
		invalidInput()
		
	
</style>
<style lang="stylus">
$scopedPrefix = 'ui-button'

@keyframes {$scopedPrefix + 'gradient-anim'}
	0%
		transform scale(1)
		opacity 0
	10%
		opacity 0.2
	60%
		transform scale(15)
	100%
		transform scale(25)
		opacity 0

.{$scopedPrefix}
	.gradient
		background-image radial-gradient(circle, transparent 1%, alpha(white, 1) 10%, transparent 10%)
		absolute top -50% left -50%
		size 100%
		opacity 0
		transition transform 0.2s, opacity 0.2s
		pointer-events none
		
		&.flash
			animation unquote($scopedPrefix + 'gradient-anim') .7s

</style>
