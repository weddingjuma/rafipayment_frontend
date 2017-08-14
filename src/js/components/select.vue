<template>
  <div :class="classHandler">
    <select :name="name" :disabled="field_disabled" :multiple="field_multiple" v-model="component_model">
      <slot>
        <option v-for="option in options" value="option.value" :key="option">
          {{ option.label }}
        </option>
      </slot>
    </select>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'select-menu',
  props: {
    name: String,
    options: Array,
    multiple: Boolean,
    disabled: Boolean,
    value: [String, Number]
  },
  data() {
    return {
      component_model: this.value
    }
  },
  created() {
    if (this.$slots.default && this.options) {
      throw new Error('Cannot use both content slot and options property')
    }
  },
  watch: {
    component_model(value) {
      this.$emit('input', value)
    }
  },
  computed: {
    field_disabled() {
      return this.disabled
    },
    field_multiple() {
      return this.multiple
    },
    classHandler() {
      return {
        'select-container': true,
        'multiple': this.field_multiple,
        'disabled': this.field_disabled
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

.select-container:not(.multiple) {
  position: relative;
  width: 100%;
  max-width: 100%;

  &:after {
    display: inline-block;
    content: '';
    position: absolute;
    right: 10px;
    bottom: 50%;
    width: 0;
    height: 0;
    border-color: #666 transparent transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    transform: translateY(50%);
    z-index: 2;
  }

  &.disabled {
    &:after {
      opacity: 0.5;
    }
  }
}

</style>
