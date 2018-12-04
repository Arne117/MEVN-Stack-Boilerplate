// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import VueDraggableResizable from 'vue-draggable-resizable'

import App from './App'
import router from './router'
import { store } from './store/store'

// Vue plugins
Vue.use(VueSweetalert2)
Vue.component('vue-drag-res', VueDraggableResizable)

// Vue config
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
