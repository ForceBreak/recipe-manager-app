import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Toast from 'vue-toastification'
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage";

import App from './App.vue'
import router from './router'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig)
const $storage = getStorage(firebaseApp);
export { $storage }

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app
  .use(pinia)
  .use(router)
  .use(Toast, {
    timeout: 3500,
    hideProgressBar: true,
    icon: false,
    toastClassName: [
      'p-3 flex-items-center min-h-0 cursor-pointer rounded-lg !w-[95%] translate-x-[2.5%] top-20 md:top-0 md:!w-auto md:translate-y-0'
    ],
    closeButton: false
  })
  .mount('#app')
