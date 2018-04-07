import http from './index'

// const base = 'BundlePackageManagement/v1/'
// const base = '/dm/product/v1/'

export default {
  queryBlockedSubscriptions (params) {
    // return http.post(`/BundlePackageManagement/v1/QueryBlockedSubscriptions`, params)
    return http.post(`/dcpapi/BundlePackageManagement/v1/QueryBlockedSubscriptions`, params)
    // return http.post(base + `getProductInfo`, params)
  },
  querySubscriptionTraffic (params) {
    return http.post(`/dcpapi/SubscriptionTraffic/v1/QuerySubscriptionTraffic`, params)
  },
  queryHistoryTraffic (params) {
    return http.post(`/dcpapi/HistoryTraffic/v1/QueryHistoryTraffic`, params)
  }
}
