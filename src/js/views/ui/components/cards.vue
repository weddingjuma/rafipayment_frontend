<template>
  <div style='width: 100%;max-width:420px'>
    <div class='field-group'>
      <legend>User Cards</legend>
      <user-card :data='user1'></user-card>
      <user-card :data='user2'></user-card>
      <user-card :data='user3'></user-card>
    </div>
    <div class='field-group'>
      <legend>Lease Cards</legend>
      <lease-card :data='lease1'></lease-card>
      <lease-card :data='lease1'></lease-card>
    </div>
    <div class='field-group'>
      <legend>Transfer Cards</legend>
      <transfer-card :data='transfer1'></transfer-card>
      <transfer-card :data='transfer2'></transfer-card>
      <transfer-card :data='transfer3'></transfer-card>
    </div>
  </div>
</template>

<!-- /////////////////////////////////////////////////////////////////////// -->

<script>
import userCard from '@/components/cards/user'
import leaseCard from '@/components/cards/lease'
import transferCard from '@/components/cards/transfer'
export default {
  data() {
    return {
      user1: {
        first_name: 'Nick',
        last_name: 'Ford',
        email: 'nickforddesign@gmail.com',
        avatar_color: 'teal'
      },
      user2: {
        first_name: 'Chris',
        last_name: 'Antonellis',
        email: 'cantonellis@rafiproperties.com',
        avatar_color: 'goldenrod'
      },
      user3: {
        first_name: 'Ed',
        last_name: 'Guitton',
        email: 'eguitton@rafiproperties.com',
        avatar_color: 'rebeccapurple'
      },
      lease1: {
        'autopay': {
          '587e3ebbe4e05574a3f91e28': true
        },
        'rent': 1300,
        'start_date': '2017-02-01T05:00:00',
        'bill_overdue_day': 2,
        'unit': {
          'property': '587e3ecce4e05574a49cdcd1',
          'number': '3',
          'sq_ft': '1200',
          '_id': '587e3edae4e05574a3f91e29',
          'updated': '2017-01-17T10:57:14.701000',
          'baths': '1',
          'created': '2017-01-17T10:57:14.701000',
          'rent': 1300,
          'beds': '1',
          'company': '587e3e15e4e05574a3f91e23',
          'status': {
            'removed': false
          }
        },
        'first_bill_generation_date': '2017-01-15T05:00:00',
        'end_date': '2018-01-31T05:00:00',
        'type': 'fixed_term',
        '_id': '587e3ee4e4e05574a49cdcd2',
        'last_bill_generation_date': '2017-12-15T05:00:00',
        'status': {
          'removed': false
        },
        'company': '587e3e15e4e05574a3f91e23',
        'created': '2017-01-17T10:57:24.171000',
        'tenants': [{
          'notifications': {
            'email': true,
            'phone': false
          },
          'dwolla': {
            'customer_id': 'f56169f8-011b-476b-839f-5b7d7b4d04c2',
            'primary_funding_source': '85ce6fe0-22e2-433d-84ef-f2adb73bb89d',
            'funding_sources': {
              '331b60a2-5469-4564-98fd-10c8eef23c5c': {
                'status': 'verified'
              },
              '42bc3cce-dc6d-4ce7-9359-84d67a4c2581': {
                'microdeposits': 'completed',
                'status': 'unverified'
              },
              'fd39ff8f-6baf-44f6-8a50-0b1cacfc2931': {
                'status': 'verified'
              },
              '85ce6fe0-22e2-433d-84ef-f2adb73bb89d': {
                'status': 'verified'
              }
            }
          },
          'last_name': 'Haverford',
          'updated': '2017-04-20T12:01:21.604000',
          'avatar_color': 'Orange',
          '_id': '587e3ebbe4e05574a3f91e28',
          'status': {
            'removed': false,
            'declined': false,
            'email': true,
            'password': true,
            'active': true,
            'phone': false
          },
          'role': 'tenant',
          'created': '2017-01-17T10:56:43.247000',
          'email': 'thaverford@gmail.com',
          'company': '587e3e15e4e05574a3f91e23',
          'terms_accepted': {
            'date': '2017-01-17T10:58:00.956000',
            'signature': 'Tom Haverford'
          },
          'first_name': 'Tom'
        }],
        'split': {
          '587e3ebbe4e05574a3f91e28': 1300
        },
        'charges': {
          'scheduled': [{
            'date': '2017-02-01T05:00:00',
            'type': 'first_month',
            'amount': -1300
          }],
          'recurring': [{
            'type': 'rent',
            'amount': 1300
          }]
        },
        'property': {
          'balance': 27,
          'dwolla': {
            'funding_source': null
          },
          '_id': '587e3ecce4e05574a49cdcd1',
          'state': 'Massachusetts',
          'updated': '2017-02-14T12:42:34.533000',
          'city': 'Boston',
          'country': 'United States',
          'address': '344 Boylston St',
          'company': '587e3e15e4e05574a3f91e23',
          'status': {
            'removed': false
          },
          'total': 27,
          'created': '2017-01-17T10:57:00.541000',
          'zip': '02116',
          'place_id': 'ChIJQeti-nR644kROFgXuiec2OQ'
        },
        'bill_due_day': 1,
        'bill_generation_day': 15,
        'updated': '2017-02-10T11:03:25.269000'
      },
      transfer1: {
        'amount': 1,
        'type': 'anytime',
        'created': '2017-04-13T12:01:30.706000',
        'status': {
          'removed': false,
          'state': 'pending'
        },
        'method': 'manual',
        'user': {
          first_name: 'Nick',
          last_name: 'Ford',
          email: 'nickforddesign@gmail.com',
          avatar_color: 'teal'
        }
      },
      transfer2: {
        'amount': 1200.5000020323440948,
        'type': 'rent',
        'created': '2017-04-13T12:05:30.706000',
        'status': {
          'removed': false,
          'state': 'processed'
        },
        'method': 'automatic',
        'user': {
          first_name: 'Tony',
          last_name: 'Pepp',
          email: 'tonypepp@gmail.com',
          avatar_color: 'rebeccapurple'
        }
      }
    }
  },
  components: {
    userCard,
    leaseCard,
    transferCard
  }
}
</script>

<!-- /////////////////////////////////////////////////////////////////////// -->

<style scoped lang='scss'>

</style>
