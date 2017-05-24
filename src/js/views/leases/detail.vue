<template>
  <div class="panel small">
    <div class="box lease-detail">
      <header class="text-left">
        <h3>{{ $lease.address }}</h3>
        <div class="term">{{ $lease.term }}</div>
      </header>

      <dl class="pad flex">
        <dt>Monthly Rent</dt>
        <dd>{{ $lease.rent | currency }}</dd>
      </dl>

      <dl
        class="pad flex"
        v-for="charge in $lease.charges.recurring"
        v-if="charge.type !== 'rent'">
        <dt>
          <div>{{ charge.type | replace('_') | capitalize }}</div>
          <div class="description">{{ charge.description }}</div>
        </dt>
        <dd>{{ charge.amount | currency }}</dd>
      </dl>

      <div class="divider"></div>

      <div class="pad flex">AUTOPAY</div>

      <div class="table full-width autopay">
        <div class="table-row">
          <div class="table-cell text-left pad">
            You have autopay
            <span v-if="my_autopay" class="text-color success">enabled</span>
            <span v-else class="text-color danger">disabled</span>
          </div>
          <div class="table-cell text-right pad">
            <button
              @click="toggleAutopay"
              :class="['small', class_autopay_handler]">
              {{ autopay_label }}
            </button>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="pad flex">RENT SPLIT</div>

      <div v-for="tenant in tenants_with_split_and_autopay">
        <user-dl :user="tenant">
          <div v-if="tenant.split !== undefined">
            {{ tenant.split | currency }}
          </div>
          <div v-else>Not Set</div>
        </user-dl>
      </div>

      <div class="table full-width">
        <div class="table-row">
          <div class="table-cell pad text-left">Remaining Rent</div>
          <div class="table-cell pad text-right">
            <span v-if="$lease.rent_remaining === 0">
              <icon-success></icon-success>
            </span> {{ $lease.rent_remaining | currency }}</div>
        </div>
      </div>

      <div class="pad">
        <button @click="showModal">Edit Split</button>
      </div>

      <split-modal
        v-if="modal_visible"
        :model="$lease"
        :confirm="confirmSplitChange"
        @close="closeModal">
      </split-modal>

      <loading v-if="loading"></loading>
    </div>
  </div>

</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import _ from 'lodash'
// import app from '@/app'
import { sleep } from '@/utils'
import session from '@/session'
import LeaseModel from '@/models/lease'
import userDl from '@/components/cards/user_dl'
import splitModal from '@/components/modals/split'

export default {
  name: 'lease-detail',
  models: {
    lease() {
      return new LeaseModel({
        id: this.$route.params.id
      }, {
        basePath: 'account/leases'
      })
    }
  },
  data() {
    return {
      loading: false,
      modal_visible: false,
      autopay_loading: false,
      autopay_needs_confirmation: false
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    tenants_with_split_and_autopay() {
      return this.$lease.tenants_sorted.map((tenant) => {
        tenant.split = this.$lease.split[tenant._id]
        tenant.autopay = this.$lease.autopay[tenant._id] !== undefined
        return tenant
      })
    },
    my_autopay() {
      return _.get(this.$lease.autopay, session.$user.id)
    },
    autopay_label() {
      let output
      if (this.my_autopay) {
        output = this.autopay_needs_confirmation ? 'please confirm' : 'disable'
      } else {
        output = this.autopay_needs_confirmation ? 'please confirm' : 'enable'
      }
      return output
    },
    class_autopay_handler() {
      let output = {}
      if (this.my_autopay) {
        if (this.autopay_needs_confirmation) output.danger = true
      } else {
        if (this.autopay_needs_confirmation) output.success = true
      }
      output.loading = this.autopay_loading
      return output
    }
  },
  methods: {
    fetch() {
      this.loading = true
      this.$lease.fetch()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          this.loading = false
        })
    },
    showModal() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    async toggleAutopay() {
      if (!this.autopay_needs_confirmation) {
        this.autopay_needs_confirmation = true
        return
      } else {
        this.autopay_loading = true
        await this.setAutopay(!this.my_autopay)
        this.autopay_loading = false
        this.autopay_needs_confirmation = false
      }
    },
    async setAutopay(value) {
      const response = await this.$lease.save({
        autopay: value
      })
      await sleep(600) // the server is too fast
      this.$lease.autopay = response.autopay
    },
    // autopay_enable() {
    //   app.$store.dispatch('modal_show', {
    //     header: 'Enable Autopay',
    //     message: 'Are you sure you want to enable autopay?',
    //     actions: {
    //       confirm: this.confirmAutopayOn,
    //       cancel: this.cancel
    //     }
    //   })
    // },
    // autopay_disable() {
    //   app.$store.dispatch('modal_show', {
    //     header: 'Disable Autopay',
    //     message: 'Are you sure you want to disable autopay?',
    //     actions: {
    //       confirm: this.confirmAutopayOff,
    //       cancel: this.cancel
    //     }
    //   })
    // },
    cancel() {
      return
    },
    confirmSplitChange(response) {
      this.$lease.split = response.split
    }
  },
  components: {
    userDl,
    splitModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
.lease-detail {
  .user-dl {
    margin: 14px;
    box-shadow: none;

    .avatar {
      margin: 0;
    }

    .pad-left {
      padding-left: 14px;
    }
  }
}
</style>

<style scoped lang="scss">
.box {
  padding: 0;
}
.pad {
  padding: 14px;
}
h3 {
  margin-bottom: 12px;
}
.term {
  font-size: 0.8em;
}
.autopay {
  font-size: 0.9em;
}
</style>
