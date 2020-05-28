import React from 'react';

// 子组件
import PrepareTest from '@/components/home/certifier-manager/Prepare-test.jsx';

// redux
import { useSelector } from 'react-redux';

// 样式
import { Timeline, Icon } from 'antd';
import '@/style/home/item.styl';
import '@/style/home/certifier-manager/delegation-certify-profile.styl';
import GenerateReport from '@/components/home/certifier-manager/Delegation-generate-report.jsx';

export default props => {
  const { delegationsSteps } = useSelector(state => state.enterpriseStore);

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
    <div className='item-box delegation-certify-profile-box'>
      <p className='title-box'>
        <span>项目测试流程</span>
      </p>
      <div>
        {delegationsSteps.length ? (
          <Timeline
            mode='left'
            className='delegation-certify-profile-timeline-box'
          >
            <Timeline.Item color='green' dot={<Icon type='play-circle' />}>
              开始
            </Timeline.Item>
            <Timeline.Item color={fieldTestStatusToColor(3, delegationsSteps[3]?.status)}>
              <PrepareTest />
            </Timeline.Item>
            <Timeline.Item color={fieldTestStatusToColor(4, delegationsSteps[3]?.status)}>
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
