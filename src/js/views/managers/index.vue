<template>
  <div class="panel small">
    <h1>Managers <button @click="showInvite">Invite +</button></h1>

    <Invite v-if="invite_visible" @close="hideInvite"></Invite>

    <div v-if="models.length > 0">
      <div v-for="model in collection">
        <User :data="model"></User>
      </div>
    </div>
    <div v-else>
      No users found.
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import User from '@/components/cards/user'
import Invite from '@/components/cards/invite'

import Collection from '@/store/collection'

const store = new Collection({
  basePath: 'managers/',
  createPath: 'invite'
})

export default {
  store,
  collection: true,
  name: 'tenants',
  data() {
    return {
      invite_visible: false
    }
  },
  computed: {
    ...mapGetters([
      'collection'
    ])
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.$store.dispatch('fetch')
    },
    showInvite() {
      this.invite_visible = true
    },
    hideInvite() {
      this.invite_visible = false
    }
  },
  components: {
    User,
    Invite
  }
}
</script>
