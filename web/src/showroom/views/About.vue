<template lang="pug">
.about
	h1 This is an about page
	showroom
</template>
<script>
import Showroom from '../../components/experimental/Showroom'

export default {
	name: 'About',
	components: {Showroom},
}
</script>
