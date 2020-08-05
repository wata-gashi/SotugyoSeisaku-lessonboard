import Vue from 'vue'
import store from './vuex'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
