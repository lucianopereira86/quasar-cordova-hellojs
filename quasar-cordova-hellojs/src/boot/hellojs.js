import hello from 'hellojs'
import { hellojs } from '../../package.json'

hello.init(hellojs)

export default ({ Vue }) => {
  Vue.prototype.$hello = hello
}
