import PageMain from '../views/PageMain.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import PageClientes from '@/views/PageClientes.vue'

const routes = [
  { path: '/', component: PageMain },
  { path: '/clientes', component: PageClientes },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
