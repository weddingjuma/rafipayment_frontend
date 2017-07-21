/* global universalLinks */
import app from '@/app'

const ul = {
  init() {
    this.bindEvents()
  },
  bindEvents() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },
  onDeviceReady() {
    this.setupUniversalLinks()
  },
  setupUniversalLinks() {
    universalLinks.subscribe('launch', (eventData) => {
      const path = eventData.path + eventData.url.split(eventData.path)[1]
      app.$router.replace(path)
    })
  }
}

ul.init()
