import React, { useEffect, useState } from 'react';

// 组件
import SubmitFileProfile from '@/components/home/project-manager/registration-process/Submit-file-profile.jsx';

// 样式
import { Timeline, Icon, Skeleton, Tag } from 'antd';

// 请求
import { QUERY_SYS_REGISTRATION_STEP } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// redux
import { useSelector } from 'react-redux';

export default () => {
  const { steps } = useSelector(state => state.enterpriseStore),
    [sysRegistrationStepList, setSysRegistrationStepList] = useState([]),
    [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const sysRegistrationStepList = await proxyFetch(
        QUERY_SYS_REGISTRATION_STEP,
        {},
        'GET'
      );

      setSysRegistrationStepList(sysRegistrationStepList);
      setLoading(false);
    })();
  }, []);

  const statusToColor = status => {
    let color = '';

    switch (status) {
      case 1:
        color = 'grey';
        break;
      case 2:
        color = 'blue';
        break;
      case 3:
        color = 'green';
        break;
      case 4:
        color = 'red';
        break;
      default:
        color = 'blue';
    }
    return color;
  };

  return (
    <div className='item-box profile-left-box'>
      <p className='title-box'>
        <span>项目审核</span>
      </p>
      <Skeleton loading={loading}>
        {sysRegistrationStepList.length && steps.length ? (
          <Timeline mode='alternate'>
            <Timeline.Item color={statusToColor(steps[0].status)}>
              <SubmitFileProfile />
            </Timeline.Item>
            <Timeline.Item color={statusToColor(steps[1].status)}>
              <div className='left-item-box'>
                <Icon
                  className='item-icon-box'
                  type='profile'
                  theme='twoTone'
                  twoToneColor='#334454'
                />
                <div className='item-text-box'>
                  <div className='text-top-box'>
                    {sysRegistrationStepList[1].name}
                    <Tag
                      className='title-tag'
                      color={statusToColor(steps[1].status)}
                    >
                      {steps[1].statusText}
                    </Tag>
                  </div>
                  <div className='item-detail-box'>
                    <p className='text-sub-title'>甲乙双方电子签合同</p>
                    <div className='text-timeline-box'>
                      <Timeline >
                        <Timeline.Item color='green'>
                          填写评测合同内容
                        </Timeline.Item>
                        <Timeline.Item color='green'>
                          生成合同下载,盖章扫描,上传pdf
                        </Timeline.Item>
                        <Timeline.Item color='red'>
                          等待企业下载pdf,盖章扫描,上传pdf
                        </Timeline.Item>
                        <Timeline.Item color='gray'>
                          审查,进入下一步
                        </Timeline.Item>
                      </Timeline>
                    </div>
                  </div>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item color={statusToColor(steps[2].status)}>
              <div className='left-item-box'>
                <Icon
                  className='item-icon-box'
                  type='credit-card'
                  theme='twoTone'
                  twoToneColor='#334454'
                />
                <div className='item-text-box'>
                  <div className='text-top-box'>
                    {sysRegistrationStepList[2].name}
                    <Tag
                      className='title-tag'
                      color={statusToColor(steps[2].status)}
                    >
                      {steps[2].statusText}
                    </Tag>
                  </div>
                  <div className='item-detail-box'>
                    <p>项目测试委托方交付汇款</p>
                  </div>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item color={statusToColor(steps[3].status)}>
              <div className='left-item-box'>
                <Icon
                  className='item-icon-box'
                  type='bug'
                  theme='twoTone'
                  twoToneColor='#334454'
                />
                <div className='item-text-box'>
                  <div className='text-top-box'>
                    {sysRegistrationStepList[3].name}
                    <Tag
                      className='title-tag'
                      color={statusToColor(steps[3].status)}
                    >
                      {steps[3].statusText}
                    </Tag>
                  </div>
                  <div className='item-detail-box'>
                    <p>对委托方提供的软件进行测试</p>
                  </div>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item color={statusToColor(steps[4].status)}>
              <div className='left-item-box'>
                <Icon
                  className='item-icon-box'
                  type='file-text'
                  theme='twoTone'
                  twoToneColor='#334454'
                />
                <div className='item-text-box'>
                  <div className='text-top-box'>
                    {sysRegistrationStepList[4].name}
                    <Tag
                      className='title-tag'
                      color={statusToColor(steps[4].status)}
                    >
                      {steps[4].statusText}
                    </Tag>
                  </div>
                  <div className='item-detail-box'>
                    <p>发送原始记录和测试报告</p>
                  </div>
                </div>
              </div>
            </Timeline.Item>
          </Timeline>
        ) : null}
      </Skeleton>
    </div>
  );
};
