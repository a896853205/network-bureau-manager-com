import React from 'react';

// 子组件
import PrepareTest from '@/components/home/tech-manager/Prepare-test.jsx';
import Test from '@/components/home/tech-manager/Test.jsx';
import GenerateReport from '@/components/home/tech-manager/Generate-report.jsx';

// 样式
import { Timeline } from 'antd';
import '@/style/home/item.styl';

export default props => {
  return (
    <div className='item-box'>
      <p className='title-box'>
        <span>项目测试流程</span>
      </p>
      <div>
        <Timeline mode='left'>
          <Timeline.Item color>
            <PrepareTest />
          </Timeline.Item>
          <Timeline.Item color>
            <Test />
          </Timeline.Item>
          <Timeline.Item color>
            <GenerateReport />
          </Timeline.Item>
          <Timeline.Item color>技术负责人审查</Timeline.Item>
          <Timeline.Item color>批准人审查</Timeline.Item>
          <Timeline.Item color>项目管理员盖章</Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
};
