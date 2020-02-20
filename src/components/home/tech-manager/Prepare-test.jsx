import React from 'react';

// 样式
import { Icon, Timeline } from 'antd';
import '@/style/home/tech-manager/prepare-test.styl';

// 路由
import {
  HOME_REGISTRATION_TEST_DETAIL_APPLY,
  HOME_REGISTRATION_TEST_DETAIL_SPECIMEN
} from '@/constants/route-constants';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <div className='prepare-test-box'>
      <div className='timeline-item-box'>
        <Icon
          className='item-icon-box'
          type='snippets'
          theme='twoTone'
          twoToneColor='#334454'
        />
        <div className='item-text-box'>
          <div className='text-top-box'>管理员审核确认</div>
          <p className='text-subtitle'>
            管理员审核并确认软件评测样品登记表和现场测试表
          </p>
          <div className='inner-timeline-box'>
            <div className='left-timeline-box'>
              <div className='timeline-top-box'>软件评测样品登记表</div>
              <Timeline mode='left' className='timeline-box'>
                <Timeline.Item color='grey'>
                  <Link to={HOME_REGISTRATION_TEST_DETAIL_SPECIMEN.path}>
                    技术人员确认
                  </Link>
                </Timeline.Item>
                <Timeline.Item color='grey'>项目管理员确认</Timeline.Item>
                <Timeline.Item color='grey'>完成</Timeline.Item>
              </Timeline>
            </div>
            <div className='right-timeline-box'>
              <div className='timeline-top-box'>软件评测现场测试申请表</div>
              <Timeline mode='left' className='timeline-box'>
                <Timeline.Item color='grey'>
                  <Link to={HOME_REGISTRATION_TEST_DETAIL_APPLY.path}>
                    技术人员确认
                  </Link>
                </Timeline.Item>
                <Timeline.Item color='grey'>技术负责人确认</Timeline.Item>
                <Timeline.Item color='grey'>批准人确认</Timeline.Item>
                <Timeline.Item color='grey'>完成</Timeline.Item>
              </Timeline>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
