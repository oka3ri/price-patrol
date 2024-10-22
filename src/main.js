// Plugins
import { registerPlugins } from '@/plugins'

// CSS
import '@/assets/css/common.scss'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
