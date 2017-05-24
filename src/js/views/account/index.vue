<template>
  <div class="account panel small">
    <component :is="role"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import superadmin from './roles/superadmin'
import admin from './roles/admin'
import manager from './roles/manager'
import tenant from './roles/tenant'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters({
      role: 'session:role'
    })
  },
  components: {
    superadmin,
    admin,
    manager,
    tenant
  }
}
</script>
