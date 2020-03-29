import { titleReceivedProf, titleDonationProf } from '../utils/strings'

window.dataLayer = window.dataLayer || []

export function sendEvent({ categoy, action, label }) {
  const event = {
    event: 'ga.event',
    gaCategory: categoy,
    gaAction: action,
  }

  if(label) {
    event.gaLabel = label
  }

  window.dataLayer.push(event)
}

export function receivedProf(status, voucher) {
  sendEvent({
    categoy: titleReceivedProf,
    action: status,
    label: voucher
  })
}

export function donationProf(donationId, numberDonation) {
  sendEvent({
    categoy: titleDonationProf,
    action: donationId,
    label: numberDonation
  })
}