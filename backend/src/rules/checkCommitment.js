import { Events } from '../repositories'

export async function checkCommitment ({ login }) {
  const commitment = await Events.findOne({ login })
  if (commitment) {
    return {
      commitment: true,
      timestamp: commitment.timestamp
    }
  }
  return { commitment: false }
}
