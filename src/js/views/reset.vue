<template>
  <div class="reset panel small">
    <logo></logo>
    <form v-if="!authenticated" @submit.prevent="validateCode">
      <div class="field-group">
  		  <legend>Email</legend>
        <input v-model="email" type="email" disabled>
  		</div>

      <div class="field-group">
  		  <legend>Code</legend>
        <input
          v-mask="'NNN–NNN'"
          v-model="code"
          v-validate="'required'"
          name="code"
          type="text">
        <validation name="code" :errors="errors"></validation>
  		</div>

      <button type="submit" class="primary full-width">Submit</button>
    </form>

    <form v-else @submit.prevent="validatePasswords">
      <div class="field-group">
  		  <legend>New Password</legend>
        <password
          v-model="password"
          v-validate="'required|min:8|password'"
          name="password">
        </password>
        <validation name="password" :errors="errors"></validation>
  		</div>

      <div class="field-group">
  		  <legend>Confirm New Password</legend>
        <password
          v-model="password_confirm"
          v-validate="'required'"
          name="password_confirm">
        </password>
        <validation name="password_confirm" :errors="errors"></validation>
  		</div>

      <button type="submit" class="primary full-width">Submit</button>
    </form>

    <router-link to="/forgot">Back</router-link>
  </div>
</template>

<script>
import session from '@/session'
import { mapGetters } from 'vuex'

export default {
  name: 'forgot',
  data() {
    return {
      code: '',
      password: '',
      password_confirm: '',
      authenticated: false
    }
  },
  computed: {
    ...mapGetters({
      email: 'app:forgot_email'
    })
  },
  methods: {
    async validateCode() {
      const passed = await this.$validator.validateAll()
      if (passed) {
        this.submitCode()
      }
    },
    async validatePasswords() {
      const passed = await this.$validator.validateAll()
      if (passed) {
        this.checkPasswords()
      }
    },
    checkPasswords() {
      if (this.password !== this.password_confirm) {
        this.$validator.errors.add(
          'password_confirm',
          'Passwords must match',
          'required'
        )
      } else {
        this.submitPass()
      }
    },
    submitCode() {
      return this.putRequest({
        email: this.email,
        code: this.code
      })
      .then(response => {
        this.authenticated = true;
      })
      .catch(err => this.handleError(err))
    },
    submitPass() {
      return this.putRequest({
        email: this.email,
        code: this.code,
        password: this.password
      })
      .then(response => {
        this.$router.push('/')
      })
      .catch(err => this.handleError(err))
    },
    putRequest(body) {
      return session.request('users/password', {
        method: 'PUT',
        body
      })
    },
    handleError() {
      this.$validator.errors.add(
        'code',
        'Invalid code or email',
        'required'
      )
    }
  }
}
</script>

<style scoped lang="scss">
.primary {
  margin-top: 16px;
}
</style>
