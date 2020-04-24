import HttpException from './http-exception'

export default class ProcessFileException extends HttpException {
  constructor (statusCode, message, processStatus) {
    super(statusCode, message)
    this.processStatus = processStatus
  }
}
