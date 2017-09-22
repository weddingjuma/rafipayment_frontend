<template>
  <div class="currency-container">
    <span v-if="sign">{{ sign }}</span>
    <input
      v-if="is_mobile"
      v-model="input_value"
      :name="name"
      type="number"
      ref="input"
      @blur="field_blurred"
      @focus="field_focused"
      @change="field_changed"
      :placeholder="placeholder"
      autocomplete="off"
      autocapitalize="off">
    <input
      v-else
      v-model="input_value"
      :name="name"
      type="text"
      ref="input"
      @blur="field_blurred"
      @focus="field_focused"
      @change="field_changed"
      :placeholder="placeholder"
      autocomplete="off"
      autocapitalize="off">
  </div>
</template>

<!-- switch to pattern="[0-9.]*" -->
<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import * as utils from '@/utils'

export default {
  name: 'currency',
  props: {
    name: {
      type: String,
      default: 'amount'
    },
    sign: {
      type: [ String, Boolean ],
      default: '$'
    },
    value: [ String, Number ],
    placeholder: [ String, Number ]
  },
  data() {
    return {
      input_value: this.value,
      is_focused: false,
      is_mobile: utils.isMobile()
    }
  },
  created() {
    if (this.value && !this.is_mobile) {
      this.input_value = utils.prettyCurrency(this.value, false)
    }
  },
  watch: {
    value(value) {
      this.input_value = value
    },
    input_value(val) {
      if (this.is_focused) {
        this.input_value = val.toString().replace(/[^0-9.]/g, '')
      }
      this.field_input()
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    field_input() {
      this.$emit('input', this.input_value)
    },
    field_blurred() {
      this.is_focused = false
      const args = this.is_mobile
        ? [ this.input_value, String ]
        : [ this.input_value || '', false ]
      const value = utils.parseCurrency(...args)
      if (isNaN(value)) {
        this.input_value = ''
      } else {
        this.input_value = value
      }
      this.$emit('blur')
    },
    field_changed(e) {
      this.$emit('change', e)
    },
    async field_focused(e) {
      this.is_focused = true
      if (!this.is_mobile) {
        await utils.sleep(1)
        this.input_value = utils.parseCurrency(e.target.value)
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.currency-container {
  position: relative;
  display: inline-block;

  span {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 4;
  }

  input {
    display: inline-block;
    padding-left: 28px;
    padding-right: 10px;
    text-align: right;
    text-overflow: ellipsis;
  }
}

.touched {
  &.invalid {
    input {
      border-color: $color-status-danger;

      &:focus {
        border-bottom: 1px solid $color-status-danger;
        box-shadow: 0 1px 0 $color-status-danger;
      }
    }
  }
}
</style>
