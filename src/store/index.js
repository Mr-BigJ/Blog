//该文件用于创建vuex的核心store
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'

import blogToken from './blogToken'

import userDetail from './userDetail'

import BlogList from './BlogList'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        blogToken,userDetail,BlogList
    }
})
