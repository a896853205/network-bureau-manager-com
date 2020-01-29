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
            <Icon className='item-icon-box' type='file-zip' theme='twoTone' twoToneColor='#334454' />
            <div className='item-text-box'>
              <div className='text-top-box'>提交上传8种材料</div>
              <p className='text-sub-title'>
                检查8种材料信息,是否完整,是否符合要求
              </p>
              <div className='text-content-box'>
                <Link
                  className='text-content-link'
                  to={`${HOME_REGISTRATION_PROFILE.path}`}
                >
                  <span>登记测试基本信息</span>
                </Link>
                <Link
                  className='text-content-link'
                  to={`${HOME_REGISTRATION_PROFILE.path}`}
                >
                  <span>评测合同</span>
                </Link>
                <Link
                  className='text-content-link'
                  to={`${HOME_REGISTRATION_PROFILE.path}`}
                >
                  <span>软件著作权证书</span>
                </Link>
                <Link
                  className='text-content-link'
                  to={`${HOME_REGISTRATION_PROFILE.path}`}
                >
                  <span>样品登记表</span>
                </Link>
                <Link
                  className='text-content-link'
                  to={`${HOME_REGISTRATION_PROFILE.path}`}
                >
                  <span>产品说明</span>
                </Link>
                <Link
                  className='text-content-link'
                  to={`${HOME_REGISTRATION_PROFILE.path}`}
                >
                  <span>用户文档集</span>
                </Link>
                <Link
                  className='text-content-link'
                  to={`${HOME_REGISTRATION_PROFILE.path}`}
                >
                  <span>产品介质</span>
                </Link>
                <Link
                  className='text-content-link'
                  to={`${HOME_REGISTRATION_PROFILE.path}`}
                >
                  <span>现场测试申请表</span>
                </Link>
              </div>
            </div>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <div className='left-item-box'>
            <Icon className='item-icon-box' type='profile' theme='twoTone' twoToneColor='#334454' />
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
            <Icon
              className='item-icon-box'
              type='credit-card'
              theme='twoTone'
              twoToneColor='#334454'
            />
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
            <Icon className='item-icon-box' type='bug' theme='twoTone' twoToneColor='#334454' />
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
            <Icon className='item-icon-box' type='file-text' theme='twoTone' twoToneColor='#334454' />
            <div className='item-text-box'>
              <div className='text-top-box'>发送原始记录和测试报告</div>
              <div className='item-detail-box'>
                <p>发送原始记录和测试报告</p>
              </div>
            </div>
          </div>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};
