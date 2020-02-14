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
  path: '/home/registration/financeList',
  name: '登记测试交费列表页'
};

export const HOME_TRUST_FINANCE_LIST = {
  path: '/home/trust/financeList',
  name: '委托测试交费列表页'
};

/**
 * 技术管理人员
 */
export const HOME_REGISTRATION_TASK_LIST = {
  path: '/home/registration/taskList',
  name: '登记测试任务分配列表页'
}

export const HOME_TRUST_TASK_LIST = {
  path: '/home/trust/taskList',
  name: '委托测试任务分配列表页'
}