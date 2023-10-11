export type IdName = {
  id:   string | null;
  name: string | null;
};

export interface BackendResponse<T> {
  response: T;
}

export interface BackendError<T> {
  error: T;
}