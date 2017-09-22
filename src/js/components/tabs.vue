<template>
  <div>
    <ul class="tabs">
      <li v-for="tab in tabs">
        <a href="#" @click.prevent="viewTab" :data-uid="tab.uid">
          {{ tab.label }}
        </a>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'tabs',
  props: {},
  data() {
    return {
      active: {},
      tabs: []
    }
  },
  mounted() {
    this.$children.forEach((component) => {
      this.tabs.push({
        uid: component._uid,
        label: component.$props.label
      })
    })
    this.$children[0].active = true
  },
  methods: {
    viewTab(event) {
      this.closeTabs()
      const uid = parseInt(event.target.dataset.uid)
      const next = this.$children.find((component) => {
        return component._uid === uid
      })
      next.active = true
    },
    closeTabs() {
      this.$children.forEach((component) => {
        component.active = false
      })
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
/*
@import '~%/colors';

.tabs {
  position: fixed;
  right: 0;
  // bottom: 0;
  bottom: -3px;
  left: 0;
  margin: 0;
  // padding-top: 18px;
  padding-top: 14px;
  padding-bottom: 12px;
  text-align: left;
  background: $color-background-default;
  box-shadow: 0 2px 11px 6px #202731;
  white-space: nowrap;
  overflow-x: auto;
  z-index: 90;

  li {
    display: inline-block;
    margin-left: -4px;

    a {
      padding: 14px;
      color: #aaa;
      border-bottom: 8px solid #aaa;
      font-size: 0.9em;
      font-weight: bold;
      text-transform: uppercase;

      &:hover {
        text-decoration: none;
      }

      &.router-link-active {
        color: $color-highlight;
        border-bottom: 8px solid $color-highlight;;
      }
    }
  }
}
*/
</style>
