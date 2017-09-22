<template>
  <form class="login panel small" @submit.prevent="submit">
    <logo></logo>
    <div class="field-group">
		  <legend>Email</legend>
      <input
        v-model="email"
        v-validate="'required'"
        name="email"
        type="email"
        autocomplete="off"
        autocapitalize="off">
      <validation name="email" :errors="errors"></validation>
		</div>

    <div class="field-group">
		  <legend>Password</legend>
      <password
        v-model="password"
        v-validate="'required'"
        name="password">
      </password>
      <validation name="password" :errors="errors"></validation>
		</div>

    <div class="field-group text-left">
      <input
        type="checkbox"
        id="remember-me"
        v-model="remember_me">
      <label for="remember-me">Remember me</label>
    </div>

    <button type="submit" :class="['primary', 'full-width', classHandler]">Submit</button>

    <router-link to="/forgot">Forgot password?</router-link>
  </form>
</template>

<script>
import session from './../session'

export default {
  name: 'login',
  data() {
    return {
      email: localStorage.getItem('previous_login') || '',
      password: '',
      remember_me: true,
      loading: false
    }
  },
  beforeCreate() {
    if (localStorage.getItem('remember_me') === undefined) {
      localStorage.setItem('remember_me', true)
    }
  },
  created() {
    let value = localStorage.getItem('remember_me') === 'true'
    this.remember_me = value
  },
  computed: {
    classHandler() {
      return {
        loading: this.loading
      }
    }
  },
  watch: {
    remember_me(e) {
      if (this.remember_me) localStorage.setItem('remember_me', true)
      else localStorage.setItem('remember_me', false)
      this.updateCredentials()
    }
  },
  methods: {
    submit() {
      if (this.loading) return
      this.$validator.validateAll()
        .then(() => {
          this.login()
        })
        .catch(() => {})
    },
    login() {
      this.updateCredentials()
      this.loading = true;
      return session.login({
        email: this.email,
        password: this.password
      })
      .catch(() => this.handleError())
      .then(() => {
        this.loading = false
      })
    },
    updateCredentials() {
      if (this.remember_me) {
        localStorage.setItem('previous_login', this.email)
      } else {
        localStorage.removeItem('previous_login')
      }
    },
    handleError() {
      this.$validator.errors.add(
        'password',
        'Invalid username or password',
        'required'
      )
    }
  }
}
</script>
