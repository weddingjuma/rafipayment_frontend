<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Change Password</h1>
    <div slot="body">
      <form @submit.prevent="validate">
        <div class="field-group">
          <legend>Password</legend>
          <password
            v-model="password"
            v-validate.disable="'required|min:8|password'"
            name="password"
            ref="default"
            >
          </password>
          <validation name="password" :errors="errors"></validation>
        </div>

        <div class="field-group">
          <legend>Confirm Password</legend>
          <password
            v-model="password_confirm"
            v-validate.disable="'required|confirmed:password'"
            data-vv-as="password"
            name="confirm password"
            >
          </password>
          <validation name="confirm password" :errors="errors"></validation>
        </div>
      </form>
    </div>
  </modal>
</template>

<script>
import app from '@/app'

export default {
  name: 'modal-password',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      loading: false,
      password: '',
      password_confirm: ''
    }
  },
  watch: {
    password() {
      const name = 'password'
      if (this.errors.has(name)) {
        this.errors.remove(name)
      }
    },
    password_confirm() {
      const name = 'password_confirm'
      if (this.errors.has(name)) {
        this.errors.remove(name)
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async validate() {
      await this.$validator.validateAll()
      await this.confirmChange()
    },
    async confirmChange() {
      this.loading = true

      const data = {
        password: this.password
      }
      return this.model.save(data, { path: '/password' })
      .then((response) => {
        this.loading = true
        app.alert(
          'Please check the new email address for a verification link',
          this.confirm,
          'Verify Email'
        )
      })
    }
  }
}
</script>
