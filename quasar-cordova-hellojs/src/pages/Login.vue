<template>
  <q-page class="q-pa-none">
    <div class="row q-mx-md">
      <div class="col-12 q-my-md text-center">
        <span class="text-h6">Sign-in by social network</span>
      </div>
      <div class="col-6 text-center">
        <q-btn
          round
          @click="authSocialNetwork('facebook')"
          size="md"
          color="primary"
          icon="fab fa-facebook-square"
        ></q-btn>
      </div>
      <div class="col-6 text-center">
        <q-btn
          round
          @click="authSocialNetwork('google')"
          size="md"
          color="deep-orange"
          icon="fab fa-google"
        ></q-btn>
      </div>
      <div class="col-12 q-mt-md text-center">
        <span class="text-h6">Or by the system</span>
      </div>
      <div class="col-12">
        <q-input
          label="E-mail"
          v-model="form.email"
          :error="$v.form.email.$invalid"
          maxlength="50"
          clearable
        ></q-input>
      </div>
      <div class="col-12 q-mb-sm">
        <q-input
          type="password"
          label="Password"
          v-model="form.password"
          :error="$v.form.password.$invalid"
          maxlength="20"
          clearable
        ></q-input>
      </div>
      <div class="col-12 q-mb-sm">
        <q-btn
          label="Sign In"
          color="primary"
          class="full-width"
          @click="signIn()"
          :disable="isDisabled()"
          :outline="isDisabled()"
        ></q-btn>
      </div>
      <div class="col-12 q-mb-md">
        <q-btn outline label="Register" color="dark" class="full-width" to="register"></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import SocialNetwork from '../mixins/SocialNetwork'
export default {
  props: {
    openDialog: Function
  },
  mixins: [SocialNetwork],
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
  },
  mounted () {
    this.$v.form.$touch()
  },
  methods: {
    ...mapActions('Auth', ['AuthLogin']),
    authSocialNetwork (network) {
      let callback = (json) => {
        let form = {
          email: json.email,
          isSocialNetwork: true
        }
        console.log('form', form)
        this.signIn(form)
      }
      if (network === 'facebook') { this.authFacebook(callback) } else { this.authGoogle(callback) }
    },
    signIn (form) {
      if (!form) { form = this.form }
      this.$q.loading.show()
      this.AuthLogin(form)
        .then((user) => {
          if (user) {
            this.$q.notify({ message: 'Authenticated with success', color: 'positive', timeout: 1000 })
            this.$router.replace('/index')
          }
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => this.$q.loading.hide())
    },
    isDisabled () {
      return this.$v.form.$invalid || this.$v.form.$error
    }
  },
  validations: {
    form: {
      email: {
        email,
        required,
        maxLength: maxLength(50)
      },
      password: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(20)
      }
    }
  }
}
</script>
