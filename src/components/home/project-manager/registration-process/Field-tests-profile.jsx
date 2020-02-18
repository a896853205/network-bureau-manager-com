import React from 'react';

// 样式
import { Timeline, Icon, Tag, Button } from 'antd';

// 路由
import { HOME_REGISTRATION_DETAIL } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

export default () => {
  const { steps, sysRegistrationStep } = useSelector(
    state => state.enterpriseStore
  );

  const fieldTestsStatusToColor = (step, status = 0) => {
    if (status === step) {
      return 'blue';
    } else if (status > step) {
      return 'green';
    } else {
      return 'grey';
    }
  };

  return (
    <div className='left-item-box'>
      <Icon
        className='item-icon-box'
        type='bug'
        theme='twoTone'
        twoToneColor='#334454'
      />
      <div className='item-text-box'>
        <div className='text-top-box'>
          {sysRegistrationStep[3].name}
          <Tag className='title-tag' color={steps[3].color}>
            {steps[3].statusText}
          </Tag>
        </div>
        <div className='item-detail-box'>
          <p className='text-subtitle'>对委托方提供的软件进行测试</p>
          <Timeline mode='left'>
            <Timeline.Item color={fieldTestsStatusToColor(1, steps[3].status)}>
              {steps[3].status ? (
                <Link
                  to={`${HOME_REGISTRATION_DETAIL.path}/technicalManagerShow`}
                >
                  <span>选择技术负责人</span>
                </Link>
              ) : (
                <span>选择技术负责人</span>
              )}
            </Timeline.Item>
            <Timeline.Item color={fieldTestsStatusToColor(2, steps[3].status)}>
              技术负责人选择技术人员
            </Timeline.Item>
            <Timeline.Item color={fieldTestsStatusToColor(3, steps[3].status)}>
              <span>确认软件评测样品登记表</span>
              <span>确认软件评测现场测试申请表</span>
            </Timeline.Item>
            <Timeline.Item color={fieldTestsStatusToColor(4, steps[3].status)}>
              技术人员进行现场测试
            </Timeline.Item>
            <Timeline.Item color={fieldTestsStatusToColor(5, steps[3].status)}>
              <span>技术人员生成报告</span>
              <span>技术人员生成原始记录</span>
            </Timeline.Item>
            <Timeline.Item color={fieldTestsStatusToColor(6, steps[3].status)}>
              <span>技术负责人审查报告</span>
              <span>技术负责人审查原始记录</span>
            </Timeline.Item>
            <Timeline.Item color={fieldTestsStatusToColor(7, steps[3].status)}>
              <span>批准人审查报告</span>
              <span>批准人审查原始记录</span>
            </Timeline.Item>
            <Timeline.Item color={fieldTestsStatusToColor(8, steps[3].status)}>
              {steps[3].status ? (
                <span>
                  <Link to={`${HOME_REGISTRATION_DETAIL.path}/stamp`}>
                    <span>项目管理人报告盖章</span>
                  </Link>
                  <Link to={`${HOME_REGISTRATION_DETAIL.path}/stamp`}>
                    <span>项目管理人原始记录盖章</span>
                  </Link>
                </span>
              ) : (
                <span>
                  <span>项目管理人报告盖章</span>
                  <span>项目管理人原始记录盖章</span>
                </span>
              )}
            </Timeline.Item>
          </Timeline>
        </div>
        <Button size='large'>现场测试完成开始接受原始记录和测试报告</Button>
      </div>
    </div>
  );
};
