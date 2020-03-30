import * as strings from '../utils/strings'
import { func } from 'prop-types'

window.dataLayer = window.dataLayer || []

export function sendEvent({ categoy, action, label }) {
  const event = {
    event: 'ga.event',
    gaCategory: categoy,
    gaAction: action,
    gaLabel: label || null
  }

  window.dataLayer.push(event)
}

export function receivedProf(status, voucher) {
  sendEvent({
    categoy: strings.titleReceivedProf,
    action: status,
    label: voucher
  })
}

export function donationProf(donationId, numberDonation) {
  sendEvent({
    categoy: strings.titleDonationProf,
    action: donationId,
    label: numberDonation
  })
}

export function startDelivery(donationId) {
  sendEvent({
    categoy: strings.legendDonationReceivedButton,
    action: donationId
  })
}

export function endDelivery(donationId) {
  sendEvent({
    categoy: strings.legendDonationReceivedFinishButton,
    action: donationId
  })
}
