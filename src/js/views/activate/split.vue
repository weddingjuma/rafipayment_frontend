<template>
  <div class="step split">
    <div class="panel small">
      <slot></slot>
      <div class="icon-container">
        <svg viewBox="0 0 183.99 183.99" fill="#f2f2f2">
          <path d="M95,187a92,92,0,1,1,92-92A92.1,92.1,0,0,1,95,187ZM95,13a82,82,0,1,0,82,82A82.09,82.09,0,0,0,95,13Z" transform="translate(-3 -3)" />
          <path d="M112.4,115.46a12,12,0,0,0-3.7-8.89Q105,102.95,96.22,100,84,96.29,78.4,90.29T72.81,75.06q0-9.41,5.48-15.44t15.06-7.17V39.88h8.55V52.5q9.64,1.32,15,8.09t5.37,18.54H111.72q0-8.12-3.84-12.9a12.63,12.63,0,0,0-10.39-4.78Q90.65,61.46,87,65t-3.62,9.86a12,12,0,0,0,3.82,9.34q3.82,3.48,12.57,6.32a52.92,52.92,0,0,1,13.66,6.26,22,22,0,0,1,7.23,7.95A23,23,0,0,1,123,115.34q0,9.7-5.83,15.61t-16.33,7v11H92.38V138q-10.67-1-16.73-7.6t-6.05-18H80.21q0,8,4.19,12.28t11.88,4.3q7.52,0,11.82-3.62A12.21,12.21,0,0,0,112.4,115.46Z" transform="translate(-3 -3)"/>
        </svg>
      </div>

      <div class="form-model panel small">
        <h1>Set Your Rent Split</h1>

        <form @submit.prevent="modalOpen" novalidate>
          <div class="field-group">
            <div class="money">
              <currency
                class="split-amount medium mobile-number"
                type="text"
                placeholder="0.00"
                @change="validate"
                name="amount"
                v-validate="'required'"
                v-model="split_input">
              </currency>
              <validation name="amount" :errors="errors"></validation>
            </div>
            <span class="help-text"></span>
          </div>

          <div class="field-group buttons">
            <div class="table full-width">
              <div class="table-row">
                <div class="table-cell text-left">
                  <input type="checkbox" id="autopay" v-model="autopay" checked>
                  <label for="autopay">Autopay</label>
                </div>
                <div class="table-cell text-right" style="width:50%">
                  <div class="action">
                    <button class="primary" type="submit">Set</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div class="divider"></div>

        <div class="table">
          <div class="table-row">
            <div class="table-cell text-left">
              Monthly Rent
            </div>
            <div class="table-cell text-right">
              {{ lease.rent | currency }}
            </div>
          </div>
        </div>

        <div class="table" v-for="(tenant, index) in $lease.tenants_sorted" :key="index">
          <user-dl :user="tenant" class="user">
            {{ prettySplit($lease.splits[tenant._id]) }}
          </user-dl>
        </div>

        <div class="divider"></div>

        <div class="flex">
          <div class="table">
            <div class="table-row">
              <div class="table-cell text-left">Remaining Rent</div>
              <div class="table-cell text-right">{{ $lease.rent_remaining | currency }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <pre class="text-left">
      {{ $lease.splits }}
      {{ $lease.splits_by_tenant_id }}
      {{ $lease.splits_value_array }}
      {{ $lease.total_rent_covered }}
      {{ $lease.missing_splits }}
      {{ $lease.rent_remaining }}
      </pre> -->
    </div>

    <modal v-if="modal_visible" @close="modalClose" :confirm="modalConfirm">
      <h1 slot="header">Confirm your split</h1>
      <div slot="body" class="text-left">
        <p>
          Are you sure you want to set your monthly rent split to
          <strong>{{ $lease.split_amount | currency }}</strong>?
        </p>
        <p v-if="autopay">
          Your rent split amount will be automatically transferred from your bank account,
          <strong>"{{ primary_funding_source.name }}"</strong>, to
          <strong>{{ company.name }}</strong>
          on the {{ lease.bill_due_day | ordinal }} of each month for the duration of your lease.
        </p>

      </div>
    </modal>

    <loading v-if="loading"></loading>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'
import { parseCurrency, prettyCurrency, Deferred, sleep } from '@/utils'
import { mapGetters } from 'vuex'
import userDl from '@/components/cards/user_dl'
import LeaseModel from '@/models/lease'

export default {
  name: 'split',
  props: {
    step: Object
  },
  data() {
    return {
      // split_amount: 0,
      split_input: 0,
      total: 1000,
      autopay: true,
      loading: false,
      modal_visible: false,
      validated: undefined
    }
  },
  models: {
    user() {
      return this.$parent.$user
    },
    lease() {
      const basePath = session.logged_in
        ? 'account/leases'
        : 'tenants/activate/leases'
      return new LeaseModel(this.lease, {
        basePath
      })
    }
  },
  created() {
    const split_suggestion = parseCurrency(this.$lease.rent_remaining / this.$lease.missing_splits)
    this.$lease.split_amount = this.split_input = split_suggestion
  },
  computed: {
    lease() {
      return this.step.lease
    },
    company() {
      return this.$user.company
    },
    ...mapGetters({
      primary_funding_source: 'session:primary_funding_source'
    })
  },
  methods: {
    prettySplit(val) {
      return val !== undefined
        ? prettyCurrency(val)
        : 'Not Set'
    },

    async checkIfValidated() {
      let promise
      if (this.validated === false) {
        promise = Promise.reject()
      } else if (this.validated === undefined) {
        promise = this.validate()
        promise.then(() => {
          this.modalOpen()
        })
        .catch(() => {})
      } else {
        promise = Promise.resolve()
      }
      return promise
    },

    async validate() {
      const deferred = new Deferred()
      const validation = this.$lease.validateSplit(this.split_input)
      this.$lease.split_amount = this.split_input = validation.amount

      if (!validation.validated) {
        this.validated = false
        await sleep(90)
        this.$validator.errors.add(
          'amount',
          'Total rent split cannot exceed total rent due',
          'required'
        )
        await sleep(300)
        this.validated = undefined
        deferred.reject()
      } else {
        this.validated = true
        deferred.resolve()
      }
      return deferred.promise
    },

    async modalOpen() {
      await this.checkIfValidated()
      this.loading = true
      const promise = this.primary_funding_source
        ? Promise.resolve(true)
        : this.$become('primary_funding_source')
      promise.then((value) => {
        if (value) {
          this.loading = false
          this.modal_visible = true
        }
      })
    },

    modalClose() {
      this.modal_visible = false
    },

    modalConfirm() {
      return this.$lease.save({
        split: this.$lease.split_amount,
        autopay: this.autopay
      })
      .then(() => {
        this.$parent.next()
      })
    }
  },
  components: {
    userDl
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
.step {
  &.split {
    .avatar {
      border-radius: 100px;
      width: 95%;
      margin: 0;
      margin-right: 10px;
    }
    .pad-left {
      padding-left: 10px;
    }
  }
}
</style>

<style scoped lang="scss">
.step {
  // background: rgb(0, 169, 157);

  .currency-container {
    width: 100%
  }

  .box {
    margin: 0 0 10px;
    background: transparent;
    box-shadow: none;
    font-size: 0.8em;
  }
  .user {
    .avatar {
      width: 10%;
    }
  }
  .buttons .table .table-cell {
    padding: 0;
  }
  .action {
    width: 100%;
    // display: inline-block;
    margin: 0;

    button {
      width: 100%;
      // padding: 0.8em 4em;
    }
  }
}
.table {
  width: 100%;

  .table-cell {
    padding: 20px 0;
  }
}
button[type="submit"], input[type="checkbox"] + label {
  margin: 0;
}
</style>
