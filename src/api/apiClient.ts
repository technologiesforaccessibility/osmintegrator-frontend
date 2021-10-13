/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ConfirmEmail {
  /** @format email */
  newEmail: string;

  /** @format email */
  oldEmail: string;
  token: string;
}

export interface ConfirmRegistration {
  /** @format email */
  email: string;
  token: string;
}

export interface Connection {
  /** @format uuid */
  id?: string;

  /** @format uuid */
  gtfsStopId?: string;

  /** @format uuid */
  osmStopId?: string;
  osmStop?: Stop;
  gtfsStop?: Stop;
  imported?: boolean;
  approved?: boolean;
}

export interface ConnectionAction {
  /** @format uuid */
  osmStopId: string;

  /** @format uuid */
  gtfsStopId: string;
}

export interface CreateChangeFileRequestInput {
  /** @format uuid */
  tileUuid: string;
}

export interface ForgotPassword {
  /** @format email */
  email: string;
}

export interface LoginData {
  /** @format email */
  email: string;
  password: string;
}

export interface NewConnectionAction {
  /** @format uuid */
  tileId: string;

  /** @format uuid */
  osmStopId: string;

  /** @format uuid */
  gtfsStopId: string;
}

export interface NewNote {
  /** @format uuid */
  userId?: string;

  /** @format double */
  lat: number;

  /** @format double */
  lon: number;

  /** @format uuid */
  tileId: string;
  text?: string | null;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;

  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
}

/**
 * @format int32
 */
export type ProviderType = 0 | 1;

export interface RegisterData {
  /** @format email */
  email: string;
  username: string;
  password: string;
}

export interface ResetEmail {
  /** @format email */
  email: string;
}

export interface ResetPassword {
  /** @format email */
  email: string;

  /** @format password */
  password: string;
  token: string;
}

export interface RolePair {
  name?: string | null;
  value?: boolean;
}

export interface RoleUser {
  /** @format uuid */
  id: string;
  userName: string;
  roles: RolePair[];
}

export interface Stop {
  /** @format uuid */
  id?: string;

  /** @format int64 */
  stopId?: number;
  name?: string | null;

  /** @format double */
  lat?: number;

  /** @format double */
  lon?: number;
  number?: string | null;
  tags?: Tag[] | null;
  stopType?: StopType;
  providerType?: ProviderType;

  /** @format uuid */
  tileId?: string;
  tile?: Tile;
  outsideSelectedTile?: boolean;

  /** @format int32 */
  version?: number;
  changeset?: string | null;
}

/**
 * @format int32
 */
export type StopType = 0 | 1;

export interface Tag {
  key?: string | null;
  value?: string | null;
}

export interface Tile {
  /** @format uuid */
  id?: string;

  /** @format int64 */
  x?: number;

  /** @format int64 */
  y?: number;

  /** @format double */
  maxLat?: number;

  /** @format double */
  minLon?: number;

  /** @format double */
  minLat?: number;

  /** @format double */
  maxLon?: number;

  /** @format double */
  overlapMaxLat?: number;

  /** @format double */
  overlapMinLon?: number;

  /** @format double */
  overlapMinLat?: number;

  /** @format double */
  overlapMaxLon?: number;

  /** @format int32 */
  osmStopsCount?: number;

  /** @format int32 */
  gtfsStopsCount?: number;

  /** @format int32 */
  usersCount?: number | null;
  stops?: Stop[] | null;
  approvedByEditor?: boolean;
  approvedBySupervisor?: boolean;
}

export interface TokenData {
  token: string;
  refreshToken: string;
}

export interface UpdateNote {
  /** @format uuid */
  id: string;

  /** @format double */
  lat: number;

  /** @format double */
  lon: number;
  text: string;
}

export interface User {
  /** @format uuid */
  id: string;
  userName?: string | null;

