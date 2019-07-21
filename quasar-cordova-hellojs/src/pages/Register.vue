<template>
  <q-page class="flex flex-center q-px-lg">
    <div class="row">
      <div class="col-12 q-my-md text-center">
        <span class="text-h6">Register by social network</span>
      </div>
      <div class="col-6 q-mb-sm text-center">
        <q-btn
          round
          @click="authSocialNetwork('facebook')"
          size="md"
          color="primary"
          icon="fab fa-facebook-square"
        ></q-btn>
      </div>
      <div class="col-6 q-mb-sm text-center">
        <q-btn
          round
          @click="authSocialNetwork('google')"
          size="md"
          color="deep-orange"
          icon="fab fa-google"
        ></q-btn>
      </div>
      <div class="col-12 q-my-md text-center">
        <span class="text-h6">Or by the system</span>
      </div>
      <div class="col-12">
        <q-input
          color="dark"
          label="Name"
          v-model="form.name"
          @input="$v.form.name.$touch()"
          :error="$v.form.name.$error"
          maxlength="100"
          clearable
        ></q-input>
      </div>
      <div class="col-12">
        <q-input
          color="dark"
          type="email"
          label="Email"
          v-model="form.email"
          @input="$v.form.email.$touch()"
          :error="$v.form.email.$error"
          maxlength="50"
          clearable
        ></q-input>
      </div>
      <div class="col-12 q-mb-sm">
        <q-input
          :type="isPwd ? 'password' : 'text'"
          label="Password"
          v-model="form.password"
          maxlength="20"
          :error="$v.form.password.$invalid"
          clearable
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="col-12 q-mb-sm">
        <q-input
          :type="isConfPwd ? 'password' : 'text'"
          label="Confirm Password"
          v-model="form.confirmPassword"
          maxlength="20"
          :error="$v.form.confirmPassword.$invalid"
          clearable
        >
          <template v-slot:append>
            <q-icon
              :name="isConfPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isConfPwd = !isConfPwd"
            />
          </template>
        </q-input>
      </div>
      <div :class="[{ hide: hideWarning() }, 'q-mb-lg']">
        <small class="text-red">* The passwords are not the same!</small>
      </div>
      <div class="col-12 q-mb-sm">
        <q-btn
          label="Save"
          color="primary"
          class="full-width"
          @click="register()"
          :disable="isDisabled()"
          :outline="isDisabled()"
        ></q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { required, sameAs, minLength, maxLength, email } from 'vuelidate/lib/validators'
import {
  mapActions
} from 'vuex'
import SocialNetwork from '../mixins/SocialNetwork'
export default {
  props: {
    openDialog: Function
  },
  mixins: [SocialNetwork],
  data () {
    return {
      isPwd: true,
      isConfPwd: true,
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAtivo: true
      },
      formReset: {}
    }
  },
  mounted () {
    this.formReset = { ...this.form }
    this.$v.form.$touch()
  },
  methods: {
    ...mapActions('Auth', ['Register']),
    register () {
      let _form = { ...this.form }
      this.sendRegister(_form)
    },
    sendRegister (form) {
      this.$q.loading.show()
      this.Register(form)
        .then((user) => {
          if (user) {
            this.$q.notify({ message: 'Registered with success', color: 'positive', timeout: 1000 })
            this.$router.replace('/')
          }
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => this.$q.loading.hide())
    },
    authSocialNetwork (network) {
      let callback = (json) => {
        let title = 'Hello'
        let message = `Welcome, ${json.name}. Would you like to register now?`
        this.openDialog(title, message, () => {
          let _form = { ...this.formReset }
          _form.name = json.name
          _form.email = json.email
          this.sendRegister(_form)
        })
      }
      if (network === 'facebook') { this.authFacebook(callback) } else { this.authGoogle(callback) }
    },
    isDisabled () {
      return this.$v.form.$invalid || this.$v.form.$error
    },
    hideWarning () {
      return !this.$v.form.password.required || !this.$v.form.confirmPassword.required ||
        this.$v.form.password.sameAs
    }
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(100)
      },
      email: {
        email,
        required,
        maxLength: maxLength(50)
      },
      password: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(20),
        sameAs: sameAs('confirmPassword')
      },
      confirmPassword: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(20),
        sameAs: sameAs('password')
      }
    }
  }
}
</script>
<style>
.hide {
  display: none;
}
</style>
