<template>
  <div>
    <div class="activation" v-if="current_step">
      <transition name="fade">
        <component :is="current_step.name" :step="current_step">
          <header>
            <dwolla-logo v-if="current_step.name === 'dwolla-bank'"></dwolla-logo>
            <logo v-else></logo>
            <div class="back-container" v-if="current_step.index">
              <button class="back" @click="back">
                <svg viewBox="-140 146 30 40"><polyline points="-116.6,185.6 -136.2,166 -116.6,146.4 "></polyline></svg>
              </button>
            </div>
          </header>
        </component>
      </transition>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import _ from 'lodash'
import app from '@/app'
import session from '@/session'
import { toggleStatusBar } from '@/utils'

// components
import noLease from './no_lease'
import terms from './terms'
import dwollaAccount from './dwolla_account'
import dwollaBank from './dwolla_bank'
import showLease from './show_lease'
import split from './split'
import setPassword from './set_password'

import dwollaLogo from '@/components/dwolla_logo'

export default {
  name: 'activation',
  models: {
    user() {
      return session.$user
    }
  },
  props: {
    actions: Array
  },
  data() {
    return {
      current_step: null
    }
  },
  computed: {
    steps() {
      return this.actions || session.$user.onboarding_steps
    }
  },
  watch: {
    steps(steps) {
      if (!steps.length) {
        if (session.logged_in) {
          this.complete()
        } else {
          app.alert(
            `You have already activated your account. Please log in.`,
            null,
            'Already Activated'
          )
          this.$router.push('/')
        }
      }
    }
  },
  async created() {
    if (!session.logged_in) {
      this.checkForLegacyToken()

      try {
        const token = _.get(this.$route.query, 'token')
        await session.loadActivation(token)
        this.updateCurrentStep()
      } catch (error) {
        console.warn(error)
        this.$router.replace('/')
        app.alert(
          `That activation token has expired or is invalid. If you already 
          activated your account, please log in. Otherwise, ask your property 
          manager to reinvite you.`,
          null,
          'Token Expired'
        )
      }
    } else {
      this.updateCurrentStep()
    }
  },
  mounted() {
    toggleStatusBar(false)
  },
  beforeDestroy() {
    toggleStatusBar(true)
  },
  methods: {
    next() {
      this.current_step.value = true
      const next_index = this.current_step.index + 1
      if (next_index === this.steps.length) {
        this.complete()
      } else {
        this.current_step = this.steps[next_index]
      }
    },
    back() {
      const prev_index = this.current_step.index - 1
      this.current_step = this.steps[prev_index]
    },
    updateCurrentStep() {
      this.current_step = this.steps.find((step, index) => {
        return step.value === false || step.value === undefined
      })
    },
    complete() {
      localStorage.removeItem('activation_token')
      // if the user is already logged in, just remove actions
      if (session.logged_in) {
        session.$store.dispatch('set_actions_required', [])
        return this.$router.push('/')
      }

      // otherwise refresh session using new tokens
      const refresh = _.get(this.$user, 'session.refresh_token')
      localStorage.setItem('refresh_token', refresh)

      // remove activation token because were done with it
      session.loadSession()
        .then(() => {
          // remove query string from url
          this.$router.replace({ query: {} })
          this.$router.push('/')
          app.alert(
            'You\'re all set, thanks for activating your account!',
            null,
            'Account Activated'
          )
        })
    },
    checkForLegacyToken() {
      const query = this.$route.query
      if (!('token' in query)) {
        this.$router.replace({
          query: {
            token: Object.keys(query)[0]
          }
        })
      }
    }
  },
  components: {
    noLease,
    terms,
    dwollaAccount,
    dwollaBank,
    showLease,
    split,
    setPassword,
    dwollaLogo
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
@import '~%/colors';

.activation {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  overflow: auto;

  .step {
    position: absolute;
    left: 50%;
    width: 100%;
    height: 100%;
    max-width: 100%;
    padding: 0;
    padding-top: 5vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    transform: translateX(-50%);
  }

  .container {
    position: absolute;
    left: 50%;
    height: 100%;
    width: 100%;
    max-width: 100%;
    max-height: 90%;
    transform: translateX(-50%);
  }

  .form-model {
    width: 460px;
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
  }

  .logo {
    position: absolute;
    top: 10px;
    left: 40px;
    width: 100px;
  }

  .dwolla-logo {
    width: 180px;
    margin: 0 auto;
  }

  header {
    position: relative;
  }

  .icon-container {
    display: inline-block;
    width: 80px;
    margin-bottom: 10px;

    svg {
      fill: currentColor;
    }
  }

  .back-container {
    position: absolute;
    top: 18px;
    left: 0;

    .back {
      padding: 20px 22px;
      box-shadow: none;
      border-radius: 0;
      background: transparent;

      svg {
        position: absolute;
        top: 50%;
        height: 24px;
        fill: none;
        stroke: currentColor;
        stroke-width: 6px;
        stroke-miterlimit: 15;
        transform: translate(-50%, -50%);
      }
    }
  }

  h1 {
    margin: 0 0 20px;
    font-size: 1.2em;
    line-height: 1.4em;
    font-weight: normal;
    text-transform: capitalize;
  }

  h2 {
    margin: 0;
    font-size: 1.4em;
    line-height: 1.2em;
    text-transform: uppercase;
  }

  .description {
    line-height: 1.5em;
    width: 95%;
    margin: 0 auto 30px;
  }

  .action {
    margin-bottom: 20px;

    button {
      margin-bottom: 20px;
      padding: 0.8em 1.4em;
      color: $color-text-dark;
    }
  }
}

@media (max-width: 768px) {
  .activation {
    .logo {
      position: relative;
      top: initial;
      left: initial;
      width: 70px;
    }

    .icon-container {
      display: none;
    }

    .back-container {
      top: 0;
    }
  }
}
</style>
