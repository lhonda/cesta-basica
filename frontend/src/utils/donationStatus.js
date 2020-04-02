import { deliveredToLeader, deliveredFirstLetterCapitalized, notDeliveredFirstLetterCapitalized } from './strings'

export const DonationStatus = {
  ENTREGUE_LIDER: { id: 1, status: deliveredToLeader },
  ENTREGUE: { id: 2, status: deliveredFirstLetterCapitalized },
  NAO_ENTREGUE: { id: 3, status: notDeliveredFirstLetterCapitalized },
}
