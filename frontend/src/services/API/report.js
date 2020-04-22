import { Api } from './index'

const rootRoute = '/reports'

export async function getReportList() {
  try {
    return await Api.get(rootRoute)
  } catch ({ response }) {
    return response
  }
}
