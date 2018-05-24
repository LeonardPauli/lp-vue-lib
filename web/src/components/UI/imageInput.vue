<template lang="pug">

.root(:class="{empty: hasImage, editable, isDropping, circular}")
	input(type="file" accept="image/*", :id="inputId", :name="name", @change="inputed")
	label(:for="inputId", ref="label",
		:style="imageAsBackgroundStyle",

		@drop.stop.prevent="dropped($event)"
		@drag.stop.prevent="", @dragstart.stop.prevent=""
		@dragover.stop.prevent="dragOn", @dragenter.stop.prevent="dragOn"
		@dragleave.stop.prevent="dragOff", @dragend.stop.prevent="dragOff"
		)
		.empty-state(v-if="!hasImage && editable")
			.icon
			.title Add photo
		.edit-overlay(v-if="hasImage && editable")
			.icon

</template>
<script>

export default {
	props: {
		value: {type: String, default: ''},
		name: {type: String, default: ''},
		editable: {type: Boolean, default: true},
		borderWidth: {type: Number, default: 0},
		innerStyle: {type: Object, default: ()=> ({})},
		circular: {type: Boolean, default: ()=> true},
	},
	data () {
		return {
			inputId: 'image-input-'+parseInt(Math.random()*100000, 10),
			imageWasSetInternally: false,
			isDropping: false,
		}
	},
	computed: {
		imageAsBackgroundStyle () {
			return {
				...this.innerStyle,
				backgroundImage: 'url('+this.value+')',
				borderWidth: !this.borderWidth && this.borderWidth!==0? '': this.borderWidth+'px',
			}
		},
		hasImage () {
			return (this.value && this.value.length) || this.imageWasSetInternally
		},
	},
	methods: {
		dragOn (e) {
			this.isDropping = true
		},
		dragOff (e) {
			this.isDropping = false
		},
		dropped (e) {
			this.dragOff()
			const {files} = e.dataTransfer
			if (!files.length) return

			this.createImage(files[0])
		},
		inputed (e) {
			const files = e.target.files || e.dataTransfer.files
			if (!files.length) return

			this.createImage(files[0])
		},
		createImage (file) {
			const self = this
			const reader = new FileReader()

			reader.onload = e=> {
      	const imageDataURL = e.target.result
      	this.$refs.label.style.backgroundImage = 'url('+imageDataURL+')'
      	this.imageWasSetInternally = true
      	self.$emit('input', imageDataURL)
			}
			reader.readAsDataURL(file)
		},
	},
}

</script>
<style lang="stylus" scoped>

.root
	size 110px
	position relative
	&:not(.editable)
		pointer-events none
	input
		size 1px
		opacity 0.01
	label
		display block
		absolute top 0px left 0px
		box-sizing: border-box;
		size 100%
		
		border 2px solid white
		
		background #EEEEEE
		
		background-size cover
		background-position center
		background-repeat no-repeat
		
		cursor pointer
		overflow hidden
	

	.empty-state, .edit-overlay
		size 100%
		absolute top 0px left 0px
		pointer-events none
		transition transform .3s
		
		
	.edit-overlay
		background alpha(black, 0)
		transition background .6s
		& > .icon
			$icon_s = 36px
			size $icon_s
			absolute left 50% top 50%
			margin-left (-0.5 * $icon_s)
			margin-top (-0.5 * $icon_s)
			bg-image "ui/image-input-edit" "svg"
			opacity 0
			transform scale(0.95)
			transition transform .3s, opacity .3s

	.empty-state
		& > .icon
			$icon_s = 27px
			size $icon_s
			absolute left 50% top 50%
			margin-left (-0.5 * $icon_s)
			margin-top (-0.5 * $icon_s - 12px)
			bg-image "ui/image-input-add" "svg"
		.title
			$title_h = 14px
			font-size: 14px;
			color: #CFCFCF;
			letter-spacing: 0;
			absolute top 50% left 0px
			width 100%
			margin-top (13px - 0.5 * $title_h)
			text-align center
			noselect()
		

	&.isDropping, & > label:hover
		
		.empty-state
			transform scale(1.05)
			
		.edit-overlay
			background alpha(black, 0.1)
			.icon
				transform scale(1)
				opacity 0.85
				
	&.isDropping > label:after
		content ""
		display block
		absolute top 8% left 8%
		size 84%
		margin-left -2px
		margin-top -2px
		border 2px dashed alpha(#253C54, 0.3)
		

	&.circular
		label:after, label, .edit-over, circularlay
			border-radius 50%
		
</style>