  /** @format email */
  email?: string | null;
  roles?: string[] | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return (
      encodeURIComponent(key) +
      '=' +
      encodeURIComponent(Array.isArray(value) ? value.join(',') : typeof value === 'number' ? value : `${value}`)
    );
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(key => 'undefined' !== typeof query[key]);
    return keys
      .map(key =>
        typeof query[key] === 'object' && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as QueryParamsType)
          : this.addQueryParam(query, key),
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format = 'json',
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams = (secure && this.securityWorker && (await this.securityWorker(this.securityData))) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];

    return fetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? {'Content-Type': type} : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async response => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = await response[format]()
        .then(data => {
          if (r.ok) {
            r.data = data;
          } else {
            r.error = data;
          }
          return r;
        })
        .catch(e => {
          r.error = e;
          return r;
        });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title osmintegrator
 * @version v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Account
     * @name AccountIsTokenValidList
     * @request GET:/api/Account/IsTokenValid
     */
    accountIsTokenValidList: (params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Account/IsTokenValid`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountLogoutCreate
     * @request POST:/api/Account/Logout
     */
    accountLogoutCreate: (query?: {returnUrl?: string}, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Account/Logout`,
        method: 'POST',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountLoginCreate
     * @request POST:/api/Account/Login
     */
    accountLoginCreate: (data: LoginData, params: RequestParams = {}) =>
      this.request<TokenData, ProblemDetails>({
        path: `/api/Account/Login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountRefreshCreate
     * @request POST:/api/Account/Refresh
     */
    accountRefreshCreate: (data: TokenData, params: RequestParams = {}) =>
      this.request<TokenData, ProblemDetails>({
        path: `/api/Account/Refresh`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountConfirmRegistrationCreate
     * @request POST:/api/Account/ConfirmRegistration
     */
    accountConfirmRegistrationCreate: (data: ConfirmRegistration, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Account/ConfirmRegistration`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountRegisterCreate
     * @request POST:/api/Account/Register
     */
    accountRegisterCreate: (data: RegisterData, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Account/Register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountForgotPasswordCreate
     * @request POST:/api/Account/ForgotPassword
     */
    accountForgotPasswordCreate: (data: ForgotPassword, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Account/ForgotPassword`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountConfirmEmailCreate
     * @request POST:/api/Account/ConfirmEmail
     */
    accountConfirmEmailCreate: (data: ConfirmEmail, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Account/ConfirmEmail`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountChangeEmailCreate
     * @request POST:/api/Account/ChangeEmail
     */
    accountChangeEmailCreate: (data: ResetEmail, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Account/ChangeEmail`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Account
     * @name AccountResetPasswordCreate
     * @request POST:/api/Account/ResetPassword
     */
    accountResetPasswordCreate: (data: ResetPassword, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Account/ResetPassword`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Connections
     * @name ConnectionsUpdate
     * @request PUT:/api/Connections
     */
    connectionsUpdate: (data: NewConnectionAction, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Connections`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Connections
     * @name ConnectionsDelete
     * @request DELETE:/api/Connections
     */
    connectionsDelete: (data: ConnectionAction, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Connections`,
        method: 'DELETE',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Connections
     * @name ConnectionsList
     * @request GET:/api/Connections
     */
    connectionsList: (params: RequestParams = {}) =>
      this.request<Connection[], ProblemDetails>({
        path: `/api/Connections`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Connections
     * @name ConnectionsDetail
     * @request GET:/api/Connections/{id}
     */
    connectionsDetail: (id: string, params: RequestParams = {}) =>
      this.request<Connection[], ProblemDetails>({
        path: `/api/Connections/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Connections
     * @name ConnectionsApproveUpdate
     * @request PUT:/api/Connections/Approve/{id}
     */
    connectionsApproveUpdate: (id: string, params: RequestParams = {}) =>
      this.request<string, ProblemDetails>({
        path: `/api/Connections/Approve/${id}`,
        method: 'PUT',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Connections
     * @name ConnectionsUnpproveUpdate
     * @request PUT:/api/Connections/Approve/{id}
     */
    connectionsUnapproveUpdate: (id: string, params: RequestParams = {}) =>
      this.request<string, ProblemDetails>({
        path: `/api/Connections/Unapprove/${id}`,
        method: 'PUT',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notes
     * @name NotesCreate
     * @request POST:/api/Notes
     */
    notesCreate: (data: NewNote, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Notes`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notes
     * @name NotesUpdate
     * @request PUT:/api/Notes
     */
    notesUpdate: (data: UpdateNote, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Notes`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notes
     * @name NotesDetail
     * @request GET:/api/Notes/{id}
     */
    notesDetail: (id: string, params: RequestParams = {}) =>
      this.request<NewNote[], ProblemDetails>({
        path: `/api/Notes/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notes
     * @name NotesDelete
     * @request DELETE:/api/Notes/{id}
     */
    notesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Notes/${id}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notes
     * @name NotesApproveUpdate
     * @request PUT:/api/Notes/Approve/{id}
     */
    notesApproveUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Notes/Approve/${id}`,
        method: 'PUT',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notes
     * @name NotesRejectUpdate
     * @request PUT:/api/Notes/Reject/{id}
     */
    notesRejectUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Notes/Reject/${id}`,
        method: 'PUT',
        ...params,
      }),

    /**
     * No description
     *
     * @tags OsmChangeFile
     * @name OsmChangeFileGetChangeFileList
     * @request GET:/api/OsmChangeFile/GetChangeFile
     */
    osmChangeFileGetChangeFileList: (data: CreateChangeFileRequestInput, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/OsmChangeFile/GetChangeFile`,
        method: 'GET',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesList
     * @request GET:/api/Roles
     */
    rolesList: (params: RequestParams = {}) =>
      this.request<RoleUser[], ProblemDetails>({
        path: `/api/Roles`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesUpdate
     * @request PUT:/api/Roles
     */
    rolesUpdate: (data: RoleUser[], params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Roles`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stop
     * @name StopList
     * @request GET:/api/Stop
     */
    stopList: (params: RequestParams = {}) =>
      this.request<Stop[], ProblemDetails>({
        path: `/api/Stop`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tile
     * @name TileGetAllTilesList
     * @request GET:/api/Tile/GetAllTiles
     */
    tileGetAllTilesList: (params: RequestParams = {}) =>
      this.request<Tile[], ProblemDetails>({
        path: `/api/Tile/GetAllTiles`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tile
     * @name TileGetTilesList
     * @request GET:/api/Tile/GetTiles
     */
    tileGetTilesList: (params: RequestParams = {}) =>
      this.request<Tile[], ProblemDetails>({
        path: `/api/Tile/GetTiles`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tile
     * @name TileGetStopsDetail
     * @request GET:/api/Tile/GetStops/{id}
     */
    tileGetStopsDetail: (id: string, params: RequestParams = {}) =>
      this.request<Stop, ProblemDetails>({
        path: `/api/Tile/GetStops/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tile
     * @name TileGetUsersDetail
     * @request GET:/api/Tile/GetUsers/{id}
     */
    tileGetUsersDetail: (id: string, params: RequestParams = {}) =>
      this.request<Tile, ProblemDetails>({
        path: `/api/Tile/GetUsers/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tile
     * @name TileRemoveUserDelete
     * @request DELETE:/api/Tile/RemoveUser/{id}
     */
    tileRemoveUserDelete: (id: string, params: RequestParams = {}) =>
      this.request<string, ProblemDetails>({
        path: `/api/Tile/RemoveUser/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tile
     * @name TileUpdateUserUpdate
     * @request PUT:/api/Tile/UpdateUser/{id}
     */
    tileUpdateUserUpdate: (id: string, data: User, params: RequestParams = {}) =>
      this.request<string, ProblemDetails>({
        path: `/api/Tile/UpdateUser/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tile
     * @name TileApproveUpdate
     * @request PUT:/api/Tile/Approve/{id}
     */
    tileApproveUpdate: (id: string, params: RequestParams = {}) =>
      this.request<string, ProblemDetails>({
        path: `/api/Tile/Approve/${id}`,
        method: 'PUT',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserList
     * @request GET:/api/User
     */
    userList: (params: RequestParams = {}) =>
      this.request<User, ProblemDetails>({
        path: `/api/User`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UserDetail
     * @request GET:/api/User/{id}
     */
    userDetail: (id: string, params: RequestParams = {}) =>
      this.request<User, ProblemDetails>({
        path: `/api/User/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersList
     * @request GET:/api/Users
     */
    usersList: (params: RequestParams = {}) =>
      this.request<User[], ProblemDetails>({
        path: `/api/Users`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Version
     * @name VersionList
     * @request GET:/api/Version
     */
    versionList: (params: RequestParams = {}) =>
      this.request<string, ProblemDetails>({
        path: `/api/Version`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
