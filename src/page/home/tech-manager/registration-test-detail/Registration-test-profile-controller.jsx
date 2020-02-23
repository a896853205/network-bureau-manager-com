import React from 'react';

// 子组件
import PrepareTest from '@/components/home/tech-manager/Prepare-test.jsx';
import GenerateReport from '@/components/home/tech-manager/Generate-report.jsx';

// redux
import { useSelector } from 'react-redux';

// 样式
import { Timeline } from 'antd';
import '@/style/home/item.styl';
import '@/style/home/tech-manager/registration-test-profile.styl';

export default props => {
  const { steps } = useSelector(
    state => state.enterpriseStore
  );

  const fieldTestStatusToColor = (step, status = 0) => {
    let color = '';

    if (status === step) {
      color = 'blue';
    } else if (status > step) {
      color = 'green';
    } else {
      color = 'grey';
    }

    return color;
  };

  return (
    <div className='item-box registration-test-profile-box'>
      <p className='title-box'>
        <span>项目测试流程</span>
      </p>
      <div>
        {steps.length ? (
          <Timeline
            mode='left'
            className='registration-test-profile-timeline-box'
          >
            <Timeline.Item color={fieldTestStatusToColor(3, steps[3]?.status)}>
              <PrepareTest />
            </Timeline.Item>
            <Timeline.Item color={fieldTestStatusToColor(4, steps[3]?.status)}>
              <GenerateReport />
            </Timeline.Item>
          </Timeline>
        ) : null}
      </div>
    </div>
  );
};
