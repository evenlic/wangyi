import Vue from "vue"
import Vuex from "vuex"
import homeData from "./modules/index"
import cartData from "./modules/cart"

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    homeData,
    cartData
  }
})