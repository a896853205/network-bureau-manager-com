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
export const SET_REGISTRATION_DETAIL_SUCCESS_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/setRegistrationDetailSuccessStatus`; // 设置审核通过状态
export const SET_REGISTRATION_DETAIL_FAIL_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/setRegistrationDetailFailStatus`; // 设置内容错误状态
export const SELECT_REGISTRATION_PRODUCT_DESCRIPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationProductDescription`; // 查询产品描述的基本信息
export const SELECT_REGISTRATION_PRODUCT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationProduct`; // 查询产品介质的基本信息
export const SELECT_REGISTRATION_DOCUMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationDocument`; // 查询用户文档集的基本信息
export const SELECT_REGISTRATION_COPYRIGHT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationCopyright`; // 查询产品描述的基本信息
export const PUSH_REGISTRATION_PROCESS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/pushRegistrationProcess`;
export const SELECT_REGISTRATION_CONTRACT_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationContractManager`; // 查询经管人员填写评测合同的基本信息
export const SAVE_REGISTRATION_CONTRACT_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/saveRegistrationContractManager`; // 保存经管人员填写评测合同的基本信息
export const SAVE_MANAGER_CONTRACT_URL = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/saveManagerContractUrl`; // 保存评测合同信息
export const DOWNLOAD_CONTRACT_WORD = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/downloadContractWord`; // 生成下载word
export const SET_CONTRACT_MANAGER_SUCCESS_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/setContractManagerSuccessStatus`; // 设置第二步合同签署成功状态
export const SET_CONTRACT_MANAGER_FAIL_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/setContractManagerFailStatus`; // 设置第二步合同签署失败状态
export const QUERY_FINANCE_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/queryFinanceManager`; // 查询财务管理员
export const UPDATE_FINANCE_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/updateFinanceManager`; // 选择财务管理员
export const QUERY_TECH_LEADER_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/queryTechnicalManager`; // 查询技术负责人
export const ARRANGE_TECH_LEADER_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/arrangeTechLeaderManager`; // 安排技术负责人
export const SELECT_REGISTRATION_ACCOUNTANT_MANAGER_UUID = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationAccoutantManagerUuid`; // 查询登记测试财务管理员的uuid
export const SELECT_REGISTRATION_TECH_LEAD_MANAGER_UUID = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/selectRegistrationTechLeaderManagerUuid`; // 查询登记测试技术负责人管理员的uuid
export const GET_PROJECT_REGISTRATION_TEST_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/getProjectRegistrationTestSpecimen`; // 技术人员查询样品文档集的基本信息
export const SET_PROJECT_SPECIMEN_MANAGER_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/setProjectSpecimenManagerStatus`; // 设置样品登记表审核通过状态
export const SET_PROJECT_SPECIMEN_MANAGER_FAIL_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/setProjectSpecimenManagerFailStatus`; // 设置样品登记表审核不通过状态
export const GET_PROJECT_REGISTRATION_TEST_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_PROJECT_MANAGER}/getProjectRegistrationTestApply`; // 技术人员查询样品文档集的基本信息

/**
 * 财务管理员
 **/
export const QUARY_REGISTRATION_PAYMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ACCOUNTANT_MANAGER}/queryRegistrationPayment`; // 查询企业的缴费信息
export const ACCOUNTANT_CONFIRM_PAYMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_ACCOUNTANT_MANAGER}/accountantConfirmPayment`; // 财务确认缴费成功

/**
 * 技术负责人
 **/
export const QUARY_REGISTRATION_NEED_ASSIGNED = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_LEADER_MANAGER}/queryRegistrationNeedAssigned`; // 查询待分配技术负责人员的企业登记测试列表
export const QUERY_TECH_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_LEADER_MANAGER}/queryTechManager`; // 查询技术负责人
export const ARRANGE_TECH_MANAGER = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_LEADER_MANAGER}/arrangeTechManager`; // 安排技术负责人
export const QUERY_TECH_LEADER_ENTERPRISE_REGISTRATION_STEP = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_LEADER_MANAGER}/queryTechLeaderEnterpriseRegistrationStep`;
export const SELECT_REGISTRATION_TECH_MANAGER_UUID = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_LEADER_MANAGER}/selectRegistrationTechManagerUuid`; // 查询登记测试技术人员的uuid
export const SELECT_REGISTRATION_MANAGER_UUID = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_LEADER_MANAGER}/selectRegistrationManagerUuid`; // 查询登记测试管理员uuid(文件审核页面)
export const SELECT_ENTERPRISE_INFO_BY_FILE_DOWNLOAD_REGISTRATION_UUID = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_LEADER_MANAGER}/selectEnterpriseInfoByFileDownloadRegistrationUuid`; // 查询登记测试企业信息(文件审核页面)
export const GET_REGISTRATION_MANAGER_INFO = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_LEADER_MANAGER}/getRegistrationManagerInfo`; // 查询登记测试管理员uuid(文件审核页面)
export const DOWNLOAD_PRODUCT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_LEADER_MANAGER}/downloadProduct`; // 下载产品介质
export const DOWNLOAD_PRODUCT_DESCRIPTION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_LEADER_MANAGER}/downloadProductDescription`; // 下载产品说明
export const DOWNLOAD_DOCUMENT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_LEADER_MANAGER}/downloadDocument`; // 下载用户文档集
export const DOWNLOAD_COPYRIGHT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_LEADER_MANAGER}/downloadCopyright`; // 下载软件著作权
export const DOWNLOAD_CONTRACT = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_LEADER_MANAGER}/downloadContract`; // 下载合同

/**
 * 技术人员
 **/
export const QUARY_REGISTRATION_NEED_FIELD_TEST = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_MANAGER}/quaryRegistratiomNeedFieldTest`; // 技术人员查找注册登记信息
export const QUERY_TECH_ENTERPRISE_REGISTRATION_STEP = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_MANAGER}/queryTechEnterpriseRegistrationStep`;
export const SELECT_TECH_REGISTRATION = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_MANAGER}/selectTechRegistration`;
export const GET_TECH_REGISTRATION_TEST_SPECIMEN = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_MANAGER}/getTechRegistrationTestSpecimen`; // 技术人员查询样品文档集的基本信息
export const SET_TECH_SPECIMEN_MANAGER_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_MANAGER}/setTechSpecimenManagerStatus`; // 设置样品登记表审核通过状态
export const SET_TECH_SPECIMEN_MANAGER_FAIL_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_MANAGER}/setTechSpecimenManagerFailStatus`; // 设置样品登记表审核不通过状态
export const GET_TECH_REGISTRATION_TEST_APPLY = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_MANAGER}/getTechRegistrationTestApply`; // 技术人员查询现场测试申请表的基本信息
export const SET_TECH_APPLY_MANAGER_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_MANAGER}/setTechApplyManagerStatus`; // 设置现场申请表审核通过状态
export const SET_TECH_APPLY_MANAGER_FAIL_STATUS = `${DominConfigs.DOMAIN}${DominConfigs.PART.OPT_TECH_MANAGER}/setTechApplyManagerFailStatus`; // 设置现场申请表审核不通过状态
