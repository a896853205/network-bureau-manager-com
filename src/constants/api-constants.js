import * as DominConfigs from './domin-constants';

export const UPLOAD_TO_QiNiu = 'https://upload-z2.qiniup.com'; // 上传七牛

/**
 * 管理用户
 ***************************/
export const GET_MANAGER_TOKEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MANAGER_USER}/getManagerToken`; // 登录
export const GET_MANAGER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MANAGER_USER}/getManagerInfo`;

/**
 * 超级管理员
 */
export const SAVE_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SUPER_MANAGER}/saveManager`;
export const QUERY_ROLE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SUPER_MANAGER}/queryRole`;
export const QUERY_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SUPER_MANAGER}/queryManager`;