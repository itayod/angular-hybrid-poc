const routePathes: Array<string> = [
  'home',
  'todo-list'
]

let routes: Array<object> = []

routePathes.forEach(path => {
  const parentRoutes = require(`../pages/${path}/route`).default
  const { children } = parentRoutes
  let childRoutes: Array<object> = []

  if (children && children.length > 0) {
    childRoutes = children.map(childRoute => {
      childRoute.name = `${parentRoutes.name}.${childRoute.name}`
      return childRoute
    })
  }

  delete parentRoutes.children
  childRoutes.push(parentRoutes)
  routes = routes.concat(childRoutes)
})

function routerRegister($urlRouterProvider, $stateProvider, $locationProvider): void {
  $urlRouterProvider.otherwise('home')

  routes.forEach(route => {
    $stateProvider.state(route)
  })
  $locationProvider.html5Mode(true);
}

routerRegister.$inject = ['$urlRouterProvider', '$stateProvider', '$locationProvider']

export default routerRegister
