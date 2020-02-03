import React from 'react';

// 路由
import { Link } from 'react-router-dom';
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';

// 样式
import '@/style/home/project-manager/contract-examine.styl';
import { Button, Input, Icon } from 'antd';
const { TextArea } = Input;

export default props => {
  return (
    <>
      <div className='subtitle-box'>
        <Link to={HOME_REGISTRATION_PROFILE.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>审查,进入下一步</p>
      </div>
      <div className='detail-manager-download-box'>
        <div className='manager-download-upload-button-box'>
          <Button type='primary' icon='download'>
            下载文件
          </Button>
        </div>
        <div className='manager-download-button-box'>
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
          className='manager-download-textArea-box'
        />
      </div>
    </>
  );
};
