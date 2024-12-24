import { Loading } from 'notiflix'
export default ({ app }, inject) => {
  const loadStart = function () {
    return Loading.circle('loading...')
  }
  const loadEnd = function () {
    return Loading.remove()
  }
  const loadDot = function (message) {
    return Loading.dots(message)
  }

  inject('loadDot', loadDot)
  inject('loadStart', loadStart)
  inject('loadEnd', loadEnd)
}
