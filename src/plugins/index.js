// Plugins
import vuetify from './vuetify'
import router from '../router'
import store from '../store'
import axiosPlugin from './axiosPlugin.js'

export function registerPlugins(app) {
	app.use(vuetify).use(router).use(store).use(axiosPlugin)
}
