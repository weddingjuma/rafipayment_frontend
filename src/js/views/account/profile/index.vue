<template>
  <div class="account text-left">
    <!-- <user :model="$user"></user> -->

    <div class="box">
      <div class="table full-width">
        <div class="table-row">
          <div class="table-cell" style="width: 8%">
            <avatar :initials="$user.initials" :color="$user.avatar_color"></avatar>
          </div>
          <div class="table-cell text-left pad-left">
            <!-- <legend>Name</legend> -->
            <div>{{ $user.full_name }}</div>
            <legend>Joined {{ $user.created | moment }}</legend>
          </div>
          <div class="table-cell text-right">
            <button class="small" @click="modal_name_visible = true">Edit</button>
          </div>
        </div>
      </div>
		</div>

    <!-- <div class="field-group">
		  <legend>Last Name</legend>
      {{ $user.last_name }}
		</div> -->

    <div class="box">
      <div class="table full-width">
        <div class="table-row">
          <div class="table-cell" style="width: 8%">
            <svg class="icon-email" viewBox="0 0 94 64">
            	<path class="st0" d="M80.8,60.6H13.2c-5.5,0-10-4.5-10-10V13.1c0-5.5,4.5-10,10-10h67.6c5.5,0,10,4.5,10,10v37.5
            		C90.8,56.1,86.3,60.6,80.8,60.6z"/>
            	<polyline class="st1" points="90.8,15.1 47,51.6 3.2,15.1 	"/>
            </svg>
          </div>

          <div class="table-cell text-left pad-left">
            <!-- <legend>Email</legend> -->
            <div>{{ $user.email }}</div>
            <legend>{{ $user.status.email ? 'Verified' : 'Unverified' }}</legend>
          </div>
          <div class="table-cell text-right">
            <button class="small" @click="modal_contact_visible = true">Edit</button>
          </div>
        </div>
      </div>
		</div>

    <!-- <div class="field-group">
		  <legend>Phone</legend>
      {{ $user.phone || '(none)' }}
		</div> -->

    <div class="box">
      <button class="small" @click="modal_password_visible = true">Change Password</button>
    </div>

    <div class="box">
      <button class="small" @click="logout">Sign Out</button>
    </div>

    <modal-name v-if="modal_name_visible" @close="modal_name_visible = false" :model="$user" :confirm="confirm"></modal-name>
    <modal-password v-if="modal_password_visible" @close="modal_password_visible = false" :model="$user" :confirm="confirm"></modal-password>
    <modal-contact v-if="modal_contact_visible" @close="modal_contact_visible = false" :confirm="confirm" :model="$user"></modal-contact>
  </div>
</template>

<script>
import user from '@/components/cards/user'
import session from '@/session'

import modalName from '@/components/modals/user_name'
import modalPassword from '@/components/modals/set_password'
import modalContact from '@/components/modals/user_contact'

export default {
  data() {
    return {
      modal_name_visible: false,
      modal_password_visible: false,
      modal_contact_visible: false
    }
  },
  models: {
    user() {
      return session.$user
    }
  },
  methods: {
    confirm() {
      console.log('confirmed');
    },
    changeContact() {
      this.$router.push('/account/contact')
    },
    logout() {
      return session.logout()
    }
  },
  components: {
    user,
    modalName,
    modalPassword,
    modalContact
  }
}
</script>

<style scoped lang="scss">
.box {
  padding: 12px;
}

legend {
  font-weight: normal;
  margin-bottom: 0;
}

.avatar {
  width: 100%;
  color: black;
  // margin-right: 10px;
}

.pad-left {
  padding-left: 10px;
}

.icon-email {
  fill: none;
  stroke-width: 4;
  stroke: currentColor;
  padding-top: 4px;
}
</style>
