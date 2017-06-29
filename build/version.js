'use strict'
const patch = require('cordova-auto-patch');
const root_dir = require('app-root-dir').get();
const version = require('../package.json').version

console.log(version);
patch(`${root_dir}/`, version);
