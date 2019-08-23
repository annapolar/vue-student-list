import Vue from 'vue'
import App from './App.vue'
import StudentList from './pages/StudentList.vue'

Vue.config.productionTip = false
Vue.component('StudentList',StudentList)

new Vue({
  render: h => h(App),
}).$mount('#app')
