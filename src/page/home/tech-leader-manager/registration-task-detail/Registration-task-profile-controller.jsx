import React from 'react';

// 子组件
import PrepareTest from '@/components/home/tech-leader-manager/Prepare-test.jsx';
import GenerateReport from '@/components/home/tech-leader-manager/Generate-report.jsx';

// redux
import { useSelector } from 'react-redux';

// 路由
import { HOME_REGISTRATION_TASK_ASSIGN_TECH } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// 样式
import { Timeline, Icon } from 'antd';
import '@/style/home/item.styl';
import '@/style/home/tech-leader-manager/registration-task-profile.styl';

export default props => {
  const { steps } = useSelector(state => state.enterpriseStore);

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
    <div className='item-box registration-task-profile-box'>
      <p className='title-box'>
        <span>项目测试流程</span>
      </p>
      <Timeline mode='left' className='registration-task-profile-timeline-box'>
        <Timeline.Item color={fieldTestStatusToColor(1, steps[3]?.status)}>
          <div className='timeline-item-box'>
            <Icon
              className='item-icon-box'
              type='file-text'
              theme='twoTone'
              twoToneColor='#334454'
            />
            <div className='item-text-box'>
              <div className='text-center-top-box'>分配技术管理人员</div>
              <p className='text-subtitle'>技术负责人分配技术管理人员</p>
              <Link to={HOME_REGISTRATION_TASK_ASSIGN_TECH.path}>
                <span>分配技术管理人员</span>
              </Link>
            </div>
          </div>
        </Timeline.Item>
        <Timeline.Item color={fieldTestStatusToColor(3, steps[3]?.status)}>
          <PrepareTest />
        </Timeline.Item>
        <Timeline.Item color={fieldTestStatusToColor(4, steps[3]?.status)}>
          <GenerateReport/>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};
