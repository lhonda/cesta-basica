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
    const response = await Api.post(`${rootRoute}/${type}`, request)
    console.log('response: ', response)
    return null
  } catch ({ response }) {
    return response
  }
}
