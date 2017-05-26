<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Change Contact</h1>
    <div slot="body">
      <div class="field-group">
        <legend>Email</legend>
        <input
          v-model="email"
          v-validate="'required|email'"
          name="email"
          type="email"
          ref="default"
          autocomplete="off"
          autocapitalize="off">
        <validation name="email" :errors="errors"></validation>
      </div>

      <!-- <div class="field-group">
        <legend>Phone</legend>
        <input
          v-model="phone"
          v-validate="'required'"
          name="last name"
          type="text"
          autocomplete="off"
          autocapitalize="off">
        <validation name="last name" :errors="errors"></validation>
      </div> -->

    </div>
  </modal>
</template>

<script>
import app from '@/app'
import session from '@/session'

export default {
  name: 'modal-contact',
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      loading: true,
      email: this.model.email
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
      const user = {
        email: this.email
      }
      return this.model.save(user, { path: '/email' })
      .then((response) => {
        session.$user = response
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
