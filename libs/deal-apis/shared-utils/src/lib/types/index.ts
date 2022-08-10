export interface IJwtAccessTokens {
  access: string;
  refresh?: string;
  mfa?: string;
  exp?: string | number;
}
export enum JwtSignature {
  ACCESS_TOKEN = 'access',
  REFRESH_TOKEN = 'refresh',
  USER_ROLE = 'role',
}

export interface IJwtAuthToken {
  userId?: string;
  username: string;
  name?: string;
  email: string;
  mfa?: {
    validated: boolean;
    enabled: boolean;
  };
  exp?: string | number;
}

export type IPermissionType =
  | 'BASIC'
  | 'BLOCKED'
  | 'EDITOR'
  | 'FULL_ACCESS'
  | 'OBSERVER'
  | 'OWNER'
  | 'STANDARD'
  | 'TRIAL';

export enum AccountOptions {
  Basic = 'basic',
  Free = 'free',
  Gold = 'gold',
}

export interface IAccountFields {
  expired: boolean;
  expiresAt: string;
  id: string;
  userId: string;
  isTrial: boolean;
  isVerified: boolean;
  plan: AccountOptions;
  status: AccountStatus;
  email?: string;
}

export enum CONSUMER_GROUPS {
  BOARDS = 'boards-service',
  CARDS = 'cards-service',
  LIST = 'list-service',
  AUTH = 'auth-service',
  AUTH_ACTION = 'action-service',
  ACCOUNT = 'accounts-service',
  PAYMENTS = 'payment-service',
  EMAIL = 'email-service',
}

export enum KAFKA_TOPICS {
  AccountCreated = 'account-created-4',
  AccountDeleted = 'account-deleted-2',
  AccountUpdated = 'account-updated-5',

  CustomerCreated = 'customer-created-2',
  CustomerDeleted = 'customer-deleted-1',

  UserCreated = 'user-created-1',
  UserUpdated = 'user-updated-4',
  UserDeleted = 'user-deleted-3',
  GetUser = 'user-request-2',
  UserVerified = 'user-verified-2',

  BoardCreated = 'board-created-1',
  BoardDeleted = 'board-deleted-1',
  BoardUpdated = 'board-updated-1',
  BoardViewed = 'board-viewed-1',
  GetBoardById = 'board-by-id-1',
  GetBoards = 'boards-list-1',

  ListCreated = 'list-created-1',
  ListUpdated = 'list-updated-1',
  ListDeleted = 'list-deleted-1',

  NewAction = 'action-new-2',
  AuthedAction = 'action-authenticated-3',

  Card = 'card-created-1',
  CardUpdated = 'card-updated-1',

  PaymentCreated = 'payments-created-2',
  PaymentFailed = 'payments-failed-1',

  Email = 'send-email-1',
  CreateNotification = 'create-notification-1',

  WorkspaceCreated = 'workspace-created-1',
  WorkspaceUpdated = 'workspace-updated-1',
}

export enum ACTION_KEYS {
  CREATE_BOARD = 'created:board',
  DELETED_BOARD = 'deleted:board',
  ARCHIVED_BOARD = 'archived:board',

  CREATE_CARD = 'created:card',
  TRANSFER_CARD = 'transferred:card',
  COMMENT_ON_CARD = 'commented:on:card',
  ADD_CHECKLIST = 'added:checklist:to:card',
  MOVE_CARD_TO_LIST = 'moved:card:from:list:to:list',
  MOVE_CARD_UP = 'moved:card:up',
  MOVE_CARD_DOWN = 'moved:card:down',
  DELETED_CARD = 'deleted:card',
  ARCHIVED_CARD = 'archived:card',
  CONVERT_TASK_TO_CARD = 'converted:task:to:card',
  CHANGED_CARD_COVER = 'added:card:cover',
  REMOVED_CARD_COVER = 'removed:card:cover',
  ADD_CARD_ATTACHMENT = 'added:card:attachment',
  REMOVE_CARD_ATTACHMENT = 'removed:card:attachment',

  CREATE_LIST = 'add:list:to:board',
  TRANSFER_LIST = 'transferred:list',
  DELETED_LIST = 'deleted:list',
  ARCHIVED_LIST = 'archived:list',
  MOVE_LIST_LEFT = 'move:list:left',
  MOVE_LIST_RIGHT = 'move:list:right',
}

export enum AccountStatus {
  Active = 'active',
  Cancelled = 'cancelled',
  Created = 'created',
  Pending = 'pending',
}

export enum ACTION_TYPES {
  ATTACHMENT = 'attachment',
  BOARD = 'board',
  CARD = 'card',
  CHECKLIST = 'checklist',
  COMMENT = 'comment',
  LIST = 'list',
  TASK = 'task',
}

export interface INewPayment {
  status: string;
  productId: string;
  startAt?: string;
  expiresAt?: string;
  customerId: string;
  orderId: string;
  ownerId: string;
  isTrial: boolean;
  plan: string;
}

export enum HTTPStatusCode {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  IMUsed = 226,

  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,

  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HTTPVersionNotSupported = 505,
}

export interface ISignupCredentials {
  username: string;
  email: string;
  password: string;
}

export interface ILoginCredentials {
  identifier: string;
  password: string;
}

export interface ICodeVerification {
  code: string;
}

export interface ILabelProps {
  color: string;
  id?: string;
  cardId?: string;
  name?: string;
}

export interface INewBoardData {
  title: string;
  activeBg: string;
  prefs: {
    image?: string;
    color?: string;
  };
  workspaceId?: string;
}

export interface ICardDetails {
  productId?: string;
  priceId?: string;
  source?: string;
  currency?: 'usd' | 'eur';
  customerId?: string;
  amount?: string;
  paymentMethodId?: string;
  plan?: string;
}

export interface ICardDraggingProps {
  sourceCardId: string;
  targetCardId: string;
  sourceListId?: string;
  targetListId?: string;
  boardId?: string;
  isSwitchingList?: boolean;
  isSwitchingBoard?: boolean;
  targetBoardId?: string;
}

export interface IUpdateWorkspace {
  name?: string;
  category?: string;
  description?: string;
  shortname?: string;
  visibility?: 'private' | 'public';
}

export interface IRequestError {
  errors: [{ message: string; [key: string]: any }];
}

export interface INewMfaData {
  preference?: {
    email?: boolean;
    sms?: boolean;
    authenticator?: boolean;
  };
  code: string;
}

export interface IPasswordConfirmation {
  password: string;
}

export interface IListDraggingProps {
  sourceListId: string;
  targetListId: string;
  boardId?: string;
  isSwitchingBoard?: boolean;
  targetBoardId: string;
}

export interface IUpdateBoardData {
  [key: string]: any;
}

export interface IRequestError {
  errors: [{ message: string; [key: string]: any }];
}

export interface IEventUserData {
  email?: string;
  id: string;
  firstName?: string;
  lastName?: string;
  verified?: boolean;
}

export interface IKafkaInitConfig {
  clientId: string;
  brokers: string[];
}
