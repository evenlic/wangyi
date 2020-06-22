import axios from "./axios"


// 首页接口
export const reqIndexData = ()=>axios.get('/getIndexData')

// 首页导航接口
export const reqIndexCateList = ()=>axios.get('/getIndexCateList')

// 分类页导航接口
export const reqNavListData = ()=>axios.get('/getNavListData')

//登陆
export const reqLogin = (userInfo)=>axios.post('/login',userInfo)