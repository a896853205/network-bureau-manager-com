import React from 'react';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

//样式
import { Descriptions, Icon, Button, Input } from 'antd';
import '@/style/home/project-manager/contract.styl';
const { TextArea } = Input;

export default props => {
  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>评测合同</p>
      </div>
      <div className='detail-contract-box'>
        <Descriptions bordered className='contract-description-box'>
          <Descriptions.Item label='数量'>888</Descriptions.Item>
          <Descriptions.Item label='传真'>87654321</Descriptions.Item>
          <Descriptions.Item label='邮政编码'>100000</Descriptions.Item>
          <Descriptions.Item label='主要功能' span={3}>
            航空物探数据共享服务软件是基于服务器端进行开发的，用户只需在浏览器端进行相关操作，便能实现航空物探勘查工作程度的浏览、勘查项目概况信息的查询与统计、描述勘查项目数据内容及质量信息的元数据查看、图形与属性数据的输出等，此外提供了图形的距离和面积量测工具。
          </Descriptions.Item>
          <Descriptions.Item label='技术指标' span={3}>
            航空物探数据共享服务软件是基于服务器端进行开发的，用户只需在浏览器端进行相关操作，便能实现航空物探勘查工作程度的浏览、勘查项目概况信息的查询与统计、描述勘查项目数据内容及质量信息的元数据查看、图形与属性数据的输出等，此外提供了图形的距离和面积量测工具。
          </Descriptions.Item>
        </Descriptions>
        <div className='contract-button-box'>
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
          className='contract-textArea-box'
        />
      </div>
    </>
  );
};
