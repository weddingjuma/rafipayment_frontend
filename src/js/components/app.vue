<template>
  <div class="app">
    <div v-if="actions_required.length">
      <activate :actions="actions_required"></activate>
    </div>

    <div v-else>
      <header v-if="logged_in">
        <div class="logo-container">
          <transition name="fade">
            <button v-if="backRoute" @click="$router.goBack" class="back-button">
              <icon-arrow-left />
            </button>
            <logo v-else></logo>
          </transition>
        </div>
        <div class="page-title">{{ title }}</div>
        <navigation></navigation>
      </header>
      <v-touch
      tag="main"
      :options="{ touchAction: 'auto' }"
      @panright="onSwipeRight"
      @panleft="onSwipeLeft">
        <transition name="route-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-touch>
      <loading v-if="loading" />
      <alert v-if="alert_visible" />
    </div>

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import _ from 'lodash'
import config from '@/config'
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
      console.log('redirecting via login', path)
      return this.$router.replace(path)
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
      console.log(this.$route)
      console.log(_.get(this.$route, 'query.redirect'))
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
    padding: 0;
    box-shadow: none;
    border-radius: 0;
    background: transparent;
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

.fixed_header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 20px;
  z-index: 100;
  background: red;
}
</style>
