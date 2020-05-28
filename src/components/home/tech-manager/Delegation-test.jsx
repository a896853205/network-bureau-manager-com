import React from 'react';

// 样式
import { Icon, Button } from 'antd';
import '@/style/home/tech-manager/test.styl';

export default props => {
  return (
    <div className='test-box'>
      <div className='timeline-item-box'>
        <Icon
          className='item-icon-box'
          type='check-circle'
          theme='twoTone'
          twoToneColor='#334454'
        />
        <div className='item-text-box'>
          <div className='text-top-box'>进行现场测试</div>
          <p className='text-subtitle'>技术人员确认完成现场测试</p>
          <div className='button-box'>
            <Button
              type='primary'
              htmlType='submit'
              size='large'
              className='button'
            >
              我已完成现场测试
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
