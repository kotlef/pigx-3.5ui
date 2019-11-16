import Vue from 'vue'
import VueRouter from 'vue-router'
import PageRouter from './page/'
import ViewsRouter from './views/'
import AvueRouter from './avue-router'
import Store from '../store/'
Vue.use(VueRouter)
//创建路由
const createRouter = () => {
  return new VueRouter({
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.keepAlive) {
          from.meta.savedPosition = document.body.scrollTop
        }
        return {
          x: 0,
          y: to.meta.savedPosition || 0
        }
      }
    },
    routes: [...PageRouter, ...ViewsRouter]
  })
}
const Router = createRouter()
AvueRouter.install(Router, Store)
Router.$avueRouter.formatRoutes(Store.state.user.menu, true)
// 重置路由
export function resetRouter () {
  const newRouter = createRouter()
  Router.matcher = newRouter.matcher
  AvueRouter.install(Router, Store)
}
export default Router
