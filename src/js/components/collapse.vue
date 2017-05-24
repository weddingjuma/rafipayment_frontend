<template>
  <div class="collapse">
    <transition
      name="collapse-fade"
      :css="false"
      appear
      @before-appear="before"
      @appear="enter"
      @appear-cancelled="cancel"
      @before-enter="before"
      @enter="enter"
      @enter-cancelled="cancel"
      @leave="leave"
      @leave-cancelled="cancel"
    >
      <div class="content" v-show="$is_expanded">
        <div class="content-box">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import anime from 'animejs'

export default {
  name: 'collapse',
  props: {
    expanded: Boolean
  },
  data() {
    return {
      duration: 700,
      is_expanded: this.expanded
    }
  },
  watch: {
    expanded(val) {
      this.is_expanded = val
    }
  },
  computed: {
    $is_expanded() {
      return this.is_expanded
    }
  },
  beforeDestroy() {
    if (this.anime && this.targets) {
      anime.remove(this.targets)
    }
  },
  methods: {
    toggle() {
      if ((this.is_expanded = !this.is_expanded)) {
        this.$emit('open')
      }
    },
    cancel() {
      this.anime.pause()
    },
    before(targets) {
      if (!this.targets) this.targets = targets
      targets.removeAttribute('style')
    },
    enter(targets, done) {
      const height = targets.scrollHeight
      const duration = this.duration

      targets.style.height = 0
      targets.style.opacity = 0

      this.anime = anime({
        targets,
        duration,
        easing: 'easeOutExpo',
        opacity: [0, 1],
        height,
        complete () {
          targets.removeAttribute('style')
          done()
        }
      })
      this.anime.play()
    },
    leave(targets, complete) {
      const duration = this.duration

      this.anime = anime({
        targets,
        duration,
        easing: 'easeOutExpo',
        opacity: [1, 0],
        height: 0,
        complete
      })
      this.anime.play()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.content {
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
}
.content-box {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
