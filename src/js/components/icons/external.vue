<template>
  <div class="icon">
    <svg viewBox="0 0 50 50">
    	<polygon points="43.8,43.8 6.2,43.8 6.2,6.2 16.1,6.2 16.1,0 0,0 0,50 50,50 50,33.9 43.8,33.9"/>
    	<polygon points="26,0 35.1,9.1 21.4,22.8 27.1,28.4 40.7,14.8 50,24 50,0"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'icon-external'
}
</script>

<style scoped lang="scss">
@import '~%/colors';

.icon {
  display: inline-block;
  position: relative;
  width: 10px;
  top: 1px;
  margin-left: 3px;

  svg {
    fill: currentColor;
  }
}
</style>
