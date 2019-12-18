import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// 导航栏数据
import { NAV } from '@/constants/nav-constants';

// 样式
import { Menu, Icon, Spin } from 'antd';
const { SubMenu } = Menu;

export default props => {
  const { role, managerLoading } = useSelector(state => state.managerStore);

  // 渲染nav 用 NAV[role];
  // nav loading用managerLoading
  return (
    <Spin
      spinning={managerLoading}
      indicator={
        <Icon
          type='loading'
          style={{ fontSize: 24, color: '#fff', marginTop: 20 }}
        />
      }
    >
      <Menu theme='dark' mode='inline'>
        {NAV[role] ? (
          NAV[role].map(oneLevelNav =>
            oneLevelNav.children ? (
              <SubMenu
                key={oneLevelNav.key}
                title={
                  <span>
                    <Icon type={oneLevelNav.icon} />
                    <span>{oneLevelNav.name}</span>
                  </span>
                }
              >
                {oneLevelNav.children.map(twoLevelNav => (
                  <Menu.Item key={twoLevelNav.key}>
                    <Link to={twoLevelNav.path}>{twoLevelNav.name}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={oneLevelNav.key}>
                <Link to={oneLevelNav.path}>
                  <Icon type={oneLevelNav.icon} />
                  {oneLevelNav.name}
                </Link>
              </Menu.Item>
            )
          )
        ) : (
          <div></div>
        )}
      </Menu>
    </Spin>
  );
};
