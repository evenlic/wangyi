import Buy from "@/pages/Buy"
import Cart from "@/pages/Cart/index"
import Classify from "@/pages/Classify"
import Home from "@/pages/Home"
import Personal from "@/pages/Personal"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Index from "@/pages/Login/Index/index"
import Phone from "@/pages/Login/Phone"
import Email from "@/pages/Login/email"

export default [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/cart',
    component:Cart,
  },
  {
    path:'/buy',
    component:Buy
  },
  {
    path:'/classify',
    component:Classify
  },
  {
    path:'/home',
    component:Home,
    name:Home
  },
  {
    path:'/personal',
    component:Personal
  },
  {
    path:'/search',
    component:Search
  },
  {
    path:'/login',
    component:Login,
    redirect:'/login/index',
    children:[
      {
        path:'index',
        component:Index
      },
      {
        path:'phone',
        component:Phone
      },
      {
        path:'email',
        component:Email
      },
    ]
  }
]