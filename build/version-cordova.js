// 'use strict'
/**
 * Update cordova version and versionCode
 *
 * Based on cordova-auto-patch.js
 * https://github.com/shevaroller/cordova-auto-patch
 */

const xml2js = require('xml2js')
const fs = require('fs')

module.exports = (path = '', version = null) => {
  const parser = new xml2js.Parser()
  const builder = new xml2js.Builder()

  const params = { encoding: 'utf8' }

  const name = 'config.xml'

  const file = path + name

  fs.readFile(file, params, (error, data) => {
    if (error) throw error

    parser.parseString(data, (err, config) => {
      if (err) throw err

      let new_version
      if (version == null) {
        let current_version, split_version

        // read version from the config file
        current_version = config.widget.$.version
        split_version = current_version.split('.')

        // ensure that version has a patch version
        while (split_version.length < 3) {
          split_version.push(0)
        }

        // increment patch version
        patch_version = Number(split_version[2]) + 1
        split_version[2] = patch_version.toString()

        new_version = split_version.join('.')
      } else {
        new_version = version
      }
      // write back to config
      config.widget.$.version = config.widget.$.versionCode = new_version
      const newConfig = builder.buildObject(config)

      fs.writeFile(file, newConfig, params, function (er) {
        if (er) throw er
        // console.log(`Build version: ${new_version}`)
      })
    })
  })

  return true
}
