import { Errors } from './error.interface';

export interface ErrorMessage {
  errors: Errors;
  type?: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}
