import Vue from 'vue'

const Register = ({ commit }, form) => {
  return new Promise((resolve, reject) => {
    form.idUser = Math.random() * (9999 - 1) + 1
    let _users = localStorage.getItem('users')
    let users = _users ? JSON.parse(_users) : []
    if (users.length > 0) {
      let exists = false
      users.forEach(u => {
        if (!exists && u.email.toUpperCase() === form.email.toUpperCase()) {
          exists = true
        }
      })
      if (exists) {
        Vue.prototype.$q.notify({
          message: 'E-mail already registered by another user',
          timeout: 1000
        })
        form = null
      } else {
        addUser(form, users)
      }
    } else {
      addUser(form, users)
    }
    resolve(form)
  })
}

function addUser (form, users) {
  users.push(form)
  localStorage.setItem('users', JSON.stringify(users))
}

const AuthLogin = ({ commit }, form) => {
  return new Promise((resolve, reject) => {
    let user = null
    let _users = localStorage.getItem('users')
    let users = _users ? JSON.parse(_users) : []
    if (users.length > 0) {
      users.forEach(u => {
        if (
          u.email.toUpperCase() === form.email.toUpperCase() &&
          (form.isSocialNetwork ||
            u.password.toUpperCase() === form.password.toUpperCase())
        ) {
          user = u
        }
      })
    }
    if (!user) {
      Vue.prototype.$q.notify({
        message: 'E-mail or password invalid',
        timeout: 1000
      })
    }
    resolve(user)
  })
}

export default {
  Register,
  AuthLogin
}
