<template>
 <el-main>
    <el-card class="space">
      <el-select v-model='current' placeholder='861064999990026' @change='getNewId'>
        <el-option
          v-for='item in options'
          :key='item.value'
          :label='item.label'
          :value='item.value'>
        </el-option>
      </el-select>
    </el-card>
    <div>
    <el-tabs class="card" type='border-card' @tab-click='onTabClick'>
      <el-tab-pane label='基本信息'>
        <!--<baseInfo></baseInfo>-->
        <el-row class="space">
          <el-col :span="6">卡号</el-col>
          <el-col :span="12">{{msisdn}}</el-col>
        </el-row>
        <el-row class="space">
          <el-col :span="6">达量断网状态</el-col>
          <el-col :span="12">{{status}}</el-col>
        </el-row>
        <el-row class="space">
          <el-col :span="6">订购包描述</el-col>
          <el-col :span="12">{{subscriptionDesr}}</el-col>
        </el-row>
        <el-row class="space">
          <el-col :span="6">订购包id</el-col>
          <el-col :span="12">{{subscriptionId}}</el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane name='simulation' label='实时状态查询'>
        <simulation></simulation>
      </el-tab-pane>
      <el-tab-pane name='analysis' label='断网指标分析'>
        <analysis></analysis>
      </el-tab-pane>
    </el-tabs>
    </div>
  </el-main>
</template>

<script>
import http from '@/api/product'
import simulation from '@/components/simulation'
import analysis from '@/components/analysis'

export default {
  name: 'demo',
  components: { simulation, analysis },
  // mounted () {
  //   this.queryBlockedSubscriptions()
  // },
  mounted () {
    this.msisdn = this.options[0].label
    console.log(this.msisdn)
    this.$router.push({
      name: 'demo',
      params: { id: this.msisdn }
    })
    this.queryBlockedSubscriptions()
  },
  data () {
    return {
      imsi: '',
      msisdn: '',
      current: 1,
      options: [{
        value: 1,
        label: '861064999990026'
      }],
      info: [],
      status: 'false',
      subscriptionDesr: '',
      subscriptionId: ''
    }
  },
  methods: {
    onTabClick (tab) {
      if (typeof (tab.name) === 'undefined') {
        this.queryBlockedSubscriptions()
      }
      console.log(tab.name)
      var id = this.msisdn
      console.log('id:' + id)
      this.$router.push({
        name: tab.name,
        params: { id: id }
      })
    },
    // reload(tab) {
    //   this.tabs[tab] = false
    //   this.$nextTick(() => (this.tabs[tab] = true))
    // },
    queryBlockedSubscriptions () {
      this.loading = true
      // console.log('queryBlockedSubscriptions start')
      http.queryBlockedSubscriptions({
        type: 2,
        id: '861064999990026'
      }).then(r => {
        this.loading = false
        // console.log('1:' + this.msisdn)
        if (r.data && r.data.code === 0) {
          // console.log('2:' + this.status)
          var temp = r.data.result.simInfo
          this.imsi = temp.imsi
          this.msisdn = temp.msisdn
          this.status = temp.status
          this.subscriptionDesr = temp.subscriptionDesr
          this.subscriptionId = temp.subscriptionId
        }
      }).catch(r => {
        this.loading = true
      })
    },
    getNewId (value) {
      console.log(value)
      this.imsi = this.info[value].imsi
      this.msisdn = this.info[value].msisdn
      this.customerNo = this.info[value].customerNo
    }
  }
}
</script>
<style scoped lang="scss">
.space{margin-bottom: 20px;}
.card1{height: 100%; width: 100%; position: fixed;}
.card{height:800px;}
</style>
