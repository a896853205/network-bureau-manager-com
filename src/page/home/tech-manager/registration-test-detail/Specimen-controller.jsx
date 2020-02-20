import React from 'react';

// 路由
import { HOME_REGISTRATION_TEST_PROFILE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// 样式
import { Descriptions, Icon, Button, Input /*, Skeleton*/ } from 'antd';
import '@/style/home/tech-manager/specimen.styl';
const { TextArea } = Input;

export default props => {
  return (
    <div className='item-box'>
      <p className='title-box'>
        <span>技术人员确认</span>
      </p>
      <div className='subtitle-box'>
        <Link to={`${HOME_REGISTRATION_TEST_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>样品登记表</p>
      </div>
      {/*<Skeleton>*/}
      <div className='test-specimen-box'>
        <Descriptions bordered className='specimen-description-box'>
          <Descriptions.Item label='注册商标' span={3}>
            {}
          </Descriptions.Item>
          <Descriptions.Item label='开发工具' span={3}>
            {}
          </Descriptions.Item>
          <Descriptions.Item label='产品密级'>{}</Descriptions.Item>
          <Descriptions.Item label='单位属性' span={2}>
            {}
          </Descriptions.Item>
          <Descriptions.Item label='邮箱' span={3}>
            {}
          </Descriptions.Item>
        </Descriptions>
        <div className='specimen-button-box'>
          <Button type='danger' htmlType='submit' className='fail-button'>
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
          className='apply-textArea-box'
        />
      </div>
      {/*</Skeleton>*/}
    </div>
  );
};
