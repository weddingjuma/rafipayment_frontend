<template>
  <div class="nav">
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/admins">Admins</router-link>
    <router-link to="/managers">Managers</router-link>
    <router-link to="/tenants">Tenants</router-link>
    <a href="#" @click.prevent="logout">Logout</a></a>
  </div>
</template>

<script>
import session from '@/session'
export default {
  name: 'nav-admin',
  methods: {
    logout() {
      session.logout()
    }
  }
}
</script>
