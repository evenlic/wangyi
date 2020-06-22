<template>
  <div class="searchContainer">
    <div  class="header">
      <div class="search">
         <van-form 
          class="searchForm" 
          @submit="onSubmit"
          label-align="center"
        >
          <van-field 
            class="searchInput"
            size='large'
            v-model="value"
            placeholder="CEO补贴，狂欢倒计时" 
            left-icon="search"
            @input= "changeInput"
          >
          </van-field>
          <van-button class="goBack" @click="goBack">
            取消
          </van-button>
        </van-form>
      </div>

      <div class="hot" v-if="!searchAuto.length">
        <h3 class="title">
          热门搜索
        </h3>
        <div class="label">
          <span :class="{red:item.highlight === 1}" v-for="(item, index) in searchLabel" :key="index">{{item.keyword}}</span>
        </div>
      </div>
      <div class="searchAuto" v-else>
        <div class="searchAutoItem" v-for="(item, index) in searchAuto" :key="index">
          <span>{{item}}</span>
          <span>></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { Form,Field, Button } from 'vant';
export default {
  name:"Search",
  components: {
    'van-form':Form,
    'van-field':Field,
    'van-button':Button,
  },
  props: {},
  data() {
    return {
      value:'',
      searchLabel:[],
      searchAuto:[],
      timer:null
    };
  },
  mounted() {
    this.getSearchLabel()
  },
  methods: {
     onSubmit(values) {
      console.log('submit', values);
    },
    async getSearchLabel(){
      const result = await axios.post('/abc/xhr/search/init.json')
      this.searchLabel = result.data.data.hotKeywordVOList
    },
    changeInput(){
      //函数节流
      if(this.timer){
        clearTimeout(this.timer)
        console.log(1)
      }
      this.timer= setTimeout(()=>{
        this.getSearchAuto()
        console.log(2)
      },800)
    },
    async getSearchAuto(){
      const result = await axios({
        url:`/abc/xhr/search/searchAutoComplete.json?keywordPrefix=${this.value}`,
        method:'get',
        headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
      })
      this.searchAuto = result.data.data
    },
    goBack(){
      this.$router.back()
    }
  },
};
</script>

<style lang="stylus">
  .searchContainer
    height 100vh
    background #eee
    .header
      background #fff
      .search
        height 87px
        border-bottom  1px solid #eee
        padding 0 30px
        display flex
        align-items center
        .searchForm
          width 800px
          display flex
          align-items center
          .searchInput
            font-size 30px
            width 600px
            border-radius 5px
            margin-right 20px
            background #eee
            .van-icon 
              font-size 30px
              line-height 30px  
              margin-right 10px
          .goBack
            white-space nowrap
            border 0
            font-size 30px
    .hot
      padding 0 30px
      .title 
        color #999
        font-size 28px
        font-weight 200
        height 90px
        line-height 90px
      .label
        display flex
        flex-wrap wrap
        padding-bottom 30px
        span 
          border 1px solid 
          margin-right 32px
          margin-bottom 32px
          border-radius 5px
          padding 5px 10px
          &.red
            border 1px solid rgb(221, 26, 33);
            color rgb(221, 26, 33);
    .searchAuto
      padding 0 30px
      padding-top 10px
      .searchAutoItem
        display flex
        justify-content space-between
        height 90px
        line-height 90px
        border-bottom 1px solid #eee
        span
          font-size 28px
</style>
