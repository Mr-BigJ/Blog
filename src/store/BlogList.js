//求和相关的配置
export default {
	namespaced:true,
	actions:{
		
	},
	mutations:{
		getUserInfo(state,val){
			state.userInfo = val
		}
	},
	state:{
		userInfo:''
	},
	getters:{
		
	}
}