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
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      name: '首页',
      icon: 'bank'
    },
    {
      key: 'registrationFinanceList',
      path: ROUTE.HOME_REGISTRATION_FINANCE_LIST.path,
      name: '登记测试列表',
      icon: 'file-done'
    },
    {
      key: 'delegationFinanceList',
      path: ROUTE.HOME_DELEGATION_FINANCE_LIST.path,
      name: '委托测试列表',
      icon: 'audit'
    },
    {
      key: 'setting',
      path: ROUTE.HOME_SETTIND.path,
      name: '个人设置',
      icon: 'setting'
    }
  ],
  [AUTHORITY.PROJECT_MANAGER.code]: [
    {
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      name: '首页',
      icon: 'bank'
    },
    {
      key: 'registrationList',
      path: ROUTE.HOME_REGISTRATION_LIST.path,
      name: '登记测试列表',
      icon: 'file-done'
    },
    {
      key: 'delegationList',
      path: ROUTE.HOME_DELEGATION_LIST.path,
      name: '委托测试列表',
      icon: 'audit'
    },
    {
      key: 'setting',
      path: ROUTE.HOME_SETTIND.path,
      name: '个人设置',
      icon: 'setting'
    }
  ],
  [AUTHORITY.TECH_LEADER.code]: [
    {
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      name: '首页',
      icon: 'bank'
    },
    {
      key: 'registrationFinanceList',
      path: ROUTE.HOME_REGISTRATION_TASK_LIST.path,
      name: '登记测试列表',
      icon: 'file-done'
    },
    {
      key: 'delegationFinanceList',
      path: ROUTE.HOME_DELEGATION_TASK_LIST.path,
      name: '委托测试列表',
      icon: 'audit'
    },
    {
      key: 'setting',
      path: ROUTE.HOME_SETTIND.path,
      name: '个人设置',
      icon: 'setting'
    }
  ],
  [AUTHORITY.TECH.code]: [
    {
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      name: '首页',
      icon: 'bank'
    },
    {
      key: 'registrationTestList',
      path: ROUTE.HOME_REGISTRATION_TEST_LIST.path,
      name: '登记测试列表',
      icon: 'file-done'
    },
    {
      key: 'delegationTestList',
      path: ROUTE.HOME_DELEGATION_TEST_LIST.path,
      name: '委托测试列表',
      icon: 'audit'
    },
  ],
  [AUTHORITY.CERTIFIER.code]: [
    {
      key: 'manager',
      path: ROUTE.HOME_INDEX.path,
      name: '首页',
      icon: 'bank'
    },
    {
      key: 'registrationCertifyList',
      path: ROUTE.HOME_REGISTRATION_CERTIFY_LIST.path,
      name: '登记测试列表',
      icon: 'file-done'
    },
    {
      key: 'delegationCertifyList',
      path: ROUTE.HOME_DELEGATION_CERTIFY_LIST.path,
      name: '委托测试列表',
      icon: 'audit'
    },
  ]
};
