// import Vue from 'vue'
import plugin from './plugin'
import {configHelpers} from './config'

import UI from './UI'
import experimental from './experimental'
import Modal from './Modal'

// const components = {a, b, ...}
// Object.keys(components).forEach(k=> Vue.component(k, components[k]))

export {configHelpers, UI, experimental, Modal}
export default plugin
