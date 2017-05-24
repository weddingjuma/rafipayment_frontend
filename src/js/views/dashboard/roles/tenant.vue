<template>
  <div>
    <ul class="tabs">
      <li>
        <router-link to="/dashboard/current">Current Bills</router-link>
      </li>
      <li>
        <router-link to="/dashboard/past">Past Bills</router-link>
      </li>
    </ul>
    <transition name="route-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'tenant'
}
</script>
