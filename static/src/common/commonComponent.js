import movieCard from './movieCard.vue'

const commonComponents = {}

commonComponents.install = function (Vue) {
  Vue.component('movie-card', movieCard)
}

export default commonComponents
