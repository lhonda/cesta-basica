import {
  statusDonationWait,
  deliveredToLeader,
  statusDonationReceivedCurrent,
  lostFirstLetterCapitalized,
  returnedFirstLetterCapitalized,
  completedFirstLetterCapitalized,
} from '../../../utils/strings'

export const donationItemTypes = {
  '1': { id: 1, status: statusDonationWait, type: 'wait' },
  '2': { id: 2, status: deliveredToLeader, type: 'wait/prof' },
  '3': { id: 3, status: statusDonationReceivedCurrent, type: 'received/current' },
  '4': { id: 4, status: completedFirstLetterCapitalized, type: 'completed' },
  '5': { id: 5, status: returnedFirstLetterCapitalized, type: 'returned' },
  '6': { id: 6, status: lostFirstLetterCapitalized, type: 'lost' },
}
