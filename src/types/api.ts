export interface ApiParameter {
  name: string;
  in: "query" | "path" | "header" | "cookie" | "body";
  required: boolean;
  type: string;
  description?: string;
}

export interface ApiResponse {
  statusCode: string;
  description: string;
  example?: string;
}

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export interface ApiEndpoint {
  method: HttpMethod;
  path: string;
  summary?: string;
  description?: string;
  parameters?: ApiParameter[];
  responses?: ApiResponse[];
  tags?: string[];
  krakendUrl?: string;
  requestBody?: string;
}

export interface ApiData {
  title: string;
  version?: string;
  description?: string;
  baseUrl?: string;
  partner?: string;
  endpoints: ApiEndpoint[];
}
