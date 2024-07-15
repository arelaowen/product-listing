import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import myAPI from '@/services/api'
import { createPinia } from 'pinia'
import UseGlobalComponents from '@/components'
import Vue3Storage from "vue3-storage";

loadFonts()

const pinia = createPinia()
pinia.use(({ store }) => {
  store.$api = app.config.globalProperties.$api;
});

const app = createApp(App)
  .use(router)
  .use(Vue3Storage, {namespace: "lyft_"})
  .use(vuetify)
  .use(myAPI)
  .use(pinia)

// initialize global components
UseGlobalComponents(app)
  
router.isReady().then(() => {
  app.mount('#app');
});