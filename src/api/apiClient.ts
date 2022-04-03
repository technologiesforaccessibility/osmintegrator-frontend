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
  exported?: boolean;
}

export interface ConnectionAction {
  /** @format uuid */
  osmStopId: string;

  /** @format uuid */
  gtfsStopId: string;
}

export interface Conversation {
  /** @format uuid */
  id?: string | null;

  /** @format double */
  lat?: number | null;

  /** @format double */
  lon?: number | null;

  /** @format uuid */
  stopId?: string | null;

  /** @format uuid */
  tileId: string;
  messages?: Message[] | null;
  status?: NoteStatus;
}

export interface ConversationResponse {
  stopConversations?: Conversation[] | null;
  geoConversations?: Conversation[] | null;
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

export interface Message {
  /** @format uuid */
  id?: string | null;

  /** @format uuid */
  userId?: string | null;
  text?: string | null;
  username?: string | null;
  status?: NoteStatus;

  /** @format date-time */
  createdAt?: string | null;

  /** @format uuid */
  conversationId?: string | null;
  conversation?: Conversation;
}

export interface MessageInput {
  /** @format uuid */
  conversationId?: string | null;
  text?: string | null;

  /** @format double */
  lat?: number | null;

  /** @format double */
  lon?: number | null;

  /** @format uuid */
  stopId?: string | null;

  /** @format uuid */
  tileId: string;
}

export interface NewConnection {
  /** @format uuid */
  connectionId?: string;
  message?: string | null;
}

export interface NewConnectionAction {
  /** @format uuid */
  tileId: string;

  /** @format uuid */
  osmStopId: string;

  /** @format uuid */
  gtfsStopId: string;
}

/**
 * @format int32
 */
export type NoteStatus = 0 | 1 | 2;

export interface OsmChangeOutput {
  changes?: string | null;
  tags?: Record<string, string>;
}

export interface OsmExportInput {
  /** @format email */
  email: string;
  password: string;
  comment: string;
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

export interface Report {
  value?: string | null;
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

  /** @format double */
  initLat?: number | null;

  /** @format double */
  initLon?: number | null;
  number?: string | null;
  tags?: Tag[] | null;
  stopType?: StopType;
  providerType?: ProviderType;

  /** @format uuid */
  tileId?: string;
  outsideSelectedTile?: boolean;

  /** @format int32 */
  version?: number;
  changeset?: string | null;
  isDeleted?: boolean;
}

export interface StopPositionData {
  /** @format double */
  lat: number;

  /** @format double */
  lon: number;

  /** @format uuid */
  stopId: string;
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
  id: string;

  /** @format int64 */
  x: number;

  /** @format int64 */
  y: number;

  /** @format double */
  maxLat: number;

  /** @format double */
  minLon: number;

  /** @format double */
  minLat: number;

  /** @format double */
  maxLon: number;

  /** @format double */
  overlapMaxLat: number;

  /** @format double */
  overlapMinLon: number;

  /** @format double */
  overlapMinLat: number;

  /** @format double */
  overlapMaxLon: number;

  /** @format int32 */
  gtfsStopsCount?: number;

  /** @format int32 */
  zoomLevel?: number;
  assignedUserName?: string | null;

  /** @format int32 */
  unconnectedGtfsStopsCount?: number;
}

export interface TokenData {
  token: string;
  refreshToken: string;
}

export interface UncommittedTile {
  /** @format uuid */
  id: string;

  /** @format int64 */
  x: number;

  /** @format int64 */
  y: number;

  /** @format double */
  maxLat: number;

  /** @format double */
  minLon: number;

  /** @format double */
  minLat: number;

  /** @format double */
  maxLon: number;

  /** @format int32 */
  gtfsStopsCount: number;
  assignedUserName?: string | null;

