import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routers"

Vue.use(VueRouter)
const router = new VueRouter({
  mode:'hash',
  linkActiveClass:'active',
  routes
})
router.beforeEach((to, from, next)=>{
  const userInfo = localStorage.getItem('userInfo')
  if(to.path==='/personal'){
    if(userInfo){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})
export default router