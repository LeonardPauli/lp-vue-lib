// lp-vue-lib
// created by Leonard Pauli, 20 aug 2018
// config default

import {log} from 'string-from-object'
import {
	stupidIterativeObjectDependencyResolve as declarative,
	deepAssign,
} from '@leonardpauli/utils/lib/object'
import {objectKeyPathFixedShallow} from '@leonardpauli/rim/lib/utils/objectKeyPathFix'

import cr from 'chroma-js'

// helpers
export const keyfix = o=> objectKeyPathFixedShallow(o, {vars: {
	// a: v, ...
}})

// inspired by fn from stylus-lang
const cleanColor = color=> cr(typeof color==='object'
	// because of declarative resolve putting in faulty value at first
	// TODO: better way to fix declarative resolve correctly
	&& Object.keys(color).length===0? 'black': color)
const lighten = (color, v=1, type='%', prop='l',
	c = cleanColor(color))=> {
	const hsl = c.hsl()
	const pi = 'hsl'.indexOf(prop)
	if (type == '%') v = prop == 'l' && v > 0
		? (1 - hsl[pi]) * v
		: hsl[pi] * v
	hsl[pi] += v
	return cr.hsl(...hsl)
}
const alpha = (color, v=1, c = cleanColor(color))=> c.alpha(v)


// config get
export const configDefaultGet = ()=> declarative(({ui})=> ({
	ui: keyfix({
		style: keyfix({
			'destructive.color': '#ff3535',
			'accent.color': 'hsl(217, 65%, 55%)',
			'accent.light.color': lighten(ui.style.accent.color, 0.85).css(),
			'accent.lighter.color': lighten(ui.style.accent.color, 0.93).css(),
		}),
		button: keyfix({
			'kind.default.style.main.backgroundColor': '#70A8DB',
			'kind.destructive.style.main.backgroundColor': ui.style.destructive.color,
			'kind.discreet.style.main.backgroundColor': ui.style.accent.light.color,
			'kind.discreet.style.main.color': ui.style.accent.color,
			'kind.discreet.style.gradient.backgroundImage': `radial-gradient(circle, transparent 1%, ${alpha(ui.button.kind.default.style.main.backgroundColor, 0.3).css()} 10%, transparent 10%)`,
		}),
	}),
}), {n: 2})


// usage: default({k: v}) -> extended config
export const configExtend = (overlay, config = configDefaultGet())=> {
	// TODO: deepAssign should return target?
	deepAssign(config, overlay)
	return config
}
