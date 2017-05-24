<template>
  <transition name="fade-in-only">
    <div class="container" v-show="errors.has(name)" @click="hide($event, name)">
      <span class="error">
        {{ errors.first(name) }}
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'validation',
  props: {
    name: String,
    errors: Object
  },
  methods: {
    hide(e, name) {
      this.errors.remove(name)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';

// span {
//   &.error {
//     display: inline-block;
//     position: relative;
//     z-index: 1;
//     // top: 100%;
//     right: 0;
//     color: $color-text-light;
//     background: $color-status-danger;
//     padding: 6px 8px;
//     font-size: 0.8em;
//     border-bottom-left-radius: 4px;
//     border-bottom-right-radius: 4px;
//     overflow: hidden;
//
//     &:before {
//       content: '';
//       display: block;
//       position: absolute;
//       top: -8px;
//       left: 0px;
//       width: 0;
//       height: 0;
//       border-style: solid;
//       border-width: 8px 0 0 8px;
//       border-color: transparent transparent transparent $color-status-danger;
//     }
//
//     &:after {
//       content: '';
//       display: block;
//       position: absolute;
//       top: -8px;
//       right: 0;
//       width: 0;
//       height: 0;
//       border-style: solid;
//       border-width: 0 0 8px 8px;
//       border-color: transparent transparent $color-status-danger transparent;
//     }
//   }
// }

.container {
  position: absolute;
  display: inline-block;
  top: 100%;
  right: 0;
  // overflow: hidden;
  text-align: right;
  z-index: 9;
  // pointer-events: none;
}

span {
  &.error {
    position: relative;
    display: inline-block;
    top: 8px;
    color: $color-text-light;
    background: $color-status-danger;
    padding: 6px 8px;
    font-size: 0.8em;
    border-radius: 4px;
    text-align: center;
    box-shadow: 0 2px 3px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1);
    // border-bottom-left-radius: 4px;
    // border-bottom-right-radius: 4px;
    // overflow: hidden;

    &:after {
      content: '';
      display: block;
      position: absolute;
      // top: -8px;
      // left: 0px;
      bottom: 100%;
      right: 10px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 8px 8px 8px;
      border-color: transparent transparent $color-status-danger transparent;
      // border-width: 10px 8px 0 8px;
      // border-color: transparent transparent transparent;
    }

    // &:before {
    //   content: '';
    //   display: block;
    //   position: absolute;
    //   top: -8px;
    //   left: 0px;
    //   width: 0;
    //   height: 0;
    //   border-style: solid;
    //   border-width: 8px 0 0 8px;
    //   border-color: transparent transparent transparent $color-status-danger;
    // }
    //
    // &:after {
    //   content: '';
    //   display: block;
    //   position: absolute;
    //   top: -8px;
    //   right: 0;
    //   width: 0;
    //   height: 0;
    //   border-style: solid;
    //   border-width: 0 0 8px 8px;
    //   border-color: transparent transparent $color-status-danger transparent;
    // }
  }
}

// slide

// .slide-enter-active {
//   transition: all .3s linear;
// }
// .slide-leave-active {
//   // transition: all .3s ease-out;
// }
// .slide-enter-to, .slide-leave {
//   max-height: 30px;
//   padding: 6px 8px;
// }
// .slide-enter, .slide-leave-to {
//   max-height: 0;
//   padding: 0;
//   // opacity: 0;
// }

</style>
