import React from 'react';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

//样式
import { Descriptions, Icon, Button, Input } from 'antd';
import '@/style/home/project-manager/apply.styl';
const { TextArea } = Input;

export default props => {
  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>现场测试申请表</p>
      </div>
      <div className='detail-apply-box'>
        <Descriptions bordered className='apply-description-box'>
          <Descriptions.Item label='内容' span={3}>
            服务器硬件环境（CPU、硬盘、内存）
            服务器软件环境（运行系统、数据库及通讯协议等
            客户端硬件环境（CPU、硬盘、内存）
            客户端软件环境（运行系统、数据库及通讯协议等）
            上位机硬件环境（CPU、硬盘、内存）
            下位机核心电路（核心芯片）、外围电路（相应的支持电路）
            备注（连接的设备机械和电气及其他设备） 具体原因
          </Descriptions.Item>
        </Descriptions>
        <div className='apply-button-box'>
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
    </>
  );
};
