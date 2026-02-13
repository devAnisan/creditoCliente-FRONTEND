import PageMain from '../views/PageMain.vue'
import pageCreditos from '@/views/pageCreditos.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import PageClientes from '@/views/PageClientes.vue'
import LoginWin from '@/views/LoginWin.vue'
import { getAuth } from "firebase/auth";
const routes = [
  { path: '/login', component: LoginWin },
  { path: '/', component: PageMain, meta: { requiresAuth: true } },
  { path: '/clientes', component: PageClientes, meta: { requiresAuth: true } },
  { path: '/creditos', component: pageCreditos, meta: { requiresAuth: true }}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (to.meta.requiresAuth && !user) {
    next('/login');
  } else {
    next();
  }
})

export default router
