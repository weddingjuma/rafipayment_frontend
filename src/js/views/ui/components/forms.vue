<template>
  <div class="forms">
    <h2>Forms</h2>
    <div class="box inline-block">
      <Login></Login>
    </div>
    <div class="box inline-block">
      <Forgot></Forgot>
    </div>
    <div class="box inline-block">
      <Reset></Reset>
    </div>
  </div>
</template>

<script>
import Login from '@/views/login'
import Forgot from '@/views/forgot'
import Reset from '@/views/reset'

export default {
  name: 'ui-forms',
  data() {
    return {
      password: 'password',
      options: [{
        value: 'test1',
        label: 'Test 1'
      }, {
        value: 'test2',
        label: 'Test 2'
      }]
    }
  },
  mounted() {
    this.$validator.validateAll()
    .catch(() => {})
  },
  methods: {
    pushOption() {
      const current = this.options[this.options.length - 1].value
      const index = current.slice(-1)
      const next = parseInt(index) + 1
      this.options.push({
        value: `test${next}`,
        label: `Test ${next}`
      })
    }
  },
  components: {
    Login,
    Forgot,
    Reset
  }
}
</script>

<style scoped lang="scss">
.box {
  vertical-align: top;
}
</style>
