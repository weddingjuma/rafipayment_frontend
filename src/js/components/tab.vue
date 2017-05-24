<template>
  <div class="tab" v-if="active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    label: String
  },
  data() {
    return {
      active: false
    }
  }
}
</script>
