<template>
  <div class="number-container">
    <input
      v-if="is_mobile"
      v-model="input_value"
      :name="name"
      type="number"
      ref="input"
      @blur="field_blurred"
      @focus="field_focused"
      @input="field_input"
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
      @input="field_input"
      @change="field_changed"
      :placeholder="placeholder"
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
    async input_value(val) {
      this.input_value = val.toString().slice(-1 * this.max_length).replace(/[^0-9.]/g, '')
      if (this.input_value !== '') {
        this.field_input()
      }
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    field_input(e) {
      if (!e) return
      if (this.input_value !== '') {
        this.$emit('change', e, this)
        this.$emit('input', this.input_value)
      }
    },
    field_blurred() {
      this.is_focused = false
      this.input_value = parseInt(this.input_value)
      this.$emit('blur')
    },
    field_changed(e) {
      if (!e) return
      // this.$emit('change', e, this)
    },
    async field_focused(e) {
      await utils.sleep(90)
      e.target.value = e.target.value
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.number-container {
  position: relative;
  display: inline-block;

  input {
    display: inline-block;
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
