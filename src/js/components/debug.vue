<template>
  <div class="debug">
    <transition name="slide-right">
      <div class="debug-menu" v-if="debug_visible">
        <button
        type="button"
        @click="toggle"
        :class="['small', toggle_className]">
          Close
        </button>
        <h2>Debug</h2>
        <div class="field-group">
          <h3>Meta</h3>
          <p>API: {{ meta.api }}</p>
          <p>Env: {{ meta.env }}</p>
          <p>Dwolla: {{ meta.dwolla_env }}</p>
        </div>
        <div class="field-group">
          <h3>Console</h3>
          <a href="#" @click.prevent="log('app')">console.log(app)</a>
          <a href="#" @click.prevent="log('session')">console.log(session)</a>
          <a href="#" @click.prevent="log('router')">console.log(router)</a>
        </div>
        <div class="field-group">
          <h3>Globals</h3>
          <a href="#" @click.prevent="create_global('app')">window.app</a>
          <a href="#" @click.prevent="create_global('session')">window.session</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import app from '@/app'
import session from '@/session'
import router from '@/router'
import { config } from '@/config'

export default {
  name: 'debug',
  mounted() {
    window.debug = this
  },
  data() {
    return {
      meta: {
        api: config.urls.api,
        env: process.env.NODE_ENV,
        dwolla_env: config.dwolla_env
      },
      debug_visible: false
    }
  },
  computed: {
    toggle_className() {
      return {
        toggle: true
      }
    }
  },
  methods: {
    toggle() {
      this.debug_visible = !this.debug_visible
    },
    log(var_name) {
      switch(var_name) {
        case 'app':
          console.log(app);
          break
        case 'session':
          console.log(session)
          break
        case 'router':
          console.log(router)
          break
        default:
          console.log('not found')
      }
    },
    create_global(var_name) {
      switch(var_name) {
        case 'app':
          window.app = app;
          break
        case 'session':
          window.session = session
          break
        default:
          console.log('not found')
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

$color-debug-text: $color-grey-90;
$color-debug-links: $color-status-danger;

.toggle {
  position: absolute;
  top: 10px;
  right: 14px;
  z-index: 9999999;
}
.debug-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0%;
  padding: 14px;
  max-width: 100%;
  background: rgba(255,255,255, 0.8);
  color: $color-debug-text;
  text-align: left;
  z-index: 9999998;
  overflow-y: auto;
  transition: all .6s ease-in;
}

h2 {
  margin-bottom: 10px;
  padding-bottom: 10px;
  font-size: 1.3em;
  border-bottom: 1px dotted black;
}

h3 {
  margin-bottom: 4px;
  text-align: left;
  font-size: 0.8em;
  font-weight: bold;
}

a {
  display: block;
  font-family: 'courier', monospace;
  font-size: 0.8em;
  color: $color-debug-links;
}

p {
  display: block;
  margin-bottom: 2px;
  font-family: 'courier', monospace;
  font-size: 0.8em;
  color: $color-debug-text;
  white-space: nowrap;
  overflow-x: auto;
}

.field-group {
  padding-bottom: 10px;
  border-bottom: 1px dotted black;
}

// slide right

.slide-right-enter-active {
  transition: all .2s ease-in;
}
.slide-right-leave-active {
  transition: all .2s ease-out;
}
.slide-right-enter-to, .slide-right-leave {
  right: 0%;
}
.slide-right-enter, .slide-right-leave-to {
  right: -100%;
}
</style>
