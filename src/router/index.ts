import PageMain from '../views/PageMain.vue'
import pageCreditos from '@/views/pageCreditos.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import PageClientes from '@/views/PageClientes.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
const routes = [
  { path: '/login', component: () => import('@/views/LoginWin.vue') },
  { path: '/', component: PageMain, meta: { requiresAuth: true } },
  { path: '/clientes', component: PageClientes, meta: { requiresAuth: true } },
  { path: '/creditos', component: pageCreditos, meta: { requiresAuth: true }}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

const getCurrentUser = () => {
  return new Promise ((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe  = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, reject);
   })
}

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();
  if (to.meta.requiresAuth && !user) {
    next('/login');
  } else {
    next();
  }
})

export default router
