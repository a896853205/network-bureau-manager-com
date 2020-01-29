import React from 'react';

// 样式
import '@/style/home/project-manager/registration-profile.styl';
import '@/style/home/project-manager/item.styl';
import { Timeline, Icon, Rate } from 'antd';

//路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

export default props => {
  return (
    <>
      <div className='registration-profile-box'>
        <div className='item-box profile-left-box'>
          <p className='title-box'>
            <span>项目审核</span>
          </p>
          <Timeline mode='alternate'>
            <Timeline.Item>
              <div className='left-item-box'>
                <Icon className='item-icon-box' type='caret-right' />
                <div className='item-text-box'>
                  <div className='text-top-box'>开始</div>
                  <div className='item-detail-box'>
                    <p>项目管理员开始审核项目</p>
                  </div>
                </div>
              </div>
            </Timeline.Item>
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
        <div className='item-box profile-right-box'>
          <p className='title-box'>
            <span>企业基本信息</span>
          </p>
          <ul className='manager-info-bottom-box'>
            <li className='manager-info-head-box'>
              <img
                src=''
                alt=''
                style={{
                  width: '100px',
                  height: '100px'
                }}
              />
            </li>
            <li className='manager-into-item-box'>
              <p>
                <Icon type='user' className='manager-info-icon' />
                企业名称
              </p>
              <p>哈尔滨理工大学</p>
            </li>
            <li className='manager-into-item-box'>
              <p>
                <Icon type='phone' className='manager-info-icon' />
                联系电话
              </p>
              <p>18351923820</p>
            </li>
            <li className='manager-into-item-box'>
          <p>
            <Icon type='tag' className='manager-info-icon' />
            办理业务次数
          </p>
          <p>111</p>
        </li> 
            <li className='manager-into-item-box'>
              <p>
                <Icon type='star' className='manager-info-icon' />
                星级
              </p>
              <Rate disabled defaultValue={5} />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
