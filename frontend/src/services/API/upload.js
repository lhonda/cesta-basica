import { Api } from './index'

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    }
  }

export async function Upload({ donationId, file }) {
  try {
    await Api.post(`donations/${donationId}/receive`, file, config)
  } catch (err) {
    return 'failed'
  }
}
