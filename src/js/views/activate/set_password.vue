<template>
  <div class="step">
    <div class="panel small">
      <slot></slot>
      <div class="icon-container">
        <svg viewBox="0 0 183.99 183.99" fill="#f2f2f2">
          <path d="M95,187a92,92,0,1,1,92-92A92.1,92.1,0,0,1,95,187ZM95,13a82,82,0,1,0,82,82A82.09,82.09,0,0,0,95,13Z" transform="translate(-3 -3)"/>
          <path d="M119.75,69V50.53a15,15,0,0,0-15-15H85.25a15,15,0,0,0-15,15V69H55.81v68.75h78.37V69H119.75Zm-39.5-18.5a5,5,0,0,1,5-5h19.5a5,5,0,0,1,5,5V69H80.25V50.53Zm43.93,77.25H65.81V79h58.37v48.75Z" transform="translate(-3 -3)"/>
        </svg>
      </div>

      <loading v-if="loading"></loading>

      <form @submit.prevent="validate">
        <div class="field-group">
    		  <legend>Password</legend>
          <password
            v-model="password"
            v-validate.disable="'required|min:8|password'"
            name="password"
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

        <button type="submit" class="primary full-width" style="margin-top:30px">COMPLETE!</button>
      </form>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'

export default {
  name: 'set-password',
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
    async validate() {
      const passed = await this.$validator.validateAll()
      if (passed) {
        this.savePassword()
      }
    },
    savePassword() {
      this.loading = true
      const body = {
        password: this.password
      }
      session.request('users/activate/password', {
        method: 'POST',
        body
      })
        .then((response) => {
          this.$parent.$user = response
          this.$parent.next()
          // save previous login, maybe password here
        })
        .catch((error) => {
          console.warn(error);
        })
    }
  }
}
</script>
