<template>
  <div class="step">
    <div class="container">
      <slot></slot>
      <div class="icon-container">
        <svg viewBox="0 0 183.99 183.99" style="fill:#f2f2f2">
          <rect x="87.86" y="36.76" width="10" height="82.53" style="fill:#f2f2f2"/>
          <rect x="87.86" y="132.32" width="10" height="11.66"/>
          <path d="M95,187a92,92,0,1,1,92-92A92.1,92.1,0,0,1,95,187ZM95,13a82,82,0,1,0,82,82A82.09,82.09,0,0,0,95,13Z" transform="translate(-3 -3)"/>
        </svg>
      </div>

      <h2>NO LEASE</h2>
      <!-- <p class="description">Hi, {{{ user.first_name}}}!</p> -->
      <p class="description">
        Unfortunately, you haven't been added to a lease yet! Your property manager will have to add you to a lease before you can begin paying your rent with Rafi Payment.
      </p>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {

}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.step {
  background: rgb(213, 91, 85);
}
</style>
