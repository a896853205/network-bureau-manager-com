import React, { useEffect } from 'react';

// 子组件
import PrepareTest from '@/components/home/tech-manager/Prepare-test.jsx';
// import Test from '@/components/home/tech-manager/Test.jsx';
import GenerateReport from '@/components/home/tech-manager/Generate-report.jsx';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 路由
import { useHistory } from 'react-router-dom';
import * as ROUTES from '@/constants/route-constants';

// 样式
import { Timeline, Icon } from 'antd';
import '@/style/home/item.styl';
import '@/style/home/tech-manager/registration-test-profile.styl';

export default props => {
  const localStorageRegistrationUuid = localStorage.getItem(
      `${LOCAL_STORAGE}-registrationUuid`
    ),
    { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    dispatch = useDispatch(),
    history = useHistory();

  // 如果没有localStorageRegistrationUuid就跳到列表页
  useEffect(() => {
    if (!localStorageRegistrationUuid) {
      history.push(ROUTES.HOME_REGISTRATION_TEST_LIST.path);
    }
  }, [localStorageRegistrationUuid, history]);

  useEffect(() => {
    if (localStorageRegistrationUuid && !enterpriseRegistrationUuid) {
      dispatch(
        enterpriseAction.setEnterpriseRegistrationUuid(
          localStorageRegistrationUuid
        )
      );
    }
  }, [localStorageRegistrationUuid, enterpriseRegistrationUuid, dispatch]);

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      dispatch(
        enterpriseAction.asyncSetTechRestration(enterpriseRegistrationUuid)
      );
    }
  }, [dispatch, enterpriseRegistrationUuid, localStorageRegistrationUuid]);

  // 退出时清除localStorage
  useEffect(() => {
    return () => {
      enterpriseAction.setEnterpriseRegistrationUuid('');
    };
  }, []);

  return (
    <div className='item-box registration-test-profile-box'>
      <p className='title-box'>
        <span>项目测试流程</span>
      </p>
      <div>
        <Timeline
          mode='left'
          className='registration-test-profile-timeline-box'
        >
          <Timeline.Item color='grey'>
            <PrepareTest />
          </Timeline.Item>
          {/* <Timeline.Item color='grey'>
            <Test />
          </Timeline.Item> */}
          <Timeline.Item color='grey'>
            <GenerateReport />
          </Timeline.Item>
          <Timeline.Item color='grey'>
            <div className='timeline-item-box'>
              <Icon className='item-icon-box' type='audit' />
              <div className='item-text-box'>
                <div className='text-top-box'>技术负责人盖章</div>
                <p className='text-subtitle'>技术负责人盖章</p>
              </div>
            </div>
          </Timeline.Item>
          <Timeline.Item color='grey'>
            <div className='timeline-item-box'>
              <Icon className='item-icon-box' type='file-text' />
              <div className='item-text-box'>
                <div className='text-top-box'>批准人审查</div>
                <p className='text-subtitle'>批准人审查</p>
              </div>
            </div>
          </Timeline.Item>
          <Timeline.Item color='grey'>
            <div className='timeline-item-box'>
              <Icon className='item-icon-box' type='audit' />
              <div className='item-text-box'>
                <div className='text-top-box'>项目管理员盖章</div>
                <p className='text-subtitle'>项目管理员盖章</p>
              </div>
            </div>
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
};
