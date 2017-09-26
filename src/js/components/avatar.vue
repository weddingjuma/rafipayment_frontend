<template>
  <div class="avatar" :style="[styleHandler]">
    <svg viewBox="0 0 220 220">
      <text transform="matrix(1 0 0 1 110 144)" text-anchor="middle">{{ initials }}</text>
    </svg>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'avatar',
  props: {
    color: String,
    initials: String
  },
  computed: {
    styleHandler() {
      return {
        backgroundColor: `${this.color}`,
        backgroundImage: `linear-gradient(to bottom,
          rgba(255, 255, 255, 0.5) 0%,
          rgba(255, 255, 255, 0) 100%
        )`
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
@import '../../scss/modules/colors';

.avatar {
  display: block;
  width: 30%;
  border-radius: 100%;
  -webkit-font-smoothing: subpixel-antialiased;

  svg {
    display: block;
    width: 100%;
    background-blend-mode: overlay;

    text {
      fill: currentColor;
      font-family: 'Roboto', sans-serif;
      font-weight: 200;
      font-size: 105.0759px;
    }
  }
}
</style>
