<template>
  <div>
    <h2>Transitions</h2>
    <div class="grid">
      <div class="grid__col grid__col--1-of-2">
        <div class="box">
          <h3>Staggered</h3>
          <button @click="toggle">Toggle</button>
          <transition-group
            name="staggered-fade"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave">
            <div
              v-for="(item, index) in array_proxy"
              :data-index="index"
              :key="index">
              {{ item }}
            </div>
          </transition-group>
        </div>
        <div class="box">
          <h3>Success Animation</h3>
          <button @click="repeatCheck">Restart</button>
          <checkmark v-if="show_check"></checkmark>
        </div>
      </div>

      <div class="grid__col grid__col--1-of-2">
        <div class="box">
          <h3>Fade</h3>
          <button type="button" @click="expanded2 = !expanded2">Toggle</button>
          <transition name="fade">
            <div v-if="expanded2">
              <div v-for="(item, index) in array" :key="index">
                {{ item }}
              </div>
            </div>
          </transition>
        </div>
        <div class="box">
          <h3>Collapse</h3>
          <button type="button" @click="expanded4 = !expanded4">Toggle</button>
          <collapse :expanded="expanded3">
            <div v-for="(item, index) in array" :key="index">
              {{ item }}
            </div>
          </collapse>
        </div>
        <div class="box">
          <h3>Anime JS Object</h3>
          <button @click="toggle_charge">{{ amount_charged }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import { sleep } from '@/utils'
import collapse from '@/components/collapse'
import checkmark from '@/components/icons/check'

export default {
  data() {
    return {
      expanded: false,
      expanded2: false,
      expanded3: false,
      // expanded4: false,
      array: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
      array_proxy: [],
      show_check: true,
      charged: false,
      amount_charged: {
        charged: '0%'
      }
    }
  },
  methods: {
    toggle() {
      this.array_proxy = !this.expanded ? this.array : []
      this.expanded = !this.expanded
    },
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(targets, done) {
      var delay = targets.dataset.index * 150
      setTimeout(() => {
        const height = targets.scrollHeight
        anime({
          targets,
          height,
          easing: 'easeOutExpo',
          opacity: 1,
          complete: done
        })
      }, delay)
    },
    leave(targets, done) {
      var delay = targets.dataset.index * 150
      setTimeout(() => {
        anime({
          targets,
          easing: 'easeOutExpo',
          opacity: 0,
          height: 0,
          complete: done
        })
      }, delay)
    },
    async repeatCheck() {
      this.show_check = false
      await sleep(1)
      this.show_check = true
    },
    toggle_charge(e) {
      const amount = this.charged ? '0%' : '100%'
      this.charged = !this.charged
      anime({
        targets: this.amount_charged,
        charged: amount,
        round: 1,
        easing: 'linear'
      })
    }
  },
  components: {
    checkmark,
    collapse
  }
}
</script>
