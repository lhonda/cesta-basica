import * as strings from '../utils/strings'
import * as storage from './storage'

window.dataLayer = window.dataLayer || []

const locals = {}

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

export function setUser() {
  if(!locals.userId) {
    console.log(locals)
    const user = ((storage.get()||{user: {}})).user
    locals.userId = user.id
    locals.userRole = user.role
  }

  window.dataLayer.push({
    userId: locals.userId,
    userRole: locals.userRole
  })
}
