import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import { router } from './router/router.js'

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.mount('#app')
