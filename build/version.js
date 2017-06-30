'use strict'
// update cordova version when npm version is run
const updateVersion = require('./version-cordova')
const root_dir = require('app-root-dir').get()
const version = require('../package.json').version
updateVersion(`${root_dir}/`, version)
