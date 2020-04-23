import { Api } from './index'

const rootRoute = '/reports'

export async function getReportList() {
  try {
    return await Api.get(rootRoute)
  } catch ({ response }) {
    return response
  }
}

export async function postReport(dispatch, request, type) {
  try {
    await Api.post(`${rootRoute}/${type}`, request)
    return
  } catch (err) {
    console.log('err: ', err)
  }
}
