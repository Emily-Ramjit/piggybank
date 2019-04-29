import axios from 'axios'

axios.defaults.baseURL = 'localhost:8080'

export default {
  getBusinesses () {
    return axios.get(`http://localhost:8080/api/getBusinesses`)
  },
  getItems (businessId) {
    return axios.get(`http://localhost:8080/api/getItems/${businessId}`)
  },
  getUserInfo (userId) {
    console.log(userId)
    return axios.get(`http://localhost:8080/api/getUserInfo/${userId}`)
  },
  getUserTransactions (userId) {
    return axios.get(`http://localhost:8080/api/getUserTrans/${userId}`)
  },
  addTransaction (params) {
    return axios.post(`http://localhost:8080/api/newTransaction`, params)
  }
}