  /** @format int32 */
  unconnectedGtfsStopsCount?: number;
}

export interface UpdateTileInput {
  /** @format uuid */
  editorId: string;
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
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
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
    accountLogoutCreate: (query?: { returnUrl?: string }, params: RequestParams = {}) =>
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
      this.request<NewConnection, ProblemDetails>({
        path: `/api/Connections`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
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
     * @name ConnectionsRemoveCreate
     * @request POST:/api/Connections/Remove
     */
    connectionsRemoveCreate: (data: ConnectionAction, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Connections/Remove`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
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
     * @tags Conversation
     * @name ConversationCreate
     * @request POST:/api/Conversation
     */
    conversationCreate: (data: MessageInput, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Conversation`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conversation
     * @name ConversationDetail
     * @request GET:/api/Conversation/{tileId}
     */
    conversationDetail: (tileId: string, params: RequestParams = {}) =>
      this.request<ConversationResponse, ProblemDetails>({
        path: `/api/Conversation/${tileId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Conversation
     * @name ConversationApproveUpdate
     * @request PUT:/api/Conversation/Approve
     */
    conversationApproveUpdate: (data: MessageInput, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Conversation/Approve`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Gtfs
     * @name GtfsUpdateStopsUpdate
     * @request PUT:/api/Gtfs/UpdateStops
     */
    gtfsUpdateStopsUpdate: (data: { file?: File }, params: RequestParams = {}) =>
      this.request<Report, ProblemDetails>({
        path: `/api/Gtfs/UpdateStops`,
        method: 'PUT',
        body: data,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags OsmExport
     * @name TilesExportChangesDetail
     * @request GET:/api/tiles/{tileId}/export/changes
     */
    tilesExportChangesDetail: (tileId: string, params: RequestParams = {}) =>
      this.request<OsmChangeOutput, ProblemDetails>({
        path: `/api/tiles/${tileId}/export/changes`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags OsmExport
     * @name TilesExportCreate
     * @request POST:/api/tiles/{tileId}/export
     */
    tilesExportCreate: (tileId: string, data: OsmExportInput, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/tiles/${tileId}/export`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags OsmExport
     * @name TilesExportOscDetail
     * @request GET:/api/tiles/{tileId}/export/osc
     */
    tilesExportOscDetail: (tileId: string, params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/tiles/${tileId}/export/osc`,
        method: 'GET',
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
     * @tags Roles
     * @name RolesUsersDetail
     * @request GET:/api/Roles/{role}/users
     */
    rolesUsersDetail: (role: string, params: RequestParams = {}) =>
      this.request<User[], ProblemDetails>({
        path: `/api/Roles/${role}/users`,
        method: 'GET',
        format: 'json',
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
     * @tags Stop
     * @name StopChangePositionUpdate
     * @request PUT:/api/Stop/ChangePosition
     */
    stopChangePositionUpdate: (data: StopPositionData, params: RequestParams = {}) =>
      this.request<Stop, ProblemDetails>({
        path: `/api/Stop/ChangePosition`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stop
     * @name StopResetPositionCreate
     * @request POST:/api/Stop/ResetPosition/{stopId}
     */
    stopResetPositionCreate: (stopId: string, params: RequestParams = {}) =>
      this.request<Stop, ProblemDetails>({
        path: `/api/Stop/ResetPosition/${stopId}`,
        method: 'POST',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stop
     * @name StopUpdateUpdate
     * @request PUT:/api/Stop/Update
     */
    stopUpdateUpdate: (params: RequestParams = {}) =>
      this.request<void, ProblemDetails>({
        path: `/api/Stop/Update`,
        method: 'PUT',
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
     * @name TileGetUncommittedTilesList
     * @request GET:/api/Tile/GetUncommittedTiles
     */
    tileGetUncommittedTilesList: (params: RequestParams = {}) =>
      this.request<UncommittedTile[], ProblemDetails>({
        path: `/api/Tile/GetUncommittedTiles`,
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
      this.request<Stop[], ProblemDetails>({
        path: `/api/Tile/GetStops/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tile
     * @name TileUpdateUsersUpdate
     * @request PUT:/api/Tile/UpdateUsers/{id}
     */
    tileUpdateUsersUpdate: (id: string, data: UpdateTileInput, params: RequestParams = {}) =>
      this.request<string, ProblemDetails>({
        path: `/api/Tile/UpdateUsers/${id}`,
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
     * @name TileContainsChangesDetail
     * @request GET:/api/Tile/ContainsChanges/{tileId}
     */
    tileContainsChangesDetail: (tileId: string, params: RequestParams = {}) =>
      this.request<boolean, ProblemDetails>({
        path: `/api/Tile/ContainsChanges/${tileId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Tile
     * @name TileUpdateStopsUpdate
     * @request PUT:/api/Tile/UpdateStops/{id}
     */
    tileUpdateStopsUpdate: (id: string, params: RequestParams = {}) =>
      this.request<Report, ProblemDetails>({
        path: `/api/Tile/UpdateStops/${id}`,
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
    usersList: (query?: { role?: string }, params: RequestParams = {}) =>
      this.request<User[], ProblemDetails>({
        path: `/api/Users`,
        method: 'GET',
        query: query,
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
