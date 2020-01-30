import React from 'react';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

//样式
import { Descriptions, Icon, Button, Input } from 'antd';
import '@/style/home/project-manager/basic.styl';
const { TextArea } = Input;

export default props => {
  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>登记测试基本信息</p>
      </div>
      <div className='detail-basic-box'>
        <Descriptions bordered className='basic-description-box'>
          <Descriptions.Item label='版本'>1.2.3</Descriptions.Item>
          <Descriptions.Item label='联系人' span={2}>
            张博荣
          </Descriptions.Item>
          <Descriptions.Item label='委托单位(人)'>哈理工1819</Descriptions.Item>
          <Descriptions.Item label='电话(手机)' span={2}>
            18351923820
          </Descriptions.Item>
          <Descriptions.Item label='注册地址' span={3}>
            哈尔滨理工大学西区
          </Descriptions.Item>
          <Descriptions.Item label='开发研发日期' span={3}>
            2020-01-30
          </Descriptions.Item>
          <Descriptions.Item label='开发单位全称' span={3}>
            哈尔滨理工大学
          </Descriptions.Item>
        </Descriptions>
        <div className='basic-button-box'>
          <Button type='primary' htmlType='submit' className='fail-button'>
            审核不通过
          </Button>
          <Button type='primary' htmlType='submit' className='success-button'>
            审核通过
          </Button>
        </div>
        <TextArea
          autoSize={{ minRows: 3, maxRows: 6 }}
          maxLength='800'
          placeholder='请输入审核不通过理由'
          className='basic-textArea-box'
        />
      </div>
    </>
  );
};
