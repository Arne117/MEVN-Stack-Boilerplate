import axios from 'axios'

// axios.default.baseURL = 'https://api.domain.com'
// axios.default.headers.common['Authorization'] = 'json web token'
// axios.default.headers.get['Accepts'] = 'application/json'

// auth: {
//   username: 'janedoe',
//   password: 's00pers3cret'
// }

// https://github.com/axios/axios#interceptors

export default () => {
  let instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://api.domain.com' : '//localhost:8081'
    // headers: {'X-Requested-With': 'XMLHttpRequest'}
  })

  // instance.default.headers.common['Authorization'] = 'json web token'
  return instance
}
