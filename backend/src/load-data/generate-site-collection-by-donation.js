import { config } from 'dotenv'
import { connect, disconnect } from '../core/database'
import { Donation, Site } from '../repositories'

if (require.main === module) {
  (async function () {
    try {
      config()
      await connect()

      /**
       * Generating the site collection from users and donations collections
       */

      const sites = await Site.find({ siteId: { $exists: true } })
<<<<<<< HEAD
=======
      console.log(sites)
>>>>>>> e3848f91c98dcc3d6c3b8296099407be775c9024

      let maxSiteId = sites.reduce((max, { siteId }) => Number(siteId) > max ? Number(siteId) : max, 0)
      console.log(maxSiteId)

<<<<<<< HEAD
      const donations = await Donation.find() // { siteId: undefined }

      for (const donation of donations) {
        const { site, city, state } = donation
        console.log('checking the site:', site, ' from donationId: ', donation.donationId)

        if (!site) {
          console.log('skipping the donationId: ', donation.donationId, ' because its site value is: ', site)
          continue
        }

        let existing = await Site.findOne({ name: site })

        if (existing) {
          if (!Number.isInteger(existing.siteId)) {
            throw new Error('The site name: ', existing.name, ' already has a crud but does not has and siteId')
          }
        } else {
=======
      const donations = await Donation.find({ siteId: undefined })

      for (const donation of donations) {
        const { site, city, state } = donation
        console.log('checking the site:', site)

        let existing = await Site.findOne({ name: site })

        if (!existing) {
>>>>>>> e3848f91c98dcc3d6c3b8296099407be775c9024
          console.log('the site does not exists: ', site)

          const siteId = ++maxSiteId

          existing = await Site.create({
            siteId,
            name: site,
            city,
            state
          })

<<<<<<< HEAD
          console.log('creating a site name: ', site, ' with id: ', siteId)

          await existing.save()
        }

        if (donation.siteId === existing.siteId) {
          console.log('skipping the donationId: ', donation.donationId, ' same siteId already: ', donation.siteId)
        } else {
          console.log(
            'updating the donationid: ',
            donation.donationId,
            ' from siteId ',
            donation.siteId,
            ' to siteId: ',
            existing.siteId
          )

          donation.siteId = existing.siteId
          donation.name = null
          donation.city = null
          donation.state = null
          await donation.save()
        }
=======
          await existing.save()
        }

        donation.siteId = existing.siteId
        // donation.name = null
        // donation.city = null
        // donation.state = null
        await donation.save()
>>>>>>> e3848f91c98dcc3d6c3b8296099407be775c9024
      }

      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
