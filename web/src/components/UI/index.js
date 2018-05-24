import button from './button'
import input from './input'
import select from './select'
import textarea from './textarea'
import imageInput from './imageInput'
import dateInput from './dateInput'

const uis = {button, input, textarea, imageInput, dateInput, select}

const out = {}
Object.keys(uis).forEach(key=> {
	const name = 'ui-'+key.replace(/([A-Z])/g, (whole, g1)=> '-'+g1.toLowerCase())
	const item = uis[key]

	// Add name and name as class to root element
	item.name = name
	const prepareEl = originalHandler=> function Handler (...args) {
		const {name} = this.$options
		this.$el.classList.add(name)
		if (originalHandler) originalHandler.apply(this, args)
	}
	item.mounted = prepareEl(item.mounted)
	item.updated = prepareEl(item.updated)

	out[name] = item
})
export default out
