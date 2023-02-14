export default{
    namespaced:true,
	actions:{
		
	},
	mutations:{
		storageToken(state,value){
            state.token = value;
            console.log("storageToken被调用了")
        }
	},
	state:{
		token:''
	},
	getters:{
		
	}
}