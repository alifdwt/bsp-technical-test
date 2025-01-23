export interface IResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IFindAllResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
