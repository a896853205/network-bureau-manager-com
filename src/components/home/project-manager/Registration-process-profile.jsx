import React, { useEffect } from 'react';

// 组件
import SubmitFileProfile from '@/components/home/project-manager/registration-process/Submit-file-profile.jsx';
import ElectronicContractProfile from '@/components/home/project-manager/registration-process/Electronic-contract-profile.jsx';
import PaymentProfile from '@/components/home/project-manager/registration-process/Payment-profile.jsx';
import FieldTestsProfile from '@/components/home/project-manager/registration-process/Field-tests-profile.jsx';

// 样式
import { Timeline, Icon, Skeleton, Tag } from 'antd';
import '@/style/home/item.styl';

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
            <Timeline.Item color='green' dot={<Icon type='play-circle' />}>
              开始
            </Timeline.Item>
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
            <Timeline.Item
              color={steps[4].color}
              dot={<Icon type='check-circle' />}
            >
              结束
            </Timeline.Item>
          </Timeline>
        ) : null}
      </Skeleton>
    </div>
  );
};
