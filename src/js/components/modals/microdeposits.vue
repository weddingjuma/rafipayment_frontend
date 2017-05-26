<template>
  <modal @close="close" :confirm="validate">
    <h1 slot="header">Verify Microdeposits</h1>
    <div slot="body" class="modal-microdeposits text-center">

      <div class="text-center">
        <div class="field-group">
          <legend>Amount One</legend>
          $
          <input type="text" value="0" class="mock" disabled>
          .
          <number @change="next" class="tab-focus-1" v-model="amount1a" maxlength="1" name="tab-focus-1" ref="default"></number>
            <!-- <validation name="tab-focus-1" :errors="errors"></validation> -->
        </div>
        <div class="field-group">
          <number @change="next" class="tab-focus-2" v-model="amount1b" maxlength="1" name="tab-focus-2" ></number>
            <!-- <validation name="tab-focus-2" :errors="errors"></validation> -->
        </div>
        <validation name="input-1" :errors="errors"></validation>
      </div>
      <div class="text-center">
        <div class="field-group">
          <legend>Amount Two</legend>
          $
          <input type="text" value="0" class="mock" disabled>
          .
          <number @change="next" class="tab-focus-3" v-model="amount2a" maxlength="1" name="tab-focus-3"></number>
            <!-- <validation name="tab-focus-3" :errors="errors"></validation> -->
        </div>

        <div class="field-group">
          <number @change="next" class="tab-focus-4" v-model="amount2b" maxlength="1" name="tab-focus-4"></number>
            <!-- <validation name="tab-focus-4" :errors="errors"></validation> -->
        </div>
        <validation name="input-2" :errors="errors"></validation>
      </div>

      <loading v-if="loading"></loading>

      <!-- {{ errors }} -->

    </div>
  </modal>
</template>

<script>
import _ from 'lodash'
import app from '@/app'
import { sleep, Deferred } from '@/utils'

export default {
  store: app.$store,
  props: {
    model: Object,
    confirm: Function
  },
  data() {
    return {
      loading: false,
      amount1a: '',
      amount1b: '',
      amount2a: '',
      amount2b: ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async next(e, component) {
      const className = component.$el.className
      const index = parseInt(className.split('tab-focus-')[1])
      const next_index = index + 1
      const $next_input = this.$el.querySelector(`input[name="tab-focus-${next_index}"]`)

      await sleep(90)
      if ($next_input) {
        $next_input.focus()
      } else {
        console.log(this.$el.querySelector('.link.confirm'));
        this.$el.querySelector('.link.confirm').focus()
      }
    },
    validate() {
      this.errors.clear()
      return new Promise((resolve, reject) => {
        this.validateInputs()
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    validateInputs() {
      return new Promise((resolve, reject) => {
        const one = this.amount1a.toString()
        const two = this.amount1b.toString()
        const thr = this.amount2a.toString()
        const fou = this.amount2b.toString()

        const inputs = [one + two, thr + fou]

        inputs.forEach((input, index) => {
          this.validateInput(input, index)
        })
        if (this.errors.errors.length) {
          reject(false)
        } else {
          resolve(true)
        }
      })
    },
    validateInput(input, _index) {
      console.log({input});
      const index = _index + 1
      if (input.length !== 2) {
        this.errors.add(
          `input-${index}`,
          'Please enter a valid amount',
          'required'
        )
      }
      if (+input > 12) {
        this.errors.add(
          `input-${index}`,
          'Microdeposits must be under 12 cents',
          'max_value'
        )
      }
    },
    async confirmMicrodeposits() {
      const amount = this.transfer_amount
      return this.model.save({
        amount
      }, {
        path: 'microdeposits'
      })
      .then((response) => {
        app.alert(
          'Thank you for verifying your bank account!',
          null,
          'Verified'
        )
        this.confirm(response)
      })
      .catch((error) => {
        console.warn(error);
        app.alert(
          'Incorrect microdeposit amounts',
          null,
          'Verification Failed'
        )
      })
    }
  }
}
</script>

<style lang="scss">
$input-width: 44px;
$input-font-size: 3rem;
$input-padding: 5px;
$input-text-align: center;

.modal-microdeposits {
  .field-group {
    .mock {
      width: $input-width;
      font-size: $input-font-size;
      text-align: $input-text-align;
      padding: $input-padding
    }

    .number-container {
      display: inline-block;
      width: $input-width;
      margin-left: 4px;

      input {
        display: block;
        width: 100%;
        font-size: $input-font-size;
        text-align: $input-text-align;
        padding: $input-padding
      }
    }
  }
  .validation.container {
    display: block;
    position: relative;
    text-align: center;
    margin-bottom: 20px;

    span.error:after {
      right: 50%;
      transform: translateX(50%);
    }
  }
}
</style>

<style scoped lang="scss">
.message {
  font-size: 0.85em;
  line-height: 1.25em;
}
.field-group {
  display: inline-block;
  width: auto;
}
</style>
