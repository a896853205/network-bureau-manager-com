import * as DominConfigs from './domin-constants';

/**
 * 文件
 */
export const UPLOAD_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/uploadFile`; // 上传文件
export const GET_FILE_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/getFileUrl`; // 获取文件url

/**
 * 管理用户
 ***************************/
export const GET_MANAGER_TOKEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MANAGER_USER}/getManagerToken`; // 登录
export const GET_MY_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_MANAGER_USER}/getMyInfo`;

/**
 * 超级管理员
 */
export const SAVE_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SUPER_MANAGER}/saveManager`;
export const QUERY_ROLE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SUPER_MANAGER}/queryRole`;
export const QUERY_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SUPER_MANAGER}/queryManager`;
export const GET_MANAGER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SUPER_MANAGER}/getManagerInfo`;
export const DELETE_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SUPER_MANAGER}/deleteManager`;

/**
 * 项目管理员
 **/
export const QUERY_REGISTRATION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/queryRegistration`; // 查询登记测试
export const QUERY_SYS_REGISTRATION_STEP = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/querySysRegistrationStep`; // 无条件查询系统测试步骤
export const QUERY_ENTERPRISE_REGISTRATION_STEP = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/queryEnterpriseRegistrationStep`;
export const SELECT_REGISTRATION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistration`;
export const SELECT_ENTERPRISE_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectEnterpriseInfo`; // 通过uuid查询企业基本信息
export const SELECT_REGISTRATION_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationStatus`; // 查询企业用户登记测试8个文件
export const SELECT_REGISTRATION_BASIC = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationBasic`;
export const SET_REGISTRATION_DETAIL_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/setRegistrationDetailStatus`;
