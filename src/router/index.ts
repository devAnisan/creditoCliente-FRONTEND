import PageMain from '../views/PageMain.vue'
import pageCreditos from '@/views/pageCreditos.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import PageClientes from '@/views/PageClientes.vue'

const routes = [
  { path: '/', component: PageMain },
  { path: '/clientes', component: PageClientes },
  { path: '/creditos', component: pageCreditos}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
