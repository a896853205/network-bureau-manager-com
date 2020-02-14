import React, { useEffect } from 'react';

// 组件
import SubmitFileProfile from '@/components/home/project-manager/registration-process/Submit-file-profile.jsx';
import ElectronicContractProfile from '@/components/home/project-manager/registration-process/Electronic-contract-profile.jsx';
import PaymentProfile from '@/components/home/project-manager/registration-process/Payment-profile.jsx';
import FieldTestsProfile from '@/components/home/project-manager/registration-process/Field-tests-profile.jsx';

// 样式
import { Timeline, Icon, Skeleton, Tag } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

export default () => {
  const {
      steps,
      sysRegistrationStepLoading: loading,
      sysRegistrationStep
    } = useSelector(state => state.enterpriseStore),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(enterpriseAction.asyncSetSysRegistrationStep());
  }, [dispatch]);

  return (
    <div className='item-box profile-left-box'>
      <p className='title-box'>
        <span>项目审核</span>
      </p>
      <Skeleton loading={loading}>
        {sysRegistrationStep.length && steps.length ? (
          <Timeline mode='left'>
            <Timeline.Item color={steps[0].color}>
              <SubmitFileProfile />
            </Timeline.Item>
            <Timeline.Item color={steps[1].color}>
              <ElectronicContractProfile />
            </Timeline.Item>
            <Timeline.Item color={steps[2].color}>
              <PaymentProfile />
            </Timeline.Item>
            <Timeline.Item color={steps[3].color}>
              <FieldTestsProfile />
            </Timeline.Item>
            <Timeline.Item color={steps[4].color}>
              <div className='left-item-box'>
                <Icon
                  className='item-icon-box'
                  type='file-text'
                  theme='twoTone'
                  twoToneColor='#334454'
                />
                <div className='item-text-box'>
                  <div className='text-top-box'>
                    {sysRegistrationStep[4].name}
                    <Tag className='title-tag' color={steps[4].color}>
                      {steps[4].statusText}
                    </Tag>
                  </div>
                  <div className='item-detail-box'>
                    <p className='text-subtitle'>发送原始记录和测试报告</p>
                  </div>
                </div>
              </div>
            </Timeline.Item>
          </Timeline>
        ) : null}
      </Skeleton>
    </div>
  );
};
