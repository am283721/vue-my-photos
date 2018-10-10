import Vue from 'vue'
import App from './App.vue'
import Lightbox from './components/Lightbox.vue'

Vue.component('lightbox', Lightbox);

new Vue({
  el: '#app',
  render: h => h(App)
})
