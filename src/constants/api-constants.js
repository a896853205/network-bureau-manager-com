import * as DominConfigs from './domin-constants';

/**
 * 文件
 */
export const UPLOAD_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/uploadFile`; // 上传文件
export const UPLOAD_PDF_FILE = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_FILE}/uploadPdfFile`; // 上传word,pdf文件
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
export const SELECT_MANAGER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_SUPER_MANAGER}/selectManagerInfo`;
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
export const SELECT_REGISTRATION_BASIC = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationBasic`; // 查询登记测试的基本信息
export const SELECT_REGISTRATION_CONTRACT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationContract`; // 查询评测合同的基本信息
export const SELECT_REGISTRATION_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationSpecimen`; // 查询样品文档集的基本信息
export const SELECT_REGISTRATION_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationApply`; // 查询现场测试申请表的基本信息
export const SET_REGISTRATION_DETAIL_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/setRegistrationDetailStatus`;
export const SELECT_REGISTRATION_PRODUCT_DESCRIPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationProductDescription`; // 查询产品描述的基本信息
export const SELECT_REGISTRATION_PRODUCT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationProduct`; // 查询产品介质的基本信息
export const SELECT_REGISTRATION_DOCUMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationDocument`; // 查询用户文档集的基本信息
export const SELECT_REGISTRATION_COPYRIGHT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationCopyright`; // 查询产品描述的基本信息
export const PUSH_REGISTRATION_PROCESS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/pushRegistrationProcess`;
export const SELECT_REGISTRATION_CONTRACT_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationContractManager`; // 查询经管人员填写评测合同的基本信息
export const SAVE_REGISTRATION_CONTRACT_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/saveRegistrationContractManager`; // 保存经管人员填写评测合同的基本信息
export const SELECT_MANAGER_CONTRACT_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectManagerContractUrl`; // 查询评测合同信息
export const SAVE_MANAGER_CONTRACT_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/saveManagerContractUrl`; // 保存评测合同信息
export const DOWNLOAD_CONTRACT_WORD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/downloadContractWord`; // 生成下载word
export const SELECT_ENTERPRISE_CONTRACT_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectEnterpriseContractUrl`; // 查询乙方上传评测合同信息
export const SET_CONTRACT_MANAGER_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/setContractManagerStatus`; // 设置第二步合同签署步骤