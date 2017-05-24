<template>
  <div>
    <div class="grid">
      <div class="grid__col grid__col--1-of-1">
        <div class="field-group">
          <legend>Basic Modals</legend>
          <button @click="showModalConfirm">Show Confirm</button>
          <button @click="showModalAlert">Show Alert</button>
        </div>
        <div>Accepted: {{ accepted_modal }}</div>
      </div>
    </div>
    <div class="grid">
      <div class="grid__col grid__col--1-of-1">
        <div class="field-group">
          <legend>Basic Modals</legend>
          <button @click="custom_modal_visible = true">Show Custom</button>
        </div>
        <div>Accepted: {{ custom_accepted }}</div>
      </div>
    </div>
    <alert v-if="alert_visible"></alert>
    <modal v-if="custom_modal_visible" :close="closeCustom" :confirm="confirmCustom">
      <h1 slot="header">Test custom header</h1>
      <div slot="body" class="text-left">
        <div class="field-group">
          <legend>
            Text
          </legend>
          <input type="text" value="Text">
        </div>
        <div class="field-group">
          <input type="checkbox" id="checkbox_1">
          <label for="checkbox_1">Checkbox 1</label>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import app from '@/app'
import { mapGetters } from 'vuex'

import test from './modals/test'
export default {
  name: 'ui-modals',
  data() {
    return {
      accepted_modal: false,
      custom_accepted: false,
      custom_modal_visible: false
    }
  },
  computed: {
    ...mapGetters({
      alert_visible: 'app:alert_visible'
    })
  },
  methods: {
    showModalConfirm() {
      app.confirm('This is a test confirm', this.confirm, 'Test Confirm Title', ['Yes', 'No'])
    },
    confirm() {
      this.accepted_modal = true
    },
    cancel() {
      this.accepted_modal = false
    },
    showModalAlert() {
      app.alert('This is a test modal to show what you can do with modals.', this.confirm, 'Test Alert Title')
    },
    closeCustom() {
      this.custom_modal_visible = false
    },
    confirmCustom() {
      this.custom_accepted = true
    }
  }
}
</script>

<style>
.grid {
  margin-bottom: 20px;
}
</style>
