<template>
  <el-main class="main-style">
    <el-row>
      <el-row class="space">
        <span class="title">选择时间范围 ：</span>
      </el-row>
      <el-row class="space">
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button class="space" @click='start'>查询</el-button>
      </el-row>
    </el-row>
    <el-row>
      <el-row class="space">
        <span class="title">话单信息 ：</span>
      </el-row>
      <el-row class="space">
        <el-col :span="4">详单 ：</el-col>
        <el-col :span="18">
          <el-input
            type="textarea"
            :autosize="{ minRows: 10, maxRows: 10}"
            v-model="textarea">
          </el-input>
        </el-col>
      </el-row>
    </el-row>
    <el-row>
      <el-row class="space">
        <span class="title">话单时延分析 ：</span>
        <el-button class="space" @click='detail'>开始</el-button>
      </el-row>
      <el-row class="space">
        <el-col :span="4">超出流量 ：</el-col>
        <el-col :span="18">{{exceedTraffic}} M</el-col>
      </el-row>
      <el-row class="space">
        <el-col :span="4">断网阈值 ：</el-col>
        <el-col :span="18">{{bundleTraffic}} M</el-col>
      </el-row>
      <el-row class="space">
        <el-col :span="4">延迟 ：</el-col>
        <el-col :span="18">{{delay}} s</el-col>
      </el-row>
      <el-row class="space">
        <el-col :span="4">实际断网时间 ：</el-col>
        <el-col :span="18">{{actualBlockTime}} s</el-col>
      </el-row>
      <el-row class="space">
        <el-col :span="4">预期断网时间 ：</el-col>
        <el-col :span="18">{{expectBlockTime}} s</el-col>
      </el-row>
    </el-row>
  </el-main>
 </template>

<script>
import http from '@/api/product'
export default {
  name: 'analysis',
  data () {
    return {
      textarea: '',
      id: '',
      startDate: '',
      endDate: '',
      time: [],
      exceedTraffic: '',
      bundleTraffic: '',
      delay: '',
      actualBlockTime: '',
      expectBlockTime: ''
    }
  },
  methods: {
    start () {
      this.id = this.$route.params.id
      // console.log(this.time)
      this.startDate = this.formatTime(this.time[0])
      this.endDate = this.formatTime(this.time[1])
      this.queryHistoryTraffic()
    },
    formatTime (time, format) {
      console.log(time)
      // var aftTime = new Date(time).toISOString().split('T')[0]
      var aftTime = new Date(time)
      // var date = {
      //   'M+': aftTime.getMonth() + 1,
      //   'd+': aftTime.getDate(),
      //   'h+': aftTime.getHours(),
      //   'm+': aftTime.getMinutes(),
      //   's+': aftTime.getSeconds(),
      //   'q+': Math.floor((aftTime.getMonth() + 3) / 3),
      //   'S+': aftTime.getMilliseconds()
      // }
      // if (/(y+)/i.test(format)) {
      //   format = format.replace(RegExp.$1, (aftTime.getFullYear() + '').substr(4 - RegExp.$1.length))
      // }
      // for (var k in date) {
      //   if (new RegExp('(' + k + ')').test(format)) {
      //     format = format.replace(RegExp.$1, RegExp.$1.length === 1
      //           ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
      //   }
      // }

      // var result = aftTime.format('yyyy-MM-dd')
      var result = aftTime.getFullYear() +
      '-' + (aftTime.getMonth() + 1) +
      '-' + aftTime.getDate()
      // console.log('format:' + format)
      // console.log('toLocaleString:' + aftTime.toLocaleString())
      // console.log('toString:' + aftTime.toString())
      // console.log('toDateString:' + aftTime.toDateString())
      // console.log('toUTCString:' + aftTime.toUTCString())
      // console.log('toISOString:' + aftTime.toISOString())
      // console.log('toJSON:' + aftTime.toJSON())
      console.log('result:' + result)
      return result
    },
    calB2M (b) {
      var m = b / 1024 / 1024
      return m
    },
    handleTime (time) {
      var newDate = new Date()
      newDate.setTime(time)
      var node = newDate.toLocaleString()
      return node
    },
    queryHistoryTraffic () {
      this.loading = true
      var node = ''
      http.queryHistoryTraffic({
        id: this.id,
        startDate: this.startDate,
        endDate: this.endDate,
        type: 2
      }).then(r => {
        this.loading = false
        if (r.data && r.data.code === 0) {
          var temp = r.data.result.trafficInfos
          for (var i = 0; i < temp.length; i++) {
            node += temp[i].day +
              '  上行流量:' + this.calB2M(temp[i].tx) +
              'M  下行流量:' + this.calB2M(temp[i].rx) +
              'M  日总流量:' + this.calB2M(temp[i].dailyTotal) +
              'M \n'
          }
          this.textarea = node
        }
      }).catch(r => {
        this.loading = true
      })
    },
    blockDelay () {
      this.loading = true
      http.blockDelay({
        id: this.id,
        type: 2
      }).then(r => {
        this.loading = false
        if (r.data && r.data.code === 0) {
          var temp = r.data.result
          this.exceedTraffic = this.calB2M(temp.exceedTraffic)
          this.bundleTraffic = this.calB2M(temp.bundleTraffic)
          this.delay = temp.delay
          this.actualBlockTime = this.handleTime(temp.actualBlockTime)
          this.expectBlockTime = this.handleTime(temp.expectBlockTime)
        }
      }).catch(r => {
        this.loading = true
      })
    }
  }
}
</script>
<style scoped lang="scss">
.space{margin-bottom: 20px;}
.title{font-size: 20px; font-weight: bold;}
</style>
