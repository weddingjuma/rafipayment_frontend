<template>
  <div class="icon">
    <svg viewBox="0 0 24 24"><path d="M12,24C5.4,24,0,18.6,0,12S5.4,0,12,0s12,5.4,12,12S18.6,24,12,24z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z"/><path d="M11,16c-0.3,0-0.5-0.1-0.7-0.3l-3-3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3,3c0.4,0.4,0.4,1,0,1.4C11.5,15.9,11.3,16,11,16z"/><path d="M11,16c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l6-6c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C11.5,15.9,11.3,16,11,16z"/></svg>
  </div>
</template>

<script>
export default {
  name: 'icon-success'
}
</script>

<style scoped lang="scss">
@import '~%/colors';

.icon {
  display: inline-block;
  width: 20px;
  color: $color-status-success;

  svg {
    fill: currentColor;
  }
}
</style>
