import React from 'react';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

//样式
import { Icon, Button, Input } from 'antd';
import '@/style/home/project-manager/product.styl';
const { TextArea } = Input;

export default props => {
  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>产品介质</p>
      </div>
      <div className='detail-product-box'>
        <div className='product-upload-button-box'>
          <Button type='primary' icon='download'>
            下载文件
          </Button>
        </div>
        <div className='product-button-box'>
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
          className='product-textArea-box'
        />
      </div>
    </>
  );
};
