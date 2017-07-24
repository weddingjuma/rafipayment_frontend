<template>
  <div class="ui-kit">
    <div class="primary">
      <logo></logo>
      <navigation>
        <router-link to="/ui/typography">Typography</router-link>
        <router-link to="/ui/flags">Flags</router-link>
        <router-link to="/ui/buttons">Buttons</router-link>
        <router-link to="/ui/events">Events</router-link>
        <router-link to="/ui/inputs">Inputs</router-link>
        <router-link to="/ui/forms">Forms</router-link>
        <router-link to="/ui/cards">Cards</router-link>
        <router-link to="/ui/modals">Modals</router-link>
        <router-link to="/ui/plugins">Plugins</router-link>
        <router-link to="/ui/transitions">Transitions</router-link>
        <router-link to="/ui/loaders">Loaders</router-link>
      </navigation>
    </div>
    <div class="secondary scroll-y">
      <router-view></router-view>
    </div>
  </div>

</template>

<!-- /////////////////////////////////////////////////////////////////////// -->

<script>
import navigation from '@/components/nav'

export default {
  name: 'ui-kit',
  created() {
    document.title = 'UI Kit'
  },
  components: {
    navigation
  }
}
</script>

<!-- /////////////////////////////////////////////////////////////////////// -->

<style scoped lang="scss">
@import '~%/colors';
@import '~%/breakpoints';

.ui-kit {
  margin-bottom: 40px;
}
.logo {
  width: 160px;
  margin: 0 auto;
}

@media (min-width: $breakpoint-medium) {
  $nav-width-desktop: 160px;

  .primary {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: $nav-width-desktop;
    background: $color-input-background;

    .logo {
      width: calc(100% - 20px);
      margin: 10px auto;
      color: white;
    }

    .router-link-active {
      border-left: 3px solid $color-highlight;
      background: $color-background-default;
    }
  }
  .secondary {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: $nav-width-desktop;
    padding: 20px;
    background-color: $color-background-default;
    color: #818272;
  }
}

</style>
