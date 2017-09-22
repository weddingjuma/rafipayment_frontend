<template>
  <form class="forgot panel small" @submit.prevent="submit">
    <logo></logo>
    <div class="field-group">
		  <legend>Email</legend>
      <input
        v-model="email"
        v-validate="'required|email'"
        name="email"
        type="text"
        autocomplete="off"
        autocapitalize="off">
      <validation name="email" :errors="errors"></validation>
		</div>

    <button type="submit" :class="['primary', 'full-width', classHandler]">Submit</button>

    <router-link to="/">Cancel</router-link>
  </form>
</template>

<script>
import session from '@/session'

export default {
  name: 'forgot',
  data() {
    return {
      email: '',
      loading: false
    }
  },
  created() {
    this.user = localStorage.getItem('previous_login')
  },
  computed: {
    classHandler() {
      return {
        loading: this.loading
      }
    }
  },
  methods: {
    async submit() {
      const passed = await this.$validator.validateAll()
      if (passed) {
        this.request()
      }
    },
    request() {
      this.loading = true
      return session.request('users/password', {
        method: 'POST',
        body: {
          email: this.email
        }
      })
      .then(response => {
        this.$store.dispatch('set_forgot_email', this.email)
        this.$router.push('/reset')
      })
      .catch(err => this.handleError(err))
      .then(() => {
        this.loading = false
      })
    },
    handleError(error) {
      this.$validator.errors.add(
        'email',
        error.message,
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
