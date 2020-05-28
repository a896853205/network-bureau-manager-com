import React from 'react';

// 子组件
import PrepareTest from '@/components/home/tech-manager/Delegation-prepare-test.jsx';
import GenerateReport from '@/components/home/tech-manager/Delegation-generate-report.jsx';

// redux
import { useSelector } from 'react-redux';

// 样式
import { Timeline, Icon } from 'antd';
import '@/style/home/item.styl';
import '@/style/home/tech-manager/delegation-test-profile.styl';

export default props => {
  const { delegationSteps } = useSelector(state => state.enterpriseStore);

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
    <div className='item-box delegation-test-profile-box'>
      <p className='title-box'>
        <span>项目测试流程</span>
      </p>
      <div>
        {delegationSteps.length ? (
          <Timeline
            mode='left'
            className='delegation-test-profile-timeline-box'
          >
            <Timeline.Item color='green' dot={<Icon type='play-circle' />}>
              开始
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
        ) : null}
      </div>
    </div>
  );
};
