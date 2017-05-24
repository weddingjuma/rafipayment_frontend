<template>
  <div class="pw-container">
    <input
      v-if="is_visible"
      v-model="field_value"
      :name="field_name"
      type="text"
      ref="input"
      autocomplete="off"
      autocapitalize="off">
    <input
      v-else
      v-model="field_value"
      :name="field_name"
      ref="input"
      type="password">
    <button
      @click="toggle"
      type="button"
      class="toggle"
      tabindex="-1">
      {{ button_label }}
    </button>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'password',
  props: {
    name: String,
    // ref: String,
    value: {
      type: String,
      default: ''
    }
  },
  // created() {
  //   console.log(this);
  // },
  data() {
    return {
      field_name: this.name,
      field_value: this.value,
      is_visible: false
    }
  },
  computed: {
    button_label() {
      return this.is_visible ? 'hide' : 'show'
    }
  },
  watch: {
    field_value(val) {
      this.changed()
    }
  },
  methods: {
    toggle() {
      this.is_visible = !this.is_visible
    },
    changed() {
      this.$emit('input', this.field_value)
    },
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '../../scss/modules/colors';

.pw-container {
  display: inline-block;
  position: relative;

  .toggle {
    position: absolute;
    top: 50%;
    right: 4px;
    width: 50px;
    padding: 7px;
    transform: translateY(-50%);
    font-size: 0.6em;
    z-index: 3;
  }

  input {
    width: 100%;
    padding-right: 70px;
    // text-overflow: ellipsis;
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
