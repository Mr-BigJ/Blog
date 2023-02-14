export default{
    namespaced:true,
	actions:{
		
	},
	mutations:{
		storageUser(state,value){
            state.curuser = value;
            console.log("storageUser")
        }
	},
	state:{
		curuser:''
	},
	getters:{
		
	}
}