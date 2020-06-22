import {reqIndexData} from "@/api"
import {GETINDEXDATAMUTATION} from "../mutation_type"
const state = {
  indexData :{}
}

const mutations = {
  [GETINDEXDATAMUTATION](state,indexData){
    state.indexData = indexData
  }
}

const actions = {
  async getIndexData({commit}){
    const result = await reqIndexData()
    commit(GETINDEXDATAMUTATION,result)
  }
}

const getters ={

}

export default {
  state,
  mutations,
  actions,
  getters
}