import React from 'react';

// 样式
import { Timeline, Icon } from 'antd';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <div className='item-box profile-left-box'>
      <p className='title-box'>
        <span>项目审核</span>
      </p>
      <Timeline mode='alternate'>
        <Timeline.Item>
          <div className='left-item-box'>
            <Icon className='item-icon-box' type='upload' />
            <div className='item-text-box'>
              <div className='text-top-box'>提交上传8种材料</div>
              <div className='text-row-box'>
                <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
                  <li>登记测试基本信息</li>
                </Link>
                <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
                  <li>评测合同</li>
                </Link>
              </div>
              <div className='text-row-box'>
                <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
                  <li>软件著作权证书</li>
                </Link>
                <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
                  <li>样品登记表</li>
                </Link>
              </div>
              <div className='text-row-box'>
                <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
                  <li>产品说明</li>
                </Link>
                <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
                  <li>用户文档集</li>
                </Link>
              </div>
              <div className='text-row-box'>
                <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
                  <li>产品介质</li>
                </Link>
                <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
                  <li>现场测试申请表</li>
                </Link>
              </div>
            </div>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <div className='left-item-box'>
            <Icon className='item-icon-box' type='profile' />
            <div className='item-text-box'>
              <div className='text-top-box'>电子签合同</div>
              <div className='item-detail-box'>
                <p>甲乙双方电子签合同</p>
              </div>
            </div>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <div className='left-item-box'>
            <Icon className='item-icon-box' type='pay-circle' />
            <div className='item-text-box'>
              <div className='text-top-box'>交付汇款</div>
              <div className='item-detail-box'>
                <p>项目测试委托方交付汇款</p>
              </div>
            </div>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <div className='left-item-box'>
            <Icon className='item-icon-box' type='bug' />
            <div className='item-text-box'>
              <div className='text-top-box'>现场测试</div>
              <div className='item-detail-box'>
                <p>对委托方提供的软件进行测试</p>
              </div>
            </div>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <div className='left-item-box'>
            <Icon className='item-icon-box' type='file-text' />
            <div className='item-text-box'>
              <div className='text-top-box'>发送原始记录和测试报告</div>
              <div className='item-detail-box'>
                <p>发送原始记录和测试报告</p>
              </div>
            </div>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <div className='left-item-box'>
            <Icon className='item-icon-box' type='check-circle' />
            <div className='item-text-box'>
              <div className='text-top-box'>结束</div>
              <div className='item-detail-box'>
                <p>项目管理员结束审核</p>
              </div>
            </div>
          </div>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};
