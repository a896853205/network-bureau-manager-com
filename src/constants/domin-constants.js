import { ENVIRONMENT } from './app-constants';
import { SAP_CONTROL } from '../config/app-config';

/** 域名 */
const _DOMAIN = {
  [ENVIRONMENT.DEV]: 'http://localhost:4400',
  [ENVIRONMENT.TEST]: 'http://localhost:4400',
  [ENVIRONMENT.PRO]: 'http://47.94.133.12:4400'
};

export const DOMAIN = _DOMAIN[SAP_CONTROL];

// 模块
export const PART = {
  OPT_MANAGER_USER: '/managerUser',
  OPT_SUPER_MANAGER: '/superManager',
  OPT_PROJECT_MANAGER: '/projectManager',
  OPT_FILE: '/file',
  OPT_ACCOUNTANT_MANAGER: '/accountantManager',
  OPT_TECH_LEADER_MANAGER: '/techLeaderManager',
  OPT_TECH_MANAGER: '/techManager',
  OPT_CERTIFIER: '/certifierManager'
};

// 返回码
export const RESPONSE_CODE = {
  success: 200,
  created: 201,
  noContent: 204,
  error: 400,
  unauthorized: 401,
  serviceError: 500
};
