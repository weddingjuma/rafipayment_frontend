/* global cordova PushNotification */
import session from '@/session'

const app = {
  init() {
    session.deviceready = false
    this.bindEvents()
  },
  bindEvents() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },
  onDeviceReady() {
    session.deviceready = true
    this.setupPush()
  },
  setupPush() {
    const push = PushNotification.init({
      'android': {
        'senderID': '582343470433'
      },
      'browser': {},
      'ios': {
        'sound': true,
        'vibration': true,
        'badge': true
      },
      'windows': {}
    })

    push.on('registration', function(data) {
      const oldRegId = localStorage.getItem('registrationId')
      if (oldRegId !== data.registrationId) {
        localStorage.setItem('registrationId', data.registrationId)
      }
      localStorage.setItem('platformId', cordova.platformId)
    })

    // push.on('error', function(e) {
    //   alert('push error = ' + e.message)
    // })

    // push.on('notification', function(data) {
    //   console.log('notification event', data)
    //   navigator.notification.alert(
    //     data.message,         // message
    //     null,                 // callback
    //     data.title,           // title
    //     'Ok'                  // buttonName
    //   )
    // })
  }
}

app.init()
