import * as ROUTE from '@/constants/route-constants';
import { AUTHORITY } from '@/constants/auth-constants';

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
