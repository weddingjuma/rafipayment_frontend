<template>
  <modal @close="closeModal" :confirm="validate">
    <h1 slot="header">Change Name</h1>
    <div slot="body" class="modal-transfer">
      <div class="field-group">
        <legend>First Name</legend>
        <input
          v-model="first_name"
          v-validate="'required'"
          name="first name"
          type="text"
          ref="default"
          autocomplete="off"
          autocapitalize="off">
        <validation name="first name" :errors="errors"></validation>
      </div>

      <div class="field-group">
        <legend>Last Name</legend>
        <input
          v-model="last_name"
          v-validate="'required'"
          name="last name"
          type="text"
          autocomplete="off"
          autocapitalize="off">
        <validation name="last name" :errors="errors"></validation>
      </div>

    </div>
  </modal>
</template>

<script>
import session from '@/session'
import { Deferred } from '@/utils'

export default {
  name: 'modal-name',
  props: {
    model: Object,
    close: Function,
    confirm: Function
  },
  data() {
    return {
      loading: true,
      first_name: this.model.first_name,
      last_name: this.model.last_name
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    async validate() {
      const deferred = new Deferred()
      const passed = await this.$validator.validateAll()
      if (passed) {
        await this.confirmChange()
        deferred.resolve()
      } else {
        deferred.reject()
      }
      return deferred.promise
    },
    async confirmChange() {
      const user = {
        first_name: this.first_name,
        last_name: this.last_name
      }
      const response = await this.model.save(user)
      session.$user = response
      this.confirm()
    }
  }
}
</script>

<style lang="scss">
.modal-transfer {
  .field-group {
    .currency-container {
      display: block;

      input {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
