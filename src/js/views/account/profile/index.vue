<template>
  <div class="account text-left">

    <div class="box" @click="modal_name_visible = true">
      <div class="table full-width">
        <div class="table-row">
          <div class="table-cell icon-column">
            <avatar :initials="$user.initials" :color="$user.avatar_color"></avatar>
          </div>
          <div class="table-cell text-left pad-left">
            <div>{{ $user.full_name }}</div>
            <legend>Joined {{ $user.created | moment }}</legend>
          </div>
          <div class="table-cell text-right">
            <icon-arrow-right />
          </div>
        </div>
      </div>
		</div>

    <div class="box" @click="modal_contact_visible = true">
      <div class="table full-width">
        <div class="table-row">
          <div class="table-cell icon-column">
            <svg class="icon icon-email" viewBox="0 0 94 64">
            	<path class="st0" d="M80.8,60.6H13.2c-5.5,0-10-4.5-10-10V13.1c0-5.5,4.5-10,10-10h67.6c5.5,0,10,4.5,10,10v37.5
            		C90.8,56.1,86.3,60.6,80.8,60.6z"/>
            	<polyline class="st1" points="90.8,15.1 47,51.6 3.2,15.1 "/>
            </svg>
          </div>

          <div class="table-cell text-left pad-left">
            <div>{{ $user.email }}</div>
            <legend>{{ $user.status.email ? 'Verified' : 'Unverified' }}</legend>
          </div>
          <div class="table-cell text-right">
            <icon-arrow-right />
          </div>
        </div>
      </div>
		</div>

    <div class="box" @click="goToPaymentSettings">
      <div class="table full-width">
        <div class="table-row">
          <div class="table-cell icon-column">
            <svg class="icon icon-money" viewBox="0 0 49.3 104.3">
            	<path d="M4.3,79.6c0,0,8,8.8,21.2,8.8c9.9,0,17.7-6.1,17.7-15.6c0-22-40.9-16.9-40.9-41.1c0-9.7,8-18.9,20.6-20.3V0.7h4.9v10.7
            		c11.9,0.5,18.5,7.3,18.5,7.3l-2.7,4.2c0,0-6.8-6.8-17.3-6.8C14.4,16,7.4,23.9,7.4,31.6c0,20.4,40.9,15.1,40.9,41
            		c0,10.8-7.8,19.5-20.5,20.5v10.5h-4.9V93.1C8.7,92.2,1,83.4,1,83.4L4.3,79.6z"/>
            </svg>
          </div>

          <div class="table-cell text-left pad-left">Payment Settings</div>
          <div class="table-cell text-right">
            <icon-arrow-right />
          </div>
        </div>
      </div>
    </div>

    <div class="box" @click="modal_password_visible = true">
      <div class="table full-width">
        <div class="table-row">
          <div class="table-cell icon-column">
            <svg class="icon icon-lock" viewBox="0 0 94 116.3">
              <path d="M83.9,48.9h-3.7V35.1c0-18.8-15.3-34.2-34.2-34.2S11.9,16.2,11.9,35.1v13.9h-1.8c-5.1,0-9.2,4.1-9.2,9.2v48
              	c0,5.1,4.1,9.2,9.2,9.2h73.9c5.1,0,9.2-4.1,9.2-9.2v-48C93.2,53.1,89,48.9,83.9,48.9z M15.6,35.1c0-16.8,13.7-30.5,30.5-30.5
              	s30.5,13.7,30.5,30.5v13.9h-7.4V35.1C69.2,22.3,58.8,12,46.1,12S23,22.3,23,35.1v13.9h-7.4V35.1z M65.5,48.9H26.7V35.1
              	c0-10.7,8.7-19.4,19.4-19.4s19.4,8.7,19.4,19.4V48.9z M89.5,106.2c0,3.1-2.5,5.5-5.5,5.5H10.1c-3.1,0-5.5-2.5-5.5-5.5v-48
              	c0-3.1,2.5-5.5,5.5-5.5h73.9c3.1,0,5.5,2.5,5.5,5.5V106.2z M47,67.4c-4.1,0-7.4,3.3-7.4,7.4v14.8c0,4.1,3.3,7.4,7.4,7.4
              	s7.4-3.3,7.4-7.4V74.8C54.4,70.7,51.1,67.4,47,67.4z M50.7,89.6c0,2-1.7,3.7-3.7,3.7s-3.7-1.7-3.7-3.7V74.8c0-2,1.7-3.7,3.7-3.7
              	s3.7,1.7,3.7,3.7V89.6z"/>
            </svg>
          </div>

          <div class="table-cell text-left pad-left">Change Password</div>
          <div class="table-cell text-right">
            <icon-arrow-right />
          </div>
        </div>
      </div>
    </div>

    <div class="box" @click="logout" style="margin-top: 40px;">
      <div class="table full-width">
        <div class="table-row">
          <div class="table-cell text-left">Log Out</div>
          <div class="table-cell text-right">
            <icon-arrow-right />
          </div>
        </div>
      </div>
    </div>

    <modal-name v-if="modal_name_visible" @close="modal_name_visible = false" :model="$user" :confirm="confirm"></modal-name>
    <modal-password v-if="modal_password_visible" @close="modal_password_visible = false" :model="$user" :confirm="confirm"></modal-password>
    <modal-contact v-if="modal_contact_visible" @close="modal_contact_visible = false" :confirm="confirm" :model="$user"></modal-contact>
  </div>
</template>

<script>
import session from '@/session'

import modalName from '@/components/modals/user_name'
import modalPassword from '@/components/modals/set_password'
import modalContact from '@/components/modals/user_contact'

export default {
  name: 'profile',
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
  created() {
    session.update()
  },
  methods: {
    confirm() {
      console.log('confirmed');
    },
    goToPaymentSettings() {
      this.$router.push('/account/payment')
    },
    logout() {
      return session.logout()
    }
  },
  components: {
    modalName,
    modalPassword,
    modalContact
  }
}
</script>

<style scoped lang="scss">
.box {
  padding: 12px;

  &:hover {
    cursor: pointer;
  }
}

legend {
  font-weight: normal;
  margin-bottom: 0;
}

.avatar {
  width: 100%;
  color: black;
}

.pad-left {
  padding-left: 14px;
}

.icon {
  display: inline-block;
}

.icon-column {
  width: 26px;
  text-align: center;
}

.icon-lock {
  fill: currentColor;
  width: 90%;
}

.icon-money {
  fill: currentColor;
  width: 50%;
}

.icon-email {
  fill: none;
  stroke-width: 4;
  stroke: currentColor;
  padding-top: 4px;
}

.icon-power {
  fill: none;
  stroke-width: 6;
  stroke: currentColor;
}
</style>
