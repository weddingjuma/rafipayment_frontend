<template>
  <transition name="fade">
    <div class="modal-container" @click.self="closeModal">
      <div class="modal" @keyup.esc="closeModal" @keyup.enter="validate">
        <loading v-if="modal_loading"></loading>
        <div class="modal-header">
          <button type="button" class="link close" @click="cancel">
            {{ cancel_label }}
          </button>
          <button type="button" class="link confirm" @click="validate" v-if="has_confirm">
            {{ confirm_label }}
          </button>

          <slot name="header">
            <h1>Please confirm</h1>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">test</slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import _ from 'lodash'
import { toggleStatusBar } from '@/utils'

export default {
  name: 'modal',
  props: {
    model: Object,
    confirm: Function,
    type: String
  },
  data() {
    return {
      modal_loading: false
    }
  },
  mounted() {
    document.body.classList.add('lock')
    toggleStatusBar(false)
    const default_focus = _.get(this.$parent, '$refs.default')
    if (default_focus) default_focus.focus()
  },
  beforeDestroy() {
    document.body.classList.remove('lock')
    toggleStatusBar(true)
  },
  computed: {
    has_confirm() {
      return this.confirm
    },
    confirm_label() {
      let label
      if (this.cancel) {
        label = 'confirm'
      } else {
        label = 'OK'
      }
      return label
    },
    cancel_label() {
      return 'cancel'
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    async validate(e) {
      this.modal_loading = true
      try {
        if (this.confirm) {
          await this.confirm()
          this.closeModal()
        }
      } catch(err) {
        console.warn(err)
      } finally {
        this.$emit('complete')
        this.modal_loading = false
      }
    },
    cancel() {
      this.closeModal()
    }
  }
}
</script>

<style lang="scss">
@import '~%/colors';

.modal-container {
  position: fixed;
  z-index: 9998;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0, 0.6);

  .modal {
    background: #efefef;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    background: $color-modal-background;
    box-shadow: 0 1px 4px rgba(0,0,0, 0.3);
    z-index: 2;
    font-size: 1rem;
    overflow: hidden;

    .modal-header {
      height: 70px;
      padding: 24px;
      border-bottom: 1px solid #ddd;
      text-align: center;
      font-size: 0.9em;

      h1 {
        margin: 0;
        font-size: 1em;
        line-height: 2.5em;
      }

      button.link {
        position: absolute;
        top: 18px;
        font-weight: bold;
        text-transform: capitalize;
        z-index: 3;

        &:hover {
          text-decoration: none;
        }
      }

      .close {
        left: 4px;
      }

      .confirm {
        right: 4px;
      }
    }

    .modal-body {
      position: relative;
      padding: 14px;
      // max-height: calc(80vh - 140px);
      max-height: calc(100vh - 70px);
      min-height: calc(100vh - 70px);

      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .modal-footer {
      position: relative;
      border-top: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      text-align: right;
    }

    p {
      margin: 7px 0;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;

  .modal {
    transition: margin .2s;
    margin-top: 0;
  }
}
.fade-enter, .fade-leave-to {
  opacity: 0;

  .modal {
    margin-top: -20px;
  }
}
</style>
