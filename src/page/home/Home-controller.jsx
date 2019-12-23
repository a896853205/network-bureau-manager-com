import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// 路由
import { useRouteMatch, useHistory } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

// controller
import HomeIndexController from '@/page/home/Home-index-controller.jsx';
import SettingController from '@/page/home/public/Setting-controller.jsx';
import ManagerCreateController from '@/page/home/super-manager/Manager-create-controller.jsx';
import ManagerShowController from '@/page/home/super-manager/Manager-show-controller.jsx';
import ManagerResultController from '@/page/home/super-manager/Manager-result-controller.jsx';
// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// actions
import managerAction from '@/redux/action/manager';

// components
import Nav from '@/components/home/Nav.jsx';

// 样式
import '@/style/home/home.styl';
import { Layout, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export default props => {
  const token = window.localStorage.getItem(`${LOCAL_STORAGE}-token`),
    { uuid } = useSelector(state => state.managerStore),
    history = useHistory(),
    dispatch = useDispatch();

  // 如果没有token就跳到首页
  useEffect(() => {
    if (!token) {
      history.push(ROUTES.INDEX.path);
    }
  }, [token, history]);

  // 刷新页面会导致uuid消失,需要用token再请求一遍
  useEffect(() => {
    if (!uuid && token) {
      // 由token获取manager信息
      dispatch(managerAction.asyncSetManagerByToken());
    }
  }, [uuid, token, dispatch]);

  // 各个路由控制
  const homeIndex = useRouteMatch({
    path: ROUTES.HOME_INDEX.path,
    exact: true
  });
  const homeSetting = useRouteMatch({
    path: ROUTES.HOME_SETTIND.path,
    exact: true
  });
  const homeManagerShow = useRouteMatch({
    path: ROUTES.HOME_MANAGER_SHOW.path,
    exact: true
  });
  const homeManagerCreate = useRouteMatch({
    path: ROUTES.HOME_MANAGER_CREATE.path,
    exact: true
  });
  const homeManagerResult = useRouteMatch({
    path: ROUTES.HOME_MANAGER_RESULT.path,
    exact: true
  });

  return (
    <Layout>
      <Sider className='home-sider'>
        <div className='logo'>
          <Icon type='reconciliation' />
          <span>业务管理系统</span>
        </div>
        {/* 导航栏 */}
        <Nav />
      </Sider>
      <Layout className='home-content'>
        <Header className='home-header' />
        <Content className='content-box'>
          <div className='content-inner-box'>
            {homeIndex ? <HomeIndexController /> : undefined}
            {homeSetting ? <SettingController /> : undefined}
            {homeManagerCreate ? <ManagerCreateController /> : undefined}
            {homeManagerShow ? <ManagerShowController /> : undefined}
            {homeManagerResult ? (
              <ManagerResultController params={homeManagerResult.params} />
            ) : (
              undefined
            )}
          </div>
        </Content>
        <Footer className='home-footer'>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
