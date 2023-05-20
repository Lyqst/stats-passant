import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  FaChessPawn,
  BiArrowDownSquareFill,
  BiArrowUpLeftSquareFill,
  BiArrowRightSquareFill,
  FaExternalLinkSquareAlt,
  MdInfo,
  HiSolidBackspace  
} from 'oh-vue-icons/icons'
import axios from 'axios'
import VueAxios from 'vue-axios'

addIcons(
  FaChessPawn,
  BiArrowDownSquareFill,
  BiArrowUpLeftSquareFill,
  BiArrowRightSquareFill,
  FaExternalLinkSquareAlt,
  MdInfo,
  HiSolidBackspace  
)

const app = createApp(App)

app.use(router)
app.component('v-icon', OhVueIcon)
app.use(VueAxios, axios)

app.mount('#app')
