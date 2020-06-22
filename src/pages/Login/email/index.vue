<template>
  <div class="phoneContainer">
    <div class="logo">
      <img src="../../../static/image/logo2.png" alt="">
    </div>
    <div class="from">
      <van-form @submit="onSubmit" >
        <van-field
          class="formInput"
          v-model="username"
          name="username"
          placeholder="请输入邮箱"
          :rules="[{ required: true, message: '请填写邮箱'},{pattern:/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,message:'格式错误'}]"
        />
        <van-field
          class="formInput"
          v-model="code"
          name="code"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' },{pattern:/^[0-9a-zA-Z_]{1,}$/,message:'密码格式错误'}]"
        >
        </van-field>
        <div class="cut" style="margin: 16px;">
          <span>注册账号</span>
          <span>忘记密码</span>
        </div>
        <div style="margin: 16px;">
          <van-button class="formBtn" round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
        <van-field
          :rules="[{ required: true, message: '请阅读服务条款' }]"
        >
          <template #input>
            <van-checkbox style="font-size:24px" v-model="checked" icon-size="28px" shape="square">我同意《服务条款》和《隐私政策》</van-checkbox>
          </template>
        </van-field>
      </van-form>
    </div>
    <div class="switch">
      <span @click="switchToEmail">
        其他方式登陆>
      </span>
    </div>
  </div>
</template>

<script>
import {reqLogin} from "@/api"
import {Form,Field,Button,Checkbox} from "vant"
export default {
  name:"Email",
  components: {
    "van-form":Form,
    "van-field":Field,
    "van-button":Button,
    "van-checkbox":Checkbox
  },
  props: {},
  data() {
    return {
      username:'',
      code:'',
      checked:false,
    };
  },
  methods: {
    //表单提交的回调
    onSubmit(){
      this.login()
    },
    //请求登陆接口方法
    async login(){
      const userInfo={
        username:this.username,
        password:this.code
      }
      const result = await reqLogin(userInfo)
      localStorage.setItem('userInfo',JSON.stringify(result))
      this.$router.replace('/home')
    },
    //切换登陆方式
    switchToEmail(){
      this.$router.replace('/login')
    }
  },
};
</script>

<style lang="stylus">
  .phoneContainer
    background #fff
    height 100vh
    overflow hidden
    .logo
      margin-bottom 50px
      img
        display block
        margin 0 auto
        margin-top 50px
        width 268px
        height 90px
    .from
      margin-top 150px
      .van-field__error-message
        font-size 26px
      padding 0 30px
      .formInput
        font-size 28px
        margin-top 50px
        line-height 50px
        .getCode
          background #fff
          border 1px solid 
          height 50px
          font-size 28px
          padding 5px 10px
      .formBtn
        background rgb(221, 26, 33)
        font-size 30px
        line-height 30px
        height 100px
        border-radius 10px
        outline none
        border 1px solid rgb(221, 26, 33)
      .cut
        display flex
        justify-content space-between
        line-height 100px
        font-size 28px
    .switch
      font-size 30px
      text-align center
      margin-top 50px
</style>
