<template>
  <div>
    <ul class="tabs">
      <li>
        <router-link to="/account/profile">Profile</router-link>
      </li>
      <!-- <li>
        <router-link to="/account/contact">Contact</router-link>
      </li> -->
      <li>
        <router-link to="/account/payment">Payment</router-link>
      </li>
      <!-- <li>
        <router-link to="/account/transfers">Transfers</router-link>
      </li> -->
    </ul>
    <transition name="route-fade">
      <router-view></router-view>
    </transition>
  </div>
</div>
</template>
