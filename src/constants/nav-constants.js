import * as ROUTE from '@/constants/route-constants';

// 权限
const AUTHORITY = {
  SUPER: {
    name: '超级管理员',
    code: 1
  },
  ACCOUNTANT: {
    name: '财务',
    code: 5
  },
  PROJECT_MANAGER: {
    name: '项目管理人员',
    code: 10
  },
  TECH_LEADER: {
    name: '技术负责人',
    code: 15
  },
  TECH: {
    name: '技术人员',
    code: 20
  },
  CERTIFIER: {
    name: '批准人',
    code: 25
  }
};

export const NAV = {
  [AUTHORITY.SUPER.code]: [
    {
      key: 'manager',
      icon: 'audit',
      name: '管理人员',
      children: [
        {
          key: 'showManager',
          path: ROUTE.HOME_MANAGER_SHOW.path,
          name: '查看管理员'
        },
        {
          key: 'createManager',
          path: ROUTE.HOME_MANAGER_CREATE.path,
          name: '添加管理员'
        }
      ]
    },
    {
      key: 'setting',
      path: ROUTE.HOME_SETTIND.path,
      name: '个人设置',
      icon: 'audit'
    }
  ],
  [AUTHORITY.ACCOUNTANT.code]: [
    {
      path: '/home/index',
      name: '首页',
      icon: 'audit'
    }
  ],
  [AUTHORITY.PROJECT_MANAGER.code]: [
    {
      path: '/home/index',
      name: '首页',
      icon: 'audit'
    }
  ],
  [AUTHORITY.TECH_LEADER.code]: [
    {
      path: '/home/index',
      name: '首页',
      icon: 'audit'
    }
  ],
  [AUTHORITY.TECH.code]: [
    {
      path: '/home/index',
      name: '首页',
      icon: 'audit'
    }
  ],
  [AUTHORITY.CERTIFIER.code]: [
    {
      path: '/home/index',
      name: '首页',
      icon: 'audit'
    }
  ]
};
