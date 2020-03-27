import { Events } from '../repositories'

export async function checkCommitment({ login }) {
  const commitment = await Events.findOne({ login })
  return { timestamp: commitment.timestamp }
}