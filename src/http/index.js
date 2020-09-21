
import axios from 'axios'
// import config from '../../config'
import router from '../router/index'
import store from '../store/index'

let instance = axios.create({
    baseURL:'/api',
    timeout:6000
})

instance.interceptors.request.use((config)=>{
    // console.log(config);
    
    config.headers.authorization= store.state.userList.token
    return  config
});
instance.interceptors.response.use((res)=>{
    console.log(res);
    if(res.data.code == '403'){
        router.push('/login')
    }
    return res
})

function get(url,params){
    return instance.get(url,{
        params
    })
}


function post(url,parmas){
    return instance.post(url,parmas)
}




export default {
    get,
    post
}