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
    baseURL: `http://192.168.2.120/api/26qF7nDDSRh8WXeVE8ldl4z3Em7hsrmoZyqaoZIY/` // https://api.domain.com
    // headers: {'X-Requested-With': 'XMLHttpRequest'}
  })

  // instance.default.headers.common['Authorization'] = 'json web token'
  return instance
}
