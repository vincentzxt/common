import directive from './directives'

const importDirective = Vue => {
  Vue.directive('resize', directive.resize),
  Vue.directive('height', directive.height)
}

export default importDirective