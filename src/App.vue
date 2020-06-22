<template>
  <div id="root">
      <router-view></router-view>
    <TabBar v-if="this.$router.history.current.fullPath !== '/search' && this.$router.history.current.fullPath.indexOf('/login') === -1"/> 
  </div>
</template>

<script>
import TabBar from "@/components/TabBar"
export default {
  components:{
    TabBar
  },
}
</script>

<style lang="stylus" scoped>
  #root
    margin-bottom 97px
    width 100%
    background #eee
    height 100%
</style>
