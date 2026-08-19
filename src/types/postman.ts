export interface PostmanHeader {
  key: string;
  value?: string;
  description?: string;
}

export interface PostmanQueryParam {
  key: string;
  value?: string;
  description?: string;
}

export interface PostmanUrl {
  raw?: string;
  protocol?: string;
  host?: string[] | string;
  path?: string[] | string;
  query?: PostmanQueryParam[];
  variable?: Array<{ key: string; value?: string }>;
}

export interface PostmanBody {
  mode?: 'raw' | 'urlencoded' | 'formdata' | 'file';
  raw?: string;
  urlencoded?: Array<{ key: string; value?: string; description?: string }>;
  formdata?: Array<{
    key: string;
    value?: string;
    type?: string;
    description?: string;
  }>;
}

export interface PostmanResponse {
  name?: string;
  code?: number;
  status?: string;
  body?: string;
  header?: PostmanHeader[];
}

export interface PostmanRequest {
  method?: string;
  header?: PostmanHeader[];
  body?: PostmanBody;
  url?: PostmanUrl | string;
  description?: string;
}

export interface PostmanItem {
  name?: string;
  request?: PostmanRequest;
  item?: PostmanItem[];
  response?: PostmanResponse[];
  description?: string;
}

export interface PostmanCollection {
  info: {
    name?: string;
    _postman_id?: string;
    description?: string;
    schema?: string;
    version?: string;
  };
  item: PostmanItem[];
  variable?: Array<{ key: string; value?: string }>;
}

export interface PostmanConvertedResult {
  content: string;
  title: string;
  version: string;
}
