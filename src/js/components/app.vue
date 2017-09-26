<template>
  <div class="app">
    <div v-if="compatible">
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
      </div>
    </div>
    <div v-else>
      <bug />
    </div>
    <alert v-if="alert_visible" />
    <div v-if="offline" class="offline">
      <div class="message">You are offline.</div>
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
import navigation from '@/components/nav'
import bug from '@/components/bug'

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
      offline: 'app:offline',
      alert_visible: 'app:alert_visible',
      actions_required: 'session:actions_required',
      logged_in: 'session:logged_in'
    })
  },
  mounted() {
    this.checkBrowserSupport()
  },
  data() {
    return {
      compatible: true
    }
  },
  watch: {
    logged_in(val) {
      let path = val ? this.getRedirect() : '/'
      return this.$router.replace(path)
    }
  },
  methods: {
    getRedirect() {
      return _.get(this.$route, 'query.redirect') || '/dashboard'
    },
    onSwipeRight(e) {
      const start = getPanStartPosition(e);
      if (start.x < 50) {
        this.$router.goBack()
      }
    },
    onSwipeLeft(e) {
      if (config.debug) {
        const start = getPanStartPosition(e);
        if ((window.innerWidth - start.x) < 50) {
          window.debug.toggle()
        }
      }
    },
    checkBrowserSupport() {
      try {
        localStorage.setItem('_', '_')
        localStorage.removeItem('_')
      } catch(error) {
        this.compatible = false
        this.$parent.alert(
          `It looks like you are in private browsing mode, which is not 
          supported by Rafi Payment. Please disable it to continue.`
        )
      }
    }
  },
  components: {
    navigation,
    activate,
    bug
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
@import '~%/mixins';

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

.offline {
  @include fixed_fill;
  z-index: 9997;
  background-color: rgba(0,0,0, 0.6);

  .message {
    display: inline-block;
    @include fixed_center;
  }
}
</style>
