import { IPermissionType, KAFKA_TOPICS } from './types';

interface IRoleOptions {
  [key: string]: IPermissionType;
}

export const ACCOUNT_TYPE: IRoleOptions = {
  FULL_ACCESS: 'FULL_ACCESS',
  STANDARD: 'STANDARD',
  BASIC: 'BASIC',
  TRIAL: 'TRIAL',
};

export const ROLES: IRoleOptions = {
  OWNER: 'OWNER',
  EDITOR: 'EDITOR',
  OBSERVER: 'OBSERVER',
  BLOCKED: 'BLOCKED',
};
