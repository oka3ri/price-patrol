/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'
import store from '../store'
import PluginServerAPI from './serverAPI'
import PlugInTools from './tools'

import dateRangePicker from '@/components/DateRangePicker.vue'
import dateSinglePicker from '@/components/DateSinglePicker.vue'
import pagination from '@/components/Pagination.vue'
import checkboxBtn from '@/components/CheckboxBtn.vue'

export function registerPlugins(app) {
	app
		.use(vuetify)
		.use(router)
		.use(store)
		.use(PluginServerAPI)
		.use(PlugInTools, store)
		.component('date-range-picker', dateRangePicker)
		.component('date-single-picker', dateSinglePicker)
		.component('pagination', pagination)
		.component('checkbox', checkboxBtn)
}
