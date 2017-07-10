<template>
  <div class="panel small">
    <h1>Admins <button @click="showInvite">Invite +</button></h1>

    <Invite v-if="invite_visible" @close="hideInvite"></Invite>

    <div v-for="model in collection">
      <User :data="model"></User>
    </div>
  </div>
</template>

<script>
import User from '@/components/cards/user'
import Invite from '@/components/cards/invite'

import { Collection } from '@/plugins/collection'

export default {
  collection() {
    return new Collection({
      basePath: 'admins/',
      createPath: 'invite'
    })
  },
  name: 'tenants',
  data() {
    return {
      invite_visible: false
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      return this.$collection.fetch()
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
