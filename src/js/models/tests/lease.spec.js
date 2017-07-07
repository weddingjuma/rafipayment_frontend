import Lease from '@/models/lease'
import lease_data from 'lease'

// console.log(lease_data);

const lease = new Lease(lease_data)

// console.log(lease);

describe('LeaseModel', () => {
  it('should properly create a lease model', () => {
    expect(lease.full_address)
      .toBe('344 Boylston St #4, Boston MA')
  })

  // console.log(JSON.stringify(lease.charges.scheduled));

  it('should be properly creating nested data from schema', () => {
    expect(lease.charges.scheduled.length)
      .toBe(1)
  })

  const output_data = lease.decode()
  // console.log(JSON.stringify(output_data));
  it('should properly decode model data', () => {
    expect(output_data.start_date)
      .toBe('2017-05-01T04:00:00.000Z')
  })
})
