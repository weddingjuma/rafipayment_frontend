<template>
  <div class="nav-container">
    <a
      href="#"
      @click.prevent="toggle"
      :class="{ 'nav-toggle': true, 'active': nav_visible }">
      <div></div><div></div><div></div>
    </a>
    <nav
      :class="{ 'visible': nav_visible }"
      @click="close">
      <div class="panel small scroll-y">
        <logo></logo>
        <slot>
          <component :is="$user.role"></component>
        </slot>
      </div>
    </nav>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'
import superadmin from './roles/superadmin'
import admin from './roles/admin'
import manager from './roles/manager'
import tenant from './roles/tenant'

import { mapGetters } from 'vuex'

export default {
  name: 'nav',
  models: {
    user() {
      return session.$user
    }
  },
  computed: {
    ...mapGetters({
      nav_visible: 'app:nav_visible'
    })
  },
  methods: {
    close() {
      this.$store.dispatch('nav_hide')
    },
    toggle() {
      this.$store.dispatch('nav_toggle')
    }
  },
  components: {
    superadmin,
    admin,
    manager,
    tenant
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
@import '~%/breakpoints';
@import '~%/colors';

nav {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background: $color-nav-background;
  color: $color-nav-text;

  &.visible {
    display: block;
  }

  a {
    display: block;
    padding: 26px 20px;
    font-weight: bold;
    text-transform: uppercase;
    color: $color-nav-text;

    &:hover {
      text-decoration: none;
      background: rgba(255,255,255, 0.1);
    }

    &.router-link-active {
      background: rgba(255,255,255, 0.15);

      &:hover {
        background: rgba(255,255,255, 0.2);
      }
    }
  }
}

@media (min-width: $breakpoint-medium) {

  .nav-container {
    width: 240px;
  }

  nav {
    a {
      padding: 14px 20px;
      text-align: left;
      font-weight: normal;
      text-transform: none;
    }

    &.router-link-active {
      background: rgba(255,255,255, 0.15);
      border-left: 3px solid $color-highlight;

      &:hover {
        background: rgba(255,255,255, 0.2);
      }
    }
  }
}
</style>

<style scoped lang="scss">
@import '~%/breakpoints';
@import '~%/colors';

.nav-container {
  .logo {
    width: 180px;
  }

  .panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
}

.panel.scroll-y {
  max-height: 100vh
}

.nav-toggle {
  position: fixed;
  top: 20px;
  right: 14px;
  width: 36px;
  height: 36px;
  z-index: 3;

  div {
    position: relative;
    top: 0;
    height: 3px;
    background-color: $color-text-light;
    margin: 7px 0;
    border-radius: 3px;
    transition: all .25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }

  &.active {
    div {
      transition: all .25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    div:nth-of-type(1) {
      top: 10px;
      transform: rotate(45deg);
    }

    div:nth-of-type(2) {
      opacity: 0;
    }

    div:nth-of-type(3) {
      top: -10px;
      transform: rotate(-45deg);
    }
  }
}

@media (min-width: $breakpoint-xlarge) {
  nav {
    display: block;
    position: relative;
    background-color: transparent;
  }

  .nav-toggle {
    display: none;
  }

  .nav-container {
    position: relative;

    .logo {
      display: none;
    }
    .panel {
      position: relative;
      left: initial;
      max-width: 100%;
      margin: 0;
      transform: none;
    }
  }
}
</style>
