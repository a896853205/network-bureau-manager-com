import React from 'react';

// 路由
import { HOME_REGISTRATION_TEST_PROFILE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// 样式
import { Icon } from 'antd';
import '@/style/home/tech-manager/generate-report.styl';

export default props => {
  return (
    <div className='generate-report-box'>
      <div className='timeline-item-box'>
        <Icon
          className='item-icon-box'
          type='file-text'
          theme='twoTone'
          twoToneColor='#334454'
        />
        <div className='item-text-box'>
          <div className='text-top-box'>生成报告和原始记录</div>
          <p className='text-subtitle'>技术人员生成报告和原始记录</p>
          <div className='link-box'>
            <div className='link-left-box'>
              <Link to={HOME_REGISTRATION_TEST_PROFILE.path}>
                <span>技术人员生成报告</span>
              </Link>
            </div>
            <div className='link-right-box'>
              <Link to={HOME_REGISTRATION_TEST_PROFILE.path}>
                <span>技术人员生成原始记录</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
