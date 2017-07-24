<template>
  <div>
    <Child @vue-event="vueEvent" />
  </div>
</template>

<script>
import events from 'pubsub-js'
import Child from './events_test'

export default {
  methods: {
    pubsubEvent() {
      alert('pubsub event received')
    },
    vueEvent() {
      alert('vue event received')
    }
  },
  created() {
    events.subscribe('pubsub-event', this.pubsubEvent)
  },
  components: {
    Child
  }
}
</script>
