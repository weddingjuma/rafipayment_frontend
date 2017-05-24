<template>
  <div>
    <h2>Inputs</h2>
    <div class="grid">
      <div class="field-group grid__col grid__col--1-of-2">
        <div class="box">
          <input type="radio" id="radio_1" name="radio">
          <label for="radio_1">Radio 1</label>

          <input type="radio" id="radio_2" name="radio">
          <label for="radio_2">Radio 2</label>

          <input type="radio" id="radio_3" name="radio">
          <label for="radio_3">Radio 3</label>
        </div>
      </div>
      <div class="grid__col grid__col--1-of-2">
        <div class="box">
          <div class="field-group">
            <input type="checkbox" id="checkbox_1">
            <label for="checkbox_1">Checkbox 1</label>
          </div>

          <div class="field-group">
            <input type="checkbox" id="checkbox_2">
            <label for="checkbox_2">Checkbox 2</label>
          </div>

          <div class="field-group">
            <input type="checkbox" id="checkbox_3">
            <label for="checkbox_3">Checkbox 3</label>
          </div>
        </div>
      </div>
      <div class="grid__col grid__col--1-of-2">
        <div class="field-group">
          <legend>
            Text
          </legend>
          <input type="text" value="Text">
        </div>
      </div>
      <div class="grid__col grid__col--1-of-2">
        <div class="field-group">
          <legend>
            Disabled
          </legend>
          <input type="text" value="Text" disabled>
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="grid__col grid__col--1-of-2">
        <div class="field-group">
          <legend>
            Currency
          </legend>
          <currency value="12.00"></currency>
        </div>
      </div>
      <div class="grid__col grid__col--1-of-2">
        <div class="field-group">
          <legend>
            Currency
          </legend>
          <currency value="12.00"></currency>
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="field-group grid__col grid__col--1-of-2">
        <legend>
          Password
        </legend>
        <password v-model="password"></password>
      </div>
      <div class="grid__col grid__col--1-of-2">
        <legend>
          Password with Validation
        </legend>
        <div class="field-group">
          <password value="test" v-validate.disable="'required|min:8|password'" v-model="password" name="password"></password>
          <validation name="password" :errors="errors"></validation>
        </div>
      </div>
    </div>

    <button @click="validate">Validate</button>

    <div class="grid">
      <div class="field-group grid__col grid__col--1-of-2">
        <legend>
          Select (using slot)
        </legend>
        <select-menu>
          <option disabled selected>-Please choose-</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select-menu>
      </div>
      <div class="field-group grid__col grid__col--1-of-2">
        <legend>
          Select Disabled
        </legend>
        <select-menu disabled>
          <option disabled selected>-Please choose-</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select-menu>
      </div>
    </div>

    <div class="grid">
      <div class="grid__col grid__col--1-of-2">
        <div class="field-group">
          <legend>
            Select (using :options directive)
          </legend>
          <select-menu :options="options"></select-menu>
        </div>

        <button @click="pushOption">Add option</button>
      </div>
      <div class="field-group grid__col grid__col--1-of-2">
        <legend>
          Data
        </legend>
        <pre>{{ options }}</pre>
      </div>
    </div>

    <div class="grid">
      <div class="field-group grid__col grid__col--1-of-2">
        <legend>Multiselect</legend>
        <select-menu multiple>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select-menu>
      </div>
      <div class="field-group grid__col grid__col--1-of-2">
        <legend>Multiselect Disabled</legend>
        <select-menu multiple disabled>
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select-menu>
      </div>
    </div>

    <div class="grid">
      <div class="field-group grid__col grid__col--1-of-1">
        <legend>Textarea</legend>
        <textarea></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ui-inputs',
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
  watch: {
    password() {
      if (this.errors.has('password')) {
        this.errors.remove('password')
      }
    }
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
    },
    validate() {
      this.$validator.validateAll()
      .then(alert('validated!'))
      .catch(() => {})
    }
  }
}
</script>
