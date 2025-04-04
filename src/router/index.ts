import { createRouter, createWebHistory } from 'vue-router'

import Login from '../pages/Login.vue'
import Estoque from '../pages/Estoque.vue'
import Cadastro from '../pages/Cadastro.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/cadastro', component: Cadastro },
  { path: '/estoque', component: Estoque },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const logado = localStorage.getItem('logado') === 'true'
  const rotasPrivadas = ['/estoque']

  if (rotasPrivadas.includes(to.path) && !logado) {
    next('/login')
  } else {
    next()
  }
})

export default router

