<template>
  <div class="box user flex">
    <avatar :initials="$user.initials" :color="$user.avatar_color"></avatar>
    <slot>
      <div class="details text-left">
        <h3>{{ $user.full_name }}</h3>
        <h6>{{ $user.email }}</h6>
      </div>
    </slot>
  </div>
</template>

<script>
import app from '@/app'
import UserModel from '@/models/user'

export default {
  name: 'user',
  props: {
    data: Object,
    model: Object
  },
  models: {
    user() {
      let output
      if (this.data) {
        output = new UserModel(this.data)
      } else if (this.model) {
        output = this.model
      }
      return output
    }
  },
  methods: {
    promptDelete() {
      app.$store.dispatch('modal_show', {
        header: 'Confirm Delete',
        message: `Are you sure you want to delete ${this.$user.full_name}?`,
        actions: {
          confirm: this.deleteUser,
          cancel: this.cancel
        }
      })
    },
    deleteUser() {
      this.$store.dispatch('delete', this.data)
    },
    cancel() {
      console.log(this.$user.full_name);
    }
  }
}
</script>

<style scoped lang="scss">
.user {
  // margin: 10px;
  padding: 0;
  // color: #333;
}
.avatar {
  display: block;
  width: 30%;
  margin: 1em;
}
.details {
  width: 70%;
  margin-left: 20px;
  padding: 0;
  border-left: 0;

  h3 {
    // font-weight: bold;
    margin-bottom: 10px;
  }
  h6 {
    font-size: 0.7em;
    margin: 0;
  }
}
</style>
