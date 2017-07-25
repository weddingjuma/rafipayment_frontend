<template>
  <div>
    <div class="grid">
      <div class="grid__col grid__col--1-of-2">
        <div class="box">
          <Child @vue-event="vueEvent" />
        </div>
        <div class="box">
          <button @click="setUser">Set User</button>
          <button @click="resetUser">Reset User</button>
          <pre>{{ $user }}</pre>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import events from 'pubsub-js'
import Child from './events_test'
import session from '@/session'

export default {
  created() {
    events.subscribe('pubsub-event', this.pubsubEvent)
  },
  computed: {
    $user() {
      return session.$user.toJSON()
    }
  },
  methods: {
    pubsubEvent() {
      alert('pubsub event received')
    },
    vueEvent() {
      alert('vue event received')
    },
    setUser() {
      session.$user = {
        _id: '12398749850',
        first_name: 'Test',
        last_name: 'Tester',
        role: 'tenant'
      }
    },
    resetUser() {
      session.clearSessionUser()
    }
  },
  components: {
    Child
  }
}
</script>
