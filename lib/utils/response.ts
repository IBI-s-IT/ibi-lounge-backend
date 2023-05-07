import {BackendError, BackendResponse} from "../types/response";

export function wrapInResponse<T>(content: T): BackendResponse<T> {
  return {
    response: content,
  }
}

export function wrapInError<T>(content: T): BackendError<T> {
  return {
    error: content,
  }
}