<template>
  <div class="loginContainer">
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header"

export default {
  name:"Login",
  components:{
    Header,
  },
  data() {
    return {

    };
  },
};
</script>

<style lang="stylus" scoped>
  .loginContainer
    height 100vh
    overflow hidden
    background #eee
    .text
      font-size 0
</style>
