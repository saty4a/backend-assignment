export class baseError extends Error {
    constructor(message, status, data, success){
      super(message);
      this.status = status;
      this.data = data;
      this.success = success;
    }
  }