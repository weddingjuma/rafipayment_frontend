<template>
  <div class="box table user-dl">
    <div class="table-row">
      <div class="table-cell avatar-cell">
        <avatar :initials="$user.initials" :color="$user.avatar_color"></avatar>
      </div>
      <div class="table-cell pad-left text-left" style="width: 332px">
        {{ $user.full_name }}
      </div>
      <div class="table-cell text-right data" style="width: 332px">
        <slot>
          {{ value }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { prettyCurrency } from '@/utils'
import Model from '@/models/user'

export default {
  name: 'transfer-card',
  props: ['user', 'data'],
  models: {
    user() {
      return new Model(this.user)
    }
  },
  computed: {
    value() {
      return this.data ? prettyCurrency(this.data) : 'N/A'
    }
  }
}
</script>

<style lang="scss">
.user-dl {
  padding: 0;
  margin: 10px;
  font-size: 0.7rem;

  .avatar-cell {
    width: 14%;
  }

  .avatar {
    // display: table-cell;
    width: 100%;
    margin: 1em;
  }

  h5 {
    margin-bottom: 5px;
    // font-weight: bold;
  }
  .pad-left {
    padding-left: 30px;
  }
  .pad-right {
    padding-right: 20px;
  }

  .flag {
    margin-right: 0;
    margin-bottom: 6px;
  }
  .data {
    font-size: 1.2em;
  }
}
</style>
