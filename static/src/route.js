export default {
  path: '/',
  component: require('./components/app').default,
  indexRoute: {
    component: require('./components/movieList').default
  },
  childRoutes: []
}