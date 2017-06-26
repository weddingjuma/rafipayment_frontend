/* global cordova PushNotification */
import session from '@/session'

let push

const app = {
  init() {
    session.deviceready = false
    this.bindEvents()
  },
  bindEvents() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },
  bindClearAll() {
    document.addEventListener('resume', this.clearAll.bind(this), false)
  },
  onDeviceReady() {
    session.deviceready = true
    this.setupPush()
  },
  setupPush() {
    push = PushNotification.init({
      'android': {
        'senderID': '582343470433'
      },
      'ios': {
        'sound': true,
        'vibration': true,
        'badge': true
      },
      'browser': {},
      'windows': {}
    })

    push.on('registration', function(data) {
      console.log({data});
      const oldRegId = localStorage.getItem('registrationId')
      if (oldRegId !== data.registrationId) {
        localStorage.setItem('registrationId', data.registrationId)
      }
      localStorage.setItem('platformId', cordova.platformId)
    })

    this.bindClearAll()
    this.clearAll()

    push.on('error', function(e) {
      console.warn(e);
      // alert('push error = ' + e.message)
    })

    push.on('notification', function(data) {
      console.log('notification event', data)
      // navigator.notification.alert(
      //   data.message,         // message
      //   null,                 // callback
      //   data.title,           // title
      //   'Ok'                  // buttonName
      // )
    })
  },
  clearAll() {
    return push.clearAllNotifications();
  }
}

app.init()
