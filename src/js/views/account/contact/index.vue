<template>
  <div class="account text-left">
    <div class="field-group box">
		  <legend>Email</legend>
      <div class="text-left">
        {{ $user.email }}
        <span v-if="$user.email" :class="['flag', statusClass('email')]">{{ $user.status.email ? 'verified' : 'unverified' }}</span>
      </div>
      <button @click="showModal">Change</button>
		</div>

    <user-contact-modal v-if="modal_visible" @close="hideModal" :confirm="confirmChange" :model="$user"></user-contact-modal>
    <!-- <div class="field-group box">
		  <legend>Phone</legend>
      <div class="text-left">
        {{ $user.phone || '(none)' }}
        <span v-if="$user.phone" :class="['flag', statusClass('phone')]">{{ $user.status.phone ? 'verified' : 'unverified' }}</span>
      </div>
		</div> -->

  </div>
</template>

<script>
import session from '@/session'
import userContactModal from '@/components/modals/user_contact'

export default {
  data() {
    return {
      modal_visible: false
    }
  },
  models: {
    user() {
      return session.$user
    }
  },
  methods: {
    showModal() {
      this.modal_visible = true
    },
    hideModal() {
      this.modal_visible = false
    },
    confirmChange() {
      console.log('confirm');
    },
    statusClass(method) {
      return {
        success: this.$user.status[method],
        disabled: !this.$user.status[method]
      }
    }
  },
  components: {
    userContactModal
  }
}
</script>
