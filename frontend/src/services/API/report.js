import { Api } from './index'

const rootRoute = '/reports'

export async function getReportList() {
  try {
    return await Api.get(rootRoute)
  } catch ({ response }) {
    return response
  }
}

export async function openUrlReportById(id) {
  try {
    const { data } = await Api.get(`report/${id}/url`)
    window.open(data.url, '_blank')
  } catch (err) {
    console.log(err)
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

export async function deleteReport(id) {
  try {
    return await Api.delete(`report/${id}`)
  } catch ({ response }) {
    return response
  }
}
