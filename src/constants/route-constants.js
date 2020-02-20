export const BCG_ROOT_NAME = 'background';

// 一级路由
export const INDEX = { path: '/', name: '首页' };
export const HOME = { path: '/home', name: '主页' };

// 二级路由
export const HOME_INDEX = { path: '/home/index', name: '主首页' };
export const HOME_SETTIND = { path: '/home/setting', name: '个人设置页' };
export const HOME_MANAGER_SHOW = {
  path: '/home/manager/show',
  name: '管理员展示页'
};
export const HOME_MANAGER_CREATE = {
  path: '/home/manager/create',
  name: '管理员创建页'
};
export const HOME_MANAGER_UPDATE = {
  path: '/home/manager/update',
  name: '管理员修改页'
};
export const HOME_MANAGER_RESULT = {
  path: '/home/manager/result',
  name: '结果页'
};

/**
 * 公共路由
 */
export const HOME_REGISTRATION_FILE_DOWNLOAD = {
  path: '/home/registration/file/download',
  name: '登记测试文件下载查看页'
};

/**
 * 项目管理员
 */
export const HOME_REGISTRATION_LIST = {
  path: '/home/registration/list',
  name: '登记测试列表页'
};
export const HOME_REGISTRATION_PROFILE = {
  path: '/home/registration/profile',
  name: '登记测试预览页'
};
export const HOME_TRUST_LIST = {
  path: '/home/trust/list',
  name: '委托测试列表页'
};
export const HOME_REGISTRATION_DETAIL = {
  path: '/home/registration/profile/detail',
  name: '详情审核页'
};

/**
 * 财务人员
 */
export const HOME_REGISTRATION_FINANCE_LIST = {
  path: '/home/registration/finance/list',
  name: '登记测试交费列表页'
};

export const HOME_TRUST_FINANCE_LIST = {
  path: '/home/trust/finance/list',
  name: '委托测试交费列表页'
};

/**
 * 技术管理人员
 */
export const HOME_REGISTRATION_TASK_LIST = {
  path: '/home/registration/task/list',
  name: '登记测试任务分配列表页'
};

export const HOME_REGISTRATION_TASK_ROUTER = {
  path: '/home/registration/task/router',
  name: '登记测试任务分配基础'
};

/**
 * 三级路由开始
 ************************/
export const HOME_REGISTRATION_TASK_PROFILE = {
  path: '/home/registration/task/router/profile',
  name: '登记测试待任务分配预览页'
};

export const HOME_REGISTRATION_TASK_ASSIGN_TECH = {
  path: '/home/registration/task/router/assign/tech',
  name: '登记测试任务分配技术人员页'
};

/**
 * 三级路由结束
 ************************/

 export const HOME_TRUST_TASK_LIST = {
  path: '/home/trust/task/list',
  name: '委托测试任务分配列表页'
};

/**
 * 技术人员
 */

export const HOME_REGISTRATION_TEST_LIST = {
  path: '/home/registration/test/list',
  name: '登记测试待测试列表页'
};

export const HOME_REGISTRATION_TEST_ROUTER = {
  path: '/home/registration/test/router',
  name: '登记测试待测试预览页'
};

/**
 * 三级路由开始
 ***********************/
export const HOME_REGISTRATION_TEST_PROFILE = {
  path: '/home/registration/test/router/profile',
  name: '登记测试待测试预览页'
};

export const HOME_REGISTRATION_TEST_DETAIL_APPLY = {
  path: '/home/registration/test/router/apply',
  name: '登记测试软件评测样品登记表预览页'
};

export const HOME_REGISTRATION_TEST_DETAIL_SPECIMEN = {
  path: '/home/registration/test/router/specimen',
  name: '登记测试软件评测现场测试申请表预览页'
};

/**
 * 三级路由结束
 ***********************/

export const HOME_TRUST_TEST_LIST = {
  path: '/home/trust/test/list',
  name: '委托测试待测试列表页'
};
