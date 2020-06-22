import axios from "axios"

const ajax = axios.create({
  baseURL:'/api',
  timeout: 15000
})

ajax.interceptors.response.use((response)=>{
  return response.data
},(err)=>{
  console.log('请求出错'+err.message || '未知错误')
  return Promise.reject(err)
})
export default ajax