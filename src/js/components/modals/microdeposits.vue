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
          <number @next="next" class="tab-focus-1" v-model="amount1a" maxlength="1" placeholder="0" name="tab-focus-1" ref="default"></number>
          <number @next="next" class="tab-focus-2" v-model="amount1b" maxlength="1" placeholder="0" name="tab-focus-2" ></number>
        </div>
        <validation name="input-1" :errors="errors"></validation>
      </div>
      <div class="text-center">
        <div class="field-group">
          <legend>Amount Two</legend>
          $
          <input type="text" value="0" class="mock" disabled>
          .
          <number @next="next" class="tab-focus-3" v-model="amount2a" maxlength="1" placeholder="0" name="tab-focus-3"></number>
          <number @next="next" class="tab-focus-4" v-model="amount2b" maxlength="1" placeholder="0" name="tab-focus-4"></number>
        </div>
        <validation name="input-2" :errors="errors"></validation>
      </div>

      <loading v-if="loading"></loading>
<!--
      {{ amount1a }}
      {{ amount1b }}
      {{ amount2a }}
      {{ amount2b }} -->

      <!-- {{ errors }} -->

    </div>
  </modal>
</template>

<script>
// import _ from 'lodash'
import app from '@/app'
import { sleep, parseCurrency } from '@/utils'

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
  computed: {
    microdeposits_array() {
      const a = this.amount1a.toString()
      const b = this.amount1b.toString()
      const c = this.amount2a.toString()
      const d = this.amount2b.toString()

      return [a + b, c + d]
    },
    microdeposits() {
      let output = []
      this.microdeposits_array.forEach((input, index) => {
        output[`amount${++index}`] = {
          value: parseFloat('0.' + input),
          currency: 'USD'
        }
      })
      return output
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
        this.$el.querySelector('.link.confirm').focus()
      }
    },
    validate() {
      this.errors.clear()
      return new Promise((resolve, reject) => {
        this.validateInputs()
        .then(() => {
          this.confirmMicrodeposits()
          .then((res) => {
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    validateInputs() {
      return new Promise((resolve, reject) => {
        const inputs = this.microdeposits_array

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
      // console.log({input});
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
      const body = this.microdeposits
      await this.model.save(body, {
        path: 'microdeposits'
      })
      .then((response) => {
        app.alert(
          'Thank you for verifying your bank account!',
          null,
          'Verified'
        )
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
legend {
  text-align: center;
}
.message {
  font-size: 0.85em;
  line-height: 1.25em;
}
.field-group {
  display: inline-block;
  width: auto;
}
</style>
