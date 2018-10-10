import Vue from 'vue'
import App from './App.vue'
import Lightbox from 'lightbox'

Vue.component('lightbox', Lightbox);

new Vue({
  el: '#app',
  render: h => h(App)
})
