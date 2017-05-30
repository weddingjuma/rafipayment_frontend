<template>
  <div class="app">
    <div v-if="platform == 'web'">
      WEB PUT FIXED HEADER HERE
    </div>
    <div v-if="actions_required.length">
      <activate :actions="actions_required"></activate>
    </div>

    <div v-else>
      <header v-if="logged_in">
        <div class="logo-container">
          <transition name="fade">
            <button v-if="backRoute" @click="$router.goBack" class="back-button">
              <svg viewBox="-140 146 30 40"><polyline points="-116.6,185.6 -136.2,166 -116.6,146.4 "></polyline></svg>
            </button>
            <logo v-else></logo>
          </transition>
        </div>
        <div class="page-title">{{ title }}</div>
        <navigation></navigation>
      </header>
      <loading v-if="loading"></loading>
      <alert v-if="alert_visible"></alert>
      <v-touch tag="main" :options="{ touchAction: 'auto' }" @panright="onSwipeRight" @panleft="onSwipeLeft">
      <!-- <main> -->
        <transition name="route-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      <!-- </main> -->
      </v-touch>
    </div>

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import _ from 'lodash'
import { config } from '@/config'
import { mapGetters } from 'vuex'
import { getPanStartPosition } from '@/utils'

import activate from '@/views/activate'
import navigation from './nav'

export default {
  name: 'app',
  computed: {
    title() {
      return _.get(this.$route, 'name')
    },
    backRoute() {
      return _.get(this.$route, 'meta.back')
    },
    platform() {
      let output = 'web'
      if (process.env.NODE_ENV === 'cordova') {
        output = _.get(cordova, 'platformId') // eslint-disable-line no-undef
      }
      return output
    },
    ...mapGetters({
      loading: 'app:loading',
      alert_visible: 'app:alert_visible',
      actions_required: 'session:actions_required',
      logged_in: 'session:logged_in'
    })
  },
  watch: {
    logged_in(val) {
      let path = val ? this.getRedirect() : '/'
      return this.$router.push(path)
    }
  },
  methods: {
    onSwipeRight(e) {
      const start = getPanStartPosition(e);
      if (start.x < 50) {
        this.$router.goBack()
      }
    },
    onSwipeLeft(e) {
      if (!config.debug) return
      const start = getPanStartPosition(e);
      if ((window.innerWidth - start.x) < 50) {
        window.debug.toggle()
      }
    },
    getRedirect() {
      return _.get(this.$route, 'query.redirect') || '/dashboard'
    }
  },
  components: {
    navigation,
    activate
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
main {
  margin-top: 20px;
}
</style>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 70px;
  z-index: 99;
  background: $color-background-default;
}
.logo-container {
  position: relative;
  width: 60px;
  height: 35px;
  margin: 6px;
  margin-top: 22px;
  color: $color-text-default;

  .logo {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  svg {
    height: 35px
  }

  .back-button {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: none;
    border-radius: 0;
    background: transparent;

    svg {
      position: absolute;
      top: 50%;
      height: 24px;
      fill: none;
      stroke: currentColor;
      stroke-width: 5px;
      stroke-miterlimit: 15;
      transform: translate(-50%, -50%);
    }
  }
}
.page-title {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-transform: uppercase;
  color: $color-text-default;
}
.loader-container {
  position: fixed;
}
</style>
