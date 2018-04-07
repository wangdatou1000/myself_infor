<template>
  <el-main class="main-style">
    <el-row>
      <el-button class="space" v-bind:disabled='!bFlag' @click='start'>启动</el-button>
      <el-row>
        <el-col :span="3">查询结果 ：</el-col>
        <el-col :span="19">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 10}"
            v-model="textarea">
          </el-input>
        </el-col>
      </el-row>

      <el-button class="space" v-bind:disabled='bFlag' @click='stop'>停止</el-button>
    </el-row>
  </el-main>
 </template>

<script>
import http from '@/api/product'

export default {
  name: 'simulation',
  data () {
    return {
      textarea: '',
      id: '',
      time: '',
      count: 0,
      flag: true,
      bFlag: true,
      turecount: 0
    }
  },
  methods: {
    start () {
      this.id = this.$route.params.id
      console.log('start' + this.id)
      this.bFlag = false
      this.time = setInterval(() => {
        this.timeDown()
      }, 2000)
    },
    getInfo () {
      console.log('1' + ++this.count)
      this.loading = true
      var node = ''
      http.querySubscriptionTraffic({
        id: this.id,
        type: 2
      }).then(r => {
        this.loading = false
        if (r.data && r.data.code === 0) {
          var newDate = new Date()
          newDate.setTime(r.data.result.queryTime)
          node = newDate.toLocaleString() +
            '  达量断网状态:' + r.data.result.status +
            '  上行流量:' + this.calB2M(r.data.result.tx) +
            'M  下行流量:' + this.calB2M(r.data.result.rx) +
            'M  总流量:' + this.calB2M(r.data.result.total) +
            'M  \n'
          this.textarea += node
          console.log('2' + ++this.turecount)
          this.flag = true
          // console.log('2' + node)
        }
      }).catch(r => {
        this.loading = true
      })
    },
    timeDown () {
      if (this.flag) {
        this.getInfo()
        this.flag = false
      }
      // this.getInfo()
    },
    calB2M (b) {
      var m = b / 1024 / 1024
      return m
    },
    stop () {
      this.bFlag = true
      clearInterval(this.time)
    }
  }
}
</script>
<style scoped lang="scss">
.space{margin-bottom: 20px;}
</style>
