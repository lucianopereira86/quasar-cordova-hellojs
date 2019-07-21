export default {
  methods: {
    authFacebook (callback) {
      let hello = this.$hello('facebook')
      hello
        .login({
          scope: 'email',
          redirect_uri: 'https://localhost/'
        })
        .then(() => {
          this.closeWindow()
          console.log('authFacebook => login')
          return hello.api('me')
        })
        .then(json => {
          this.getSocialNetworkUserData(json, callback)
        })
    },
    authGoogle (callback) {
      let hello = this.$hello('google')
      hello
        .login({
          force: false,
          scope: 'email',
          redirect_uri: 'http://localhost/login'
        })
        .then(res => {
          const authRes = hello.getAuthResponse()
          console.log('authGoogle => authRes', authRes)
          this.closeWindow()
          hello.api('me').then(json => {
            console.log('authGoogle => json', json)
            this.getSocialNetworkUserData(json, callback)
          })
        })
    },
    getSocialNetworkUserData (json, callback) {
      console.log('createFormRegister => json', json)
      if (!json.email) {
        let title = 'Warning'
        let message =
          'Could not get email from your authentication. Please, try it again with another acount.'
        this.openDialog(title, message)
        // this.$q.dialog({
        //   title: 'Attention',
        //   message:
        //     'Could not get email from your authentication. Please, try it again with another acount.'
        // })
        return
      }
      callback(json)
    },

    closeWindow () {
      cordova.InAppBrowser.open(
        '',
        '_blank',
        'location=yes,clearsessioncache=yes'
      ).close()
    }
  }
}
