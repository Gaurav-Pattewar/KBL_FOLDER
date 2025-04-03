export class ResponseHandler {
    constructor(success, status, message, data = null) {
        this.success = success;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
