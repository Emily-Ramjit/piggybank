import axios from 'axios'

axios.defaults.baseURL = 'localhost:8080'

export default {
  getBusinesses () {
    return axios.get(`http://localhost:8080/getBusinesses`)
  },
  getItems (params) {
    return axios.get(`http://localhost:8080/getBusinesses`, { params: params })
  },
  getUserInfo (userId) {
    return axios.get(`http://localhost:8080/getUserInfo/${userId}`)
  },
  getUserTransactions (userId) {
    return axios.get(`http://localhost:8080/getUserTrans/${userId}`)
  },
  addTransaction (params) {
    return axios.get(`http://localhost:8080/newTransaction`, { params: params })
  }
}
