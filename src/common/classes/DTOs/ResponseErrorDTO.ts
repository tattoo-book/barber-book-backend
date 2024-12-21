export class ResponseErrorDTO<T> {
  status: number;
  message: string;
  description: T;

  constructor(status: number, msg: string, description: T) {
    this.status = status;
    this.message = msg;
    this.description = description;
  }
}
