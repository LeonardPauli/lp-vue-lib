<template lang="pug">

.show-room
	h1 Showroom for the components
	component-item(v-for="item in items", :data="item", :key="item.name")

</template>
<script>
import UI from '@/components/UI'


const ComponentItem = {
	props: {
		data: { type: Object, required: true },
	},
	render (r) {
		const {component, name, props} = this.data
		return r('div', {
			style: {
				border: '1px solid gray',
				margin: '20px',
			},
		}, [
			r('h3', {
				style: {
					margin: '10px',
				},
			}, name),

			r(component, {
				props: (r=> props.forEach(({name, value})=> r[name] = value) || r)({}),
				style: {
					margin: '10px',
				},
			}, 'HASADKDK'),

			r('hr'),

			...props.map(p=> [p, p]).map(([p, {name, type, default: _def, value}])=> r('input', {
				attrs: {
					placeholder: `${name}: ${_def || type.name}`,
				},
				props: { value },
				on: {
					// eslint-disable-next-line no-eval
					input: ({target})=> p.value = target.value && eval(target.value),
				},
				style: {
					margin: '5px',
				},
			})),
		])
		 
	},
}


const items = Object.keys(UI).map(name=> ({
	name,
	component: UI[name],
	props: Object.keys(UI[name].props)
		.map(k=> [k, UI[name].props[k]])
		.map(([name, {type=String, default: _def='', value}])=> ({
			name, type, default: _def,
			value: value || _def || '',
		})),
}))


export default {
	name: 'Hello',
	components: {
		ComponentItem,
		...UI,
	},
	data () {
		return {
			items,
		}
	},
}

</script>
<style scoped lang="stylus">

.show-room
	background $base-bg

</style>
