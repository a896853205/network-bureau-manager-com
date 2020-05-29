import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// 路由
import { useRouteMatch, useHistory } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

// controller
import HomeIndexController from '@/page/home/Home-index-controller.jsx';
import ManagerCreateController from '@/page/home/super-manager/Manager-create-controller.jsx';
import ManagerUpdateController from '@/page/home/super-manager/Manager-update-controller.jsx';
import ManagerShowController from '@/page/home/super-manager/Manager-show-controller.jsx';
import ManagerResultController from '@/page/home/super-manager/Manager-result-controller.jsx';

// 公共
import SettingController from '@/page/home/public/Setting-controller.jsx';
import RegistrationFileDownloadController from '@/page/home/public/Registration-file-download-controller.jsx';
import DelegationFileDownloadController from '@/page/home/public/Delegation-file-download-controller.jsx';

// 项目管理员
import RegistrationListController from '@/page/home/project-manager/Registration-list-controller.jsx';
import RegistrationProfileController from '@/page/home/project-manager/Registration-profile-controller.jsx';
import DelegationListController from '@/page/home/project-manager/Delegation-list-controller.jsx';
import DelegationProfileController from '@/page/home/project-manager/Delegation-profile-controller.jsx';

// 财务管理员
import DelegationFinanceList from '@/page/home/accountant-manager/Delegation-finance-list-controller.jsx';
import RegistrationFinanceList from '@/page/home/accountant-manager/Registration-finance-list-controller.jsx';

// 技术管理人员
import DelegationTaskList from '@/page/home/tech-leader-manager/Delegation-task-list-controller.jsx';
import RegistrationTaskList from '@/page/home/tech-leader-manager/Registration-task-list-controller.jsx';
import RegistrationTaskRouter from '@/page/home/tech-leader-manager/Registration-task-router-controller.jsx';
import DelegationTaskRouter from '@/page/home/tech-leader-manager/Delegation-task-router-controller.jsx';

// 技术人员
import RegistrationTestListController from '@/page/home/tech-manager/Registration-test-list-controller.jsx';
import DelegationTestListController from '@/page/home/tech-manager/Delegation-test-list-controller.jsx';
import RegistrationTestRouter from '@/page/home/tech-manager/Registration-test-router-controller.jsx';
import DelegationTestRouter from '@/page/home/tech-manager/Delegation-test-router-controller.jsx';

// 批准人
import RegistrationCertifyListController from '@/page/home/certifier-manager/Registration-certify-list-controller.jsx';
import DelegationCertifyListController from '@/page/home/certifier-manager/Delegation-certify-list-controller.jsx';
import RegistrationCertifyRouterController from '@/page/home/certifier-manager/Registration-certify-router-controller.jsx';
import DelegationCertifyRouterController from '@/page/home/certifier-manager/Delegation-certify-router-controller.jsx';

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
  const token = localStorage.getItem(`${LOCAL_STORAGE}-token`),
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
      dispatch(managerAction.asyncSetManagerByToken(token));
    }
  }, [uuid, token, dispatch]);

  // 各个路由控制
  const homeRegistrationFileDownload = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_FILE_DOWNLOAD.path,
    exact: true
  });
  const homeDelegationFileDownload = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_FILE_DOWNLOAD.path,
    exact: true
  });
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
  const homeManagerUpdate = useRouteMatch({
    path: `${ROUTES.HOME_MANAGER_UPDATE.path}/:uuid`,
    exact: true
  });
  const homeManagerResult = useRouteMatch({
    path: `${ROUTES.HOME_MANAGER_RESULT.path}/:type`,
    exact: true
  });
  const homeRegistrationList = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_LIST.path,
    exact: true
  });
  const homeRegistrationProfile = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_PROFILE.path
  });
  const homeDelegationList = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_LIST.path,
    exact: true
  });
  const homeDelegationProfile = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_PROFILE.path
  });
  const homeDelegationFinanceList = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_FINANCE_LIST.path,
    exact: true
  });
  const homeRegistrationFinanceList = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_FINANCE_LIST.path,
    exact: true
  });

  // 技术管理人员
  const homeDelegationTaskList = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_TASK_LIST.path,
    exact: true
  });
  const homeRegistrationTaskList = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_TASK_LIST.path,
    exact: true
  });

  const homeRegistrationTaskRouter = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_TASK_ROUTER.path
  });
  const homeDelegationTaskRouter = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_TASK_ROUTER.path
  });

  // 技术人员
  const homeRegistrationTestList = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_TEST_LIST.path,
    exact: true
  });
  const homeDelegationTestList = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_TEST_LIST.path,
    exact: true
  });
  const homeRegistrationTestRouter = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_TEST_ROUTER.path
  });
  const homeDelegationTestRouter = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_TEST_ROUTER.path
  });

  // 批准人
  const homeRegistrationCertifyList = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_CERTIFY_LIST.path,
    exact: true
  });
  const homeDelegationCertifyList = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_CERTIFY_LIST.path,
    exact: true
  });
  const homeRegistrationCertifyRouter = useRouteMatch({
    path: ROUTES.HOME_REGISTRATION_CERTIFY_ROUTER.path
  });
  const homeDelegationCertifyRouter = useRouteMatch({
    path: ROUTES.HOME_DELEGATION_CERTIFY_ROUTER.path
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
            {homeRegistrationFileDownload ? (
              <RegistrationFileDownloadController />
            ) : null}
            {homeDelegationFileDownload ? (
              <DelegationFileDownloadController />
            ) : null}
            {homeIndex ? <HomeIndexController /> : undefined}
            {homeSetting ? <SettingController /> : undefined}
            {homeManagerCreate ? <ManagerCreateController /> : undefined}
            {homeManagerShow ? <ManagerShowController /> : undefined}
            {homeManagerResult ? (
              <ManagerResultController params={homeManagerResult.params} />
            ) : (
              undefined
            )}
            {homeManagerUpdate ? (
              <ManagerUpdateController params={homeManagerUpdate.params} />
            ) : (
              undefined
            )}
            {homeRegistrationList ? <RegistrationListController /> : null}
            {homeDelegationList ? <DelegationListController /> : null}
            {homeRegistrationProfile ? <RegistrationProfileController /> : null}
            {homeDelegationProfile ? <DelegationProfileController /> : null}
            {homeRegistrationFinanceList ? <RegistrationFinanceList /> : null}
            {homeDelegationFinanceList ? <DelegationFinanceList /> : null}

            {/* 技术管理员 */}
            {homeRegistrationTaskList ? <RegistrationTaskList /> : null}
            {homeDelegationTaskList ? <DelegationTaskList /> : null}
            {homeRegistrationTaskRouter ? <RegistrationTaskRouter /> : null}
            {homeDelegationTaskRouter ? <DelegationTaskRouter /> : null}

            {/* 技术人员 */}
            {homeRegistrationTestList ? (
              <RegistrationTestListController />
            ) : null}
            {homeDelegationTestList ? <DelegationTestListController /> : null}
            {homeRegistrationTestRouter ? <RegistrationTestRouter /> : null}
            {homeDelegationTestRouter ? <DelegationTestRouter /> : null}

            {/* 批准人 */}
            {homeRegistrationCertifyList ? (
              <RegistrationCertifyListController />
            ) : null}
            {homeDelegationCertifyList ? <DelegationCertifyListController /> : null}
            {homeRegistrationCertifyRouter ? <RegistrationCertifyRouterController /> : null}
            {homeDelegationCertifyRouter ? <DelegationCertifyRouterController /> : null}
          </div>
        </Content>
        <Footer className='home-footer'>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
