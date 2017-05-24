import { parseCurrency } from '@/utils'

const validators = {
  password: {
    getMessage() {
      return 'Must contain at least 1 lowercase letter, 1 uppercase letter, and 1 number'
    },
    validate(value, args) {
      const pattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/
      return pattern.test(value)
    }
  },
  postal: {
    getMessage() {
      return 'Please enter a valid US zip code'
    },
    validate(value, args) {
      const pattern = /^\d{5}(?:[-\s]\d{4})?$/
      return pattern.test(value)
    }
  },
  min_currency: {
    getMessage(field, args) {
      return `Must be greater than $${args[0]}`
    },
    validate(value, args) {
      const parsed = parseCurrency(value)
      return parsed >= parseFloat(args[0])
    }
  },
  max_currency: {
    getMessage(field, args) {
      return `Transfer amount may not exceed $${args[0]}`
    },
    validate(value, args) {
      const parsed = parseCurrency(value)
      return parsed <= parseFloat(args[0])
    }
  }
}

export { validators }
