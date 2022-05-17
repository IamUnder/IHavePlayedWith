import Home from './views/Home.vue'
import Main from './views/Main.vue'
import NotFound from './views/NotFound.vue'
import old from './views/old.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  {
    path: '/:user&team=:team',
    meta: { title: 'Main' },
    component: Main,
  },
  {
    path: '/old',
    meta: { title: 'old' },
    component: old,
  },
  { path: '/:path(.*)', component: NotFound },
]
