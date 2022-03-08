import { AxiosError } from 'axios';

export interface MessageError {
  id: string;
  message: string;
}

export interface MessageListError {
  messages: MessageError[];
}

export interface DataError {
  data: MessageListError[];
  error: string;
  message: [];
  statusCode: number;
}

export interface Response {
  config: any;
  data: DataError;
  headers: any;
  request: any;
  status: number;
  statusText: string;
}

export interface UserError extends AxiosError {
  response: Response;
}
