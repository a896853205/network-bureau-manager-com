import React, { useState, useEffect } from 'react';

// 子组件
import PrepareTest from '@/components/home/tech-leader-manager/Delegation-prepare-test.jsx';
import GenerateReport from '@/components/home/tech-leader-manager/Delegation-generate-report.jsx';

// redux
import { useSelector } from 'react-redux';

// 路由
import { HOME_DELEGATION_TASK_ASSIGN_TECH } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// 样式
import { Timeline, Icon } from 'antd';
import '@/style/home/item.styl';
import '@/style/home/tech-leader-manager/delegation-task-profile.styl';

export default props => {
  const { delegationSteps, delegation } = useSelector(state => state.enterpriseStore),
    [isCurrentStep, setIsCurrentStep] = useState(false);

  useEffect(() => {
    if (delegation?.currentStep === 4) {
      setIsCurrentStep(true);
    }
  }, [delegation]);

  const fieldTestStatusToColor = (step, status = 0) => {
    let color = '';

    if (status === step) {
      color = 'blue';
    } else if (status > step) {
      color = 'green';
    } else {
      color = 'gray';
    }

    return color;
  };

  return (
    <div className='item-box delegation-task-profile-box'>
      <p className='title-box'>
        <span>项目测试流程</span>
      </p>
      <Timeline mode='left' className='delegation-task-profile-timeline-box'>
        <Timeline.Item color='green' dot={<Icon type='play-circle' />}>
          开始
        </Timeline.Item>
        <Timeline.Item color={fieldTestStatusToColor(2, delegationSteps[3]?.status)}>
          <div className='timeline-item-box'>
            <Icon
              className='item-icon-box'
              type='file-text'
              theme='twoTone'
              twoToneColor='#334454'
            />
            <div className='item-text-box'>
              <div className='text-center-top-box'>分配技术人员</div>
              <p className='text-subtitle'>技术负责人分配技术人员</p>
              <Link
                to={HOME_DELEGATION_TASK_ASSIGN_TECH.path}
                className={isCurrentStep ? '' : 'old-link'}
              >
                <span>分配技术人员</span>
              </Link>
            </div>
          </div>
        </Timeline.Item>
        <Timeline.Item color={fieldTestStatusToColor(3, delegationSteps[3]?.status)}>
          <PrepareTest />
        </Timeline.Item>
        <Timeline.Item color={fieldTestStatusToColor(4, delegationSteps[3]?.status)}>
          <GenerateReport />
        </Timeline.Item>
        <Timeline.Item color='green' dot={<Icon type='check-circle' />}>
          结束
        </Timeline.Item>
      </Timeline>
    </div>
  );
};
