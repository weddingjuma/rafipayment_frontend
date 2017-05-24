<template>
  <form @submit.prevent="validate">
    <div class="field-group">
      <legend>First Name</legend>
      <input
        v-model="first_name"
        v-validate="'required'"
        name="first name"
        type="text">
      <span class="error" v-show="errors.has('first name')">
        {{ errors.first('first name') }}
      </span>
    </div>

    <div class="field-group">
      <legend>Last Name</legend>
      <input
        v-model="last_name"
        v-validate="'required'"
        name="last name"
        type="text">
      <span class="error" v-show="errors.has('last name')">
        {{ errors.first('last name') }}
      </span>
    </div>
    <div class="field-group">
      <legend>Email</legend>
      <input
        v-model="email"
        v-validate="'required|email'"
        name="email"
        type="email">
      <span class="error" v-show="errors.has('email')">
        {{ errors.first('email') }}
      </span>
    </div>

    <button type="submit">Invite</button>
    <button type="button" @click="close">Cancel</button>
  </form>
</template>

<script>
const defaults = () => ({
  first_name: '',
  last_name: '',
  email: ''
})
export default {
  name: 'invite',
  data() {
    return defaults()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    validate() {
      this.$validator.validateAll()
        .then(() => {
          this.createModel()
        })
        .catch(() => {})
    },
    createModel() {
      this.$store.dispatch('add', {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email
      })
      .then(() => {
        this.close()
      })
      .catch(err => {
        console.warn(err);
      })
    }
  }
}
</script>
