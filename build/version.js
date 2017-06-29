'use strict'
const patch = require('cordova-auto-patch');
const version = require('../package.json').version

console.log(version);
patch('../config.xml', version);
