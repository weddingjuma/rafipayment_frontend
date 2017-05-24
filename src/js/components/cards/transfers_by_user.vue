<template>
  <div>
    <div class="transfer-by-user" @click="toggleExpand">
      <user-card :model="$user" @click="toggleExpand">
        <div class="details text-left">
          <div class="name">{{ $user.full_name }}</div>
        </div>
        <div class="text-right pad">
          <div class="transfers-total">
            {{ total | currency }}
          </div>
          <div class="transfers-label">
            {{ transfers.length | pluralize('transfer') | capitalize }}
          </div>
        </div>
      </user-card>
    </div>

    <collapse :expanded="expanded">
      <transfer-card
        v-for="(transfer, index) in transfers_sorted"
        :data="transfer"
        :key="transfer._id">
      </transfer-card>
    </collapse>
  </div>
</template>

<script>
import moment from 'moment'
import UserModel from '@/models/user'
import userCard from '@/components/cards/user'
import transferCard from '@/components/cards/transfer'
export default {
  name: 'transfers_by_user',
  props: {
    user: {
      type: Object
    },
    transfers: {
      type: Array
    }
  },
  models: {
    user() {
      return new UserModel(this.user)
    }
  },
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    transfers_sorted() {
      return this.transfers.sort((a, b) => {
        return moment.utc(a.created) < moment.utc(b.created) ? 1 : -1
      })
    },
    total() {
      return this.transfers.reduce((a, b) => {
        return a + b.amount
      }, 0)
    }
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded
    }
  },
  components: {
    userCard,
    transferCard
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';
.transfers_by_user {
  margin-bottom: 20px;
}
.box {
  padding: 0;
  margin: 0;
}
.pad {
  padding: 20px;
}
.name {
  font-size: 0.9em;
}
.transfers-total {
  // color: darken($color-text-default, 20%);
}
.transfers-label {
  font-size: 0.7em;
  line-height: 1.4em;
  white-space: nowrap;
  // color: darken($color-text-default, 20%);
  color: #99a0b1;
}
</style>
