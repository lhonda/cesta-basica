import {
  statusDonationWait,
  deliveredToLeader,
  statusDonationReceivedCurrent,
  completedFirstLetterCapitalized,
} from './strings'

export const status = {
  ESPERANDO_RECEBIMENTO: { id: 1, status: statusDonationWait },
  ENTREGUE_LIDER: { id: 2, status: deliveredToLeader },
  ENTREGANDO: { id: 3, status: statusDonationReceivedCurrent },
  COMPLETO: { id: 4, status: completedFirstLetterCapitalized },
}
