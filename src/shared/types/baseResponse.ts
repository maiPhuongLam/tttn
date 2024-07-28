export class BaseResponse<T> {
  success: boolean;
  data?: T;
  error?: Error;
  message?: string;

  constructor(success: boolean, data?: T, error?: Error, message?: string) {
    this.success = success;
    this.data = data;
    this.error = error;
    this.message = message;
  }

  static success<T>(message: string, data: T): BaseResponse<T> {
    return new BaseResponse(true, data, undefined, message);
  }
}