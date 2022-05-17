import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import("./views/Home.vue");

Vue.use(VueRouter)
const routes = [
    {
      path: '/',
      component: Home,
    },
  ]

const router = new VueRouter({
  mode:'history',
  routes
})



export default router
