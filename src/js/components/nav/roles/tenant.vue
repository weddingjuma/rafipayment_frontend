<template>
  <div class="nav">
    <router-link to="/dashboard">Bills</router-link>
    <router-link to="/leases">Leases</router-link>
    <!-- <router-link to="/tenants">Tenants</router-link> -->
    <router-link to="/account">Account</router-link>
    <!-- <a href="#" @click.prevent="logout">Logout</a></a> -->
  </div>
</template>

<script>
import session from '@/session'
export default {
  name: 'nav-tenant',
  methods: {
    logout() {
      session.logout()
    }
  }
}
</script>
