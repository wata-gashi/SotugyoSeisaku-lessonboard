import Vue from 'vue'
import store from './vuex'
import App from './App.vue'
import router from './router'
import EventHub from './EventHub'

Vue.config.productionTip = false
Vue.use(EventHub)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
