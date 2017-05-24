<template>
  <div>
    <div class="box">
      <h2>Buttons</h2>
      <div class="grid">
        <div class="grid__col grid__col--1-of-1">
          <button name="1" @click="toggleLoading" :class="[{ loading: loading_1 }]">Button</button>
          <button name="2" @click="toggleLoading" :class="[{ loading: loading_2 }, 'primary']">Primary</button>
          <button name="3" @click="toggleLoading" :class="[{ loading: loading_3 }, 'secondary']">Secondary</button>
          <button name="8" @click="toggleLoading" :class="[{ loading: loading_8 }, 'success']">Success</button>
          <button name="4" @click="toggleLoading" :class="[{ loading: loading_4 }, 'warning']">Warning</button>
          <button name="5" @click="toggleLoading" :class="[{ loading: loading_5 }, 'danger']">Danger</button>
          <button name="6" @click="toggleLoading" :class="[{ loading: loading_6 }]" disabled>Disabled</button>
          <button name="7" @click="toggleLoading" :class="[{ loading: loading_7 }, 'link']">Link button</button>
        </div>
      </div>
    </div>
    <div class="box">
      <h2>Loading</h2>
      <div class="grid">
        <div class="grid__col grid__col--1-of-1">
          <button class="loading">Button</button>
          <button class="primary loading">Primary</button>
          <button class="secondary loading">Secondary</button>
          <button class="success loading">Success</button>
          <button class="warning loading">Warning</button>
          <button class="danger loading">Danger</button>
          <button class="loading" disabled>Disabled</button>
        </div>
      </div>
    </div>
    <div class="box">
      <h2>Sizes</h2>
      <div class="grid">
        <div class="grid__col grid__col--1-of-2">
          <button class="primary small">Small</button>
          <button class="primary">Normal</button>
          <button class="primary medium">Medium</button>
          <button class="primary large">Large</button>
        </div>
        <div class="grid__col grid__col--1-of-2">
          <button class="small">Small</button>
          <button>Normal</button>
          <button class="medium">Medium</button>
          <button class="large">Large</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sleep } from '@/utils'
export default {
  name: 'ui-buttons',
  data() {
    return {
      loading_1: false,
      loading_2: false,
      loading_3: false,
      loading_4: false,
      loading_5: false,
      loading_6: false,
      loading_7: false,
      loading_8: false
    }
  },
  methods: {
    async toggleLoading({ target }) {
      this[`loading_${target.name}`] = true
      await sleep(1200)
      this[`loading_${target.name}`] = false
    }
  }
}
</script>
