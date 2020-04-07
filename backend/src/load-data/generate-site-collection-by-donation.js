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
      console.log(sites)

      let maxSiteId = sites.reduce((max, { siteId }) => Number(siteId) > max ? Number(siteId) : max, 0)
      console.log(maxSiteId)

      const donations = await Donation.find({ siteId: undefined })

      for (const donation of donations) {
        const { site, city, state } = donation
        console.log('checking the site:', site)

        let existing = await Site.findOne({ name: site })

        if (!existing) {
          console.log('the site does not exists: ', site)

          const siteId = ++maxSiteId

          existing = await Site.create({
            siteId,
            name: site,
            city,
            state
          })

          await existing.save()
        }

        donation.siteId = existing.siteId
        // donation.name = null
        // donation.city = null
        // donation.state = null
        await donation.save()
      }

      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
