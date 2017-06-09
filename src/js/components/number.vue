<template>
  <div class="number-container">
    <!-- <input
      v-if="is_mobile"
      v-model="input_value"
      :name="name"
      :class="[this.name]"
      :placeholder="placeholder"
      @blur="field_blurred"
      @focus="field_focused"
      @input="field_input"
      @change="field_changed"
      type="number"
      ref="input"
      pattern="[0-9]*"
      autocomplete="off"
      autocapitalize="off"> -->
    <input
      v-model="input_value"
      :name="name"
      :class="[this.name]"
      :placeholder="placeholder"
      @blur="field_blurred"
      @focus="field_focused"
      @input="field_input"
      @change="field_changed"
      type="text"
      ref="input"
      pattern="[0-9]*"
      autocomplete="off"
      autocapitalize="off">
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import * as utils from '@/utils'

export default {
  name: 'number',
  props: {
    name: {
      type: String,
      default: 'amount'
    },
    maxlength: [ String, Number ],
    value: [ String, Number ],
    placeholder: [ String, Number ],
    wrap: Boolean
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
      this.input_value = parseInt(this.value)
    }
  },
  computed: {
    max_length() {
      return parseInt(this.maxlength)
    }
  },
  watch: {
    value(value) {
      this.input_value = value
    },
    input_value(val) {
      this.input_value = this.process_input(val)
      this.field_input()
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    process_input(input) {
      const filtered = input
        .toString()
        .replace(/[^0-9]/g, '')
      return this.limit(filtered)
    },
    limit(input) {
      let output = input
      if (this.maxlength) {
        const exp = this.wrap ? [-1 * this.max_length] : [0, this.max_length]
        output = input.slice(...exp)
      }
      return output
    },
    field_input(e) {
      if (!e) return
      this.input_value = this.process_input(this.input_value)
      if (this.input_value !== '') {
        this.input_value = this.process_input(this.input_value)
        this.$emit('next', e, this)
        if (this.input_value.length !== this.max_length) return
      }
      this.$emit('change', e, this)
      this.$emit('input', this.input_value)
    },
    field_blurred() {
      this.is_focused = false
      this.input_value = parseInt(this.input_value)
      this.$emit('blur')
    },
    field_changed(e) {
      if (!e) return
    },
    async field_focused(e) {
      await utils.sleep(90)
      e.target.value = e.target.value
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
@import '~%/colors';

.number-container {
  position: relative;
  display: inline-block;

  input {
    display: inline-block;
    text-align: right;
    text-overflow: ellipsis;
    padding: 6px;
  }
}
</style>

<style scoped lang="scss">
@import '~%/colors';

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
