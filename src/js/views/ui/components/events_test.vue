<template>
  <div>
    <button @click.prevent="vueEvent">Trigger Vue Event</button>
    <button @click.prevent="pubSubEvent">Trigger Pubsub Event</button>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import events from 'pubsub-js'

export default {
  name: 'events',
  methods: {
    vueEvent() {
      this.$emit('vue-event')
    },
    pubSubEvent() {
      events.publish('pubsub-event')
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>
