import VueRouter from 'vue-router'
import login from '../pages/login'
import BlogList from '../pages/BlogList'
import BlogDetail from '../pages/BlogDetail'
import BlogEdit from '../pages/BlogEdit'
import userDetail from '../pages/UserDetail'
import List from '../components/List'
import UserSort from '../pages/UserSort'


const myrouter = new VueRouter({
    routes:[
        {
            path:'/',
            component:login
            // 重定向到某个组件
            //redirect:{name:''}
            
        },
        {
            path:'/blogList',
            component:BlogList,
            meta:{
                isAuth:true
            },
            
        },
        {
            path:'/blogDetail',
            component:BlogDetail,
            meta:{
                isAuth:true
            }
        },
        {
            path:'/blogEdit',
            component:BlogEdit,
            meta:{
                isAuth:true
            }
        },
        {
            path:'/userDetail',
            component:userDetail,
            meta:{
                isAuth:true
            },
            children:[
				{
					path:'/list',
					component:List,
				}
			]
        },
        {
            path:'/myDetail',
            component:userDetail,
            meta:{
                isAuth:true
            },
            children:[
				{
					path:'/list',
					component:List,
				}
			]
        },
        {
            path:'/userSort',
            component:UserSort,
            meta:{
                isAuth:true
            }
        }
        
    ]
})

myrouter.beforeEach((to,from,next)=>{
    if(to === '/' || to === '/#/'){
        next()
    }
	if(to.meta.isAuth){ //判断是否需要鉴权
		if(localStorage.getItem('token')==='' || localStorage.getItem('token')===null){
			alert('请登录')
            window.location.href="/#/"
		}else{
            next()
        }
	}else{
		next()
	}
})


export default myrouter