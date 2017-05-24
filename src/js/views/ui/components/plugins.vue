<template>
  <div class="text-left">
    <h2>Become</h2>

    <div class="box">
      <legend>With value specified</legend>
      <div class="field-group">
        test: {{ test }}
      </div>
      <div class="field-group">
        matched: <span :class="['flag', test_class()]">{{ test_matched }}</span>
      </div>
      <div>
        <button @click="start">Begin countdown</button>
        <button class="neutral" @click="reset">Reset</button>
      </div>
    </div>

    <div class="box">
      <legend>With no value specified</legend>
      <div class="field-group">
        test2: {{ test2 }}
      </div>
      <div>
        <button @click="start2">Begin countdown</button>
        <button class="neutral" @click="reset2">Reset</button>
      </div>
    </div>

    <div class="box">
      <legend>Already correct value</legend>
      <div class="field-group">
        test3: {{ test3 }}
      </div>
      <div class="field-group">
        matched: <span :class="['flag', test_class3()]">{{ test3_matched }}</span>
      </div>
      <div>
        <button @click="start3">Begin countdown</button>
        <button class="neutral" @click="reset3">Reset</button>
      </div>
    </div>

    <div class="box">
      <legend>Checking for non-strict equality</legend>
      <div class="field-group">
        test4: {{ test4 }}
      </div>
      <div class="field-group">
        matched: <span :class="['flag', test_class4()]">{{ test4_matched }}</span>
      </div>
      <div>
        <button @click="start4">Begin countdown</button>
        <button class="neutral" @click="reset4">Reset</button>
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { sleep } from '@/utils'
export default {
  data() {
    return {
      test: 1,
      test_matched: false,
      test2: 1,
      test3: 1,
      test3_matched: false,
      test4: undefined,
      test4_matched: false
    }
  },
  created() {
    this.go3()
  },
  methods: {
    async start() {
      await sleep(1000)
      this.go()
      this.test++
    },
    go() {
      this.$become('test', 3, { reject: true })
        .then((value) => {
          this.test_matched = true
          console.log('changed and matched');
        })
        .catch((error) => {
          this.test_matched = false
          console.warn(error);
          console.warn('changed but didnt match');
        })
    },
    test_class() {
      const val = this.test_matched
      return {
        neutral: !val,
        success: val
      }
    },
    reset() {
      this.test = 1
      this.test_matched = false
    },

    async start2() {
      await sleep(1000)
      this.go2()
      this.test2++
    },
    async go2() {
      // await this.$become('test2')
      // console.log('it changed');
      this.$become('test2')
        .then((value) => {
          alert('changed to ' + value)
        })
        .catch((error) => {
          console.warn(error);
          console.warn('changed but not match');
        })
    },
    reset2() {
      this.go2()
      this.test2 = 1
    },

    async start3() {
      await sleep(1000)
      this.go3()
      this.test3++
    },
    go3() {
      this.$become('test3', 1)
        .then((value) => {
          this.test3_matched = true
          alert('matches ' + value)
        })
        .catch((error) => {
          this.test3_matched = false
          console.warn(error);
          console.warn('changed but not match');
        })
    },
    test_class3() {
      const val = this.test3_matched
      return {
        neutral: !val,
        success: val
      }
    },
    reset3() {
      this.go3()
      this.test3 = 1
    },

    async start4() {
      await sleep(1000)
      this.go4()
      this.test4 = {
        test: 'test'
      }
    },
    go4() {
      this.$become('test4')
        .then((value) => {
          if (value) {
            this.test4_matched = true
          } else {
            this.test4_matched = false
          }
        })
    },
    test_class4() {
      const val = this.test4_matched
      return {
        neutral: !val,
        success: val
      }
    },
    reset4() {
      this.test4 = undefined
      this.test4_matched = false
    }
  },
  watch: {
    test2() {
      console.log('testing');
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
