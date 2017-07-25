/* global StatusBar */

// import lengthy util functions

import _Request from './request'
import _statesHelper from './statesHelper'

// export external utils

export const Request = _Request
export const statesHelper = _statesHelper

// toggle status bar on Mobile

const env = process.env.NODE_ENV

export const toggleStatusBar = (val) => {
  if (env === 'cordova') {
    try {
      return val ? StatusBar.show() : StatusBar.hide()
    } catch(e) {}
  }
}

export const resetState = (state, defaults) => {
  return Object.keys(defaults).forEach(key => {
    state[key] = defaults[key]
  })
}

// load scripts from cdn

export const load = (url) => {
  return new Promise((resolve, reject) => {
    let script = window.document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = url
    script.onload = resolve
    script.onerror = reject
    window.document.head.appendChild(script)
  })
}

// check if is touch device

export const isTouchDevice = () => {
  const onTouchStart = !!('ontouchstart' in window)
  const msMaxTouchPoints = !!('msmaxtouchpoints' in navigator)
  return onTouchStart || msMaxTouchPoints
}

export const isMobile = () => {
  const regex = /(iP(od|hone|ad))|(IEMobile)|(Windows Phone)|(Blackberry)|(BB10)|(Android.*Mobile)/i
  return regex.test(window.navigator.userAgent)
}

// just chill

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// parse currency strings to valid currency floats

export const parseCurrency = (value, constructor) => {
  if (!['string', 'number'].includes(typeof value)) return
  // check for invalid chars
  if (/[^$,.\d\-+]/.test(value)) return false
  const amount = parseFloat(('' + value).replace(/[$,]/g, '')).toFixed(2)
  if (typeof amount !== 'string') return false
  return constructor
    ? new constructor(amount).valueOf()
    : amount
}

// make parsed currency floats look pretty

export const prettyCurrency = (value, _symbol = '$') => {
  let parsed = parseFloat(value)
  let leader = ''
  if (parsed < 0) leader = '-'
  parsed = Math.abs(parsed)
  const number_string = parseCurrency(parsed)
  if (number_string === false) return ''
  const symbol = _symbol || ''
  return leader + symbol + number_string.replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

// get position data for touch

export const getPanStartPosition = (event) => {
  const delta_x = event.deltaX
  const delta_y = event.deltaY
  const final_x = event.srcEvent.pageX || event.srcEvent.screenX || 0
  const final_y = event.srcEvent.pageY || event.srcEvent.screenY || 0

  return {
    x: final_x - delta_x,
    y: final_y - delta_y
  }
}

// deferred promises

export function Deferred() {
  this.resolve = null
  this.reject = null
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve
    this.reject = reject
  })
  Object.freeze(this)
}

// convert unit number to a pretty unit number

export const unitsHelper = (number) => {
  if (/^[\d]/.test(number)) number = '#' + number
  return number
}
