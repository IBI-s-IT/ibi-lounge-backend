export interface BackendResponse<T> {
  response: T;
}

export interface BackendError<T> {
  error: T;
}