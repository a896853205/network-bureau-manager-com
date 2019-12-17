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
      path: '/home/index',
      name: '首页',
      icon: 'audit'
    },
    {
      name: '包括子路由',
      children: [
        {
          path: '/home/index',
          name: '子路由',
          icon: 'audit'
        }
      ]
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
