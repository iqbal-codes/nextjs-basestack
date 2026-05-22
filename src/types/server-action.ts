// Server Action Response Types
export type ServerActionResponse<T> =
  | { data: T; error?: undefined; message?: undefined }
  | { data?: undefined; error: string; message?: undefined }
  | { data?: undefined; error?: undefined; message: string };
