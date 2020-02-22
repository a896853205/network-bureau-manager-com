import React from 'react';

// 子组件
import PrepareTest from '@/components/home/certifier-manager/Prepare-test.jsx';

// redux
import { useSelector } from 'react-redux';

// 样式
import { Timeline, Icon } from 'antd';
import '@/style/home/item.styl';
import '@/style/home/certifier-manager/registration-certify-profile.styl';

export default props => {
  const { steps } = useSelector(state => state.enterpriseStore);

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
    <div className='item-box registration-certify-profile-box'>
      <p className='title-box'>
        <span>项目测试流程</span>
      </p>
      <div>
        {steps.length ? (
          <Timeline
            mode='left'
            className='registration-certify-profile-timeline-box'
          >
            <Timeline.Item color={fieldTestStatusToColor(3, steps[3]?.status)}>
              <PrepareTest />
            </Timeline.Item>
            <Timeline.Item color={fieldTestStatusToColor(4, steps[3]?.status)}>
              <div className='timeline-item-box'>
                <Icon className='item-icon-box' type='audit' />
                <div className='item-text-box'>
                  <div className='text-top-box'>生成报告和原始记录</div>
                  <p className='text-subtitle'>技术人员生成报告和原始记录</p>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item color={fieldTestStatusToColor(5, steps[3]?.status)}>
              <div className='timeline-item-box'>
                <Icon className='item-icon-box' type='audit' />
                <div className='item-text-box'>
                  <div className='text-top-box'>技术负责人盖章</div>
                  <p className='text-subtitle'>技术负责人盖章</p>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item color={fieldTestStatusToColor(6, steps[3]?.status)}>
              <div className='timeline-item-box'>
                <Icon className='item-icon-box' type='file-text' />
                <div className='item-text-box'>
                  <div className='text-top-box'>批准人审查</div>
                  <p className='text-subtitle'>批准人审查</p>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item color={fieldTestStatusToColor(7, steps[3]?.status)}>
              <div className='timeline-item-box'>
                <Icon className='item-icon-box' type='audit' />
                <div className='item-text-box'>
                  <div className='text-top-box'>项目管理员盖章</div>
                  <p className='text-subtitle'>项目管理员盖章</p>
                </div>
              </div>
            </Timeline.Item>
          </Timeline>
        ) : null}
      </div>
    </div>
  );
};
