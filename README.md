# Rafi Payment Front End


[![Build](https://travis-ci.org/TheRafiApp/rafipayment_frontend.svg?branch=master)](#)
[![Coverage Status](https://coveralls.io/repos/github/TheRafiApp/plutus_frontend/badge.svg?branch=dev-tests)](https://coveralls.io/github/TheRafiApp/plutus_frontend?branch=dev-tests)
[![Code Climate](https://codeclimate.com/github/TheRafiApp/rafipayment_frontend/badges/gpa.svg)](https://codeclimate.com/github/TheRafiApp/rafipayment_frontend)

> Vue.js and Phonegap hybrid application for mobile and desktop

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run all tests using jest
npm test

# run cordova build for ios
npm run cordova

# run cordova build for ios & emulate
npm run ios
```

## Environments

The project has several non-standard environments/webpack configs:

1. dev – `npm start`
1. staging – `npm run staging`
1. production - `npm run build`
1. ui – `npm run ui`
1. cordova – `npm run cordova`

The dev and ui scripts will spin up a webpack dev server, while the rest build production-ready assets to specific directories using webpack.

## UI Kit

The UI kit script will spin up a webpack dev server with the environment set to `ui`, which uses all the main app configs and components but load a different set of routes, which allow easy access to all components in the app.

## Phonegap/Cordova

Note: if using rvm or some other ruby environment manager, make sure to run `rvm use system` before building for ios.

``` bash
# run cordova app in browser
phonegap emulate browser

# run cordova app in ios or android emulator
phonegap emulate ios
phonegap emulate android

# run phonegap dev server for mobile dev app
phonegap serve

# build native apps for all platforms
phonegap build

```
To build the app onto an iphone, make sure certificates and profiles are set up, open the xcproject in /platforms/ios, plug in and register the phone with Xcode, and click Run.

## Libraries & Docs

1. [webpack](https://webpack.github.io/docs/)
1. [vue](https://vuejs.org/v2/api/)
1. [vuex](https://vuex.vuejs.org/en/)
1. [vue-router](https://router.vuejs.org/en/)
1. [vee-validate](http://vee-validate.logaretm.com/)
1. [v-mask](https://github.com/probil/v-mask)
1. [moment](https://momentjs.com/docs/)
1. [lodash](https://lodash.com/docs/)
1. [whatwg-fetch](https://github.com/github/fetch)

## Webpack Aliases

There are 2 aliases available as a shortcut to the js and scss modules.

@: /src/js

```js
import App from '@/components'
```

~%: /src/scss

```scss
@import '~%/colors';
```

## Requests

The Request function is a wrapper around the fetch API, which includes a polyfill for older browsers. A new GET request can be created by passing a relative path to a URL to a new Request instance:

```js
new Request('users/tokens')
```
If using a relative path, the request will be made to the base URL of the API. External urls are also supported:
```js
new Request('https://api.google.com/widgets')
```
Passing options to the Request instance to modify the request:

```js
new Request('users/managers', {
  mode: 'POST',
  body: {
    name: 'test',
    email: 'test@gmail.com'
  }
})
```
Adding custom Headers:

```js
let headers = new Headers()
if (authToken) headers.append('Authorization', authToken)
new Request('users/managers', {
  mode: 'GET',
  headers
})
```
Request always returns a promise:

```js
new Request('users/login')
.then((response) => {
  this.$store.dispatch('login', response)
})
.catch((err) => {
  this.$store.dispatch('error', err)
})
.then(() => {
  console.log('This always fires')
})
```

## Store
The primary data store is located in app.$store, which will be automatically reset on logout, but certain views may require their own special Vuex stores which need to be manually reset when their parent component is destroyed.

## Models

The Model class is an extendable wrapper that returns a Vue instance, which makes it easy to create reusable models with default attributes, shared methods, and methods that use default or dynamic values.

```js
import Model from '@/modules/model'

const defaults = {
  name: 'user',
  computed: {
    full_name() {
      return `${this.first_name} ${this.last_name}`
    }
  }
}

export default class User extends Model {
  static schema() {
    return {
      id: String,
      first_name: String,
      last_name: String
    }
  }
  constructor(attributes, options) {
    super(attributes, [defaults, options])
  }
}

```

```js
import UserModel from '@/models/user'
const user = new UserModel({
  first_name: 'Jane',
  last_name: 'Goodall'
})

console.log(user.full_name) // returns 'Jane Goodall'

```

The Model class has some default methods and computed attributes that are useful for basic CRUD operations:

### Model.basePath

An overwriteable attribute that either uses the name of the model, or the urlRoot property from the options parameter.

### Model.url

An overwriteable attribute that is used for XHR requests. This will override the construction of the urls used for all CRUD operations.

### Model.isNew

Based on whether or not the model has an id. Affects whether or not Model.save is a POST or PUT.

### Model.fetch()

Fetches the model via a GET at Model.url

### Model.save(data, options)

Data must be valid json, options may contain a `path` property in order to deviate from the standard urlRoot.

### Model.destroy()

Sends a DELETE request for the model.

### Model.reset()

Uses the schema definition to reset all values to their default values.

### Model.toJSON()

Returns all approved data attributes, in addition to all computed properties as json.


Models can be bound to a Vue component using the following syntax:

```js
export default {
  models: {
    user() {
      return new UserModel(data)
    }
  },
  created() {
    console.log(this.$user.full_name);
  }
}
```

NOTE: By default, models are reset when the parent component is destroyed. To disable this, the `persist: true` option can be provided in the model options.

## Collections

A light implementation of Collections that binds a collection of models to a Vuex instance, and provides some basic methods for CRUD operations.

```js
import Collection from '@/plugins/collection'

export default {
  collection() {
    return new Collection({
      basePath: 'tenants',
      createPath: 'invite'
    })
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      return this.$collection.fetch()
    }
  }
}
```

The `basePath` option will determine the path of the URL following the base path of the API, which is set in ./configs
The `createPath` option is optional and will be appened to the API path following `basePath`, if included.
These options allow you to fetch your collection at `localhost:3456/tenants` and to create new users at `localhost:3456/tenants/invite`.

The main reason why this simple wrapper is useful is that the options you pass to it will maintain the location of the endpoints you need when you want to dispatch CRUD events via `dispatch('fetch')`, `dispatch('create', model)`, `dispatch('update', model)`, or `dispatch('delete', model)`.

The Collection wrapper will also server as a control layer between the websocket server and the Vuex data store, when using websockets to subcribe to a collection of models.
