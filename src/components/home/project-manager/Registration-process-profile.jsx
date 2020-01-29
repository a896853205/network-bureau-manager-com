import React, { useEffect, useState } from 'react';

// 样式
import { Timeline, Icon, Skeleton } from 'antd';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// 请求
import { QUERY_SYS_REGISTRATION_STEP } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// redux
import { useSelector } from 'react-redux';

export default props => {
  const { steps } = useSelector(state => state.enterpriseStore),
    [sysRegistrationStepList, setSysRegistrationStepList] = useState([]),
    [loading, setLoading] = useState(true),
    [uploadStepColor, setUploadStepColor] = useState(''),
    [elecContractStepColor, setElecContractStepColor] = useState(''),
    [payStepColor, setPayStepColor] = useState(''),
    [fieldTestStepColor, setFieldTestStepColor] = useState(''),
    [testReportStepColor, setTestReportStepColor] = useState('');

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

  useEffect(() => {
    if (steps[0]) {
      //设置时间轴节点颜色
      const handleColor = i => {
        let color = '';
        switch (steps[i].status) {
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
      setUploadStepColor(handleColor(0));
      setElecContractStepColor(handleColor(1));
      setPayStepColor(handleColor(2));
      setFieldTestStepColor(handleColor(3));
      setTestReportStepColor(handleColor(4));
    }
  }, [steps]);

  return (
    <div className='item-box profile-left-box'>
      <p className='title-box'>
        <span>项目审核</span>
      </p>
      <Skeleton loading={loading}>
        {sysRegistrationStepList.length ? (
          <Timeline mode='alternate'>
            <Timeline.Item color={uploadStepColor ? uploadStepColor : 'grey'}>
              <div className='left-item-box'>
                <Icon
                  className='item-icon-box'
                  type='file-zip'
                  theme='twoTone'
                  twoToneColor='#334454'
                />
                <div className='item-text-box'>
                  <div className='text-top-box'>
                    {sysRegistrationStepList[0].name}
                  </div>
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
            <Timeline.Item color={elecContractStepColor ? elecContractStepColor : 'grey'}>
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
                  </div>
                  <div className='item-detail-box'>
                    <p>甲乙双方电子签合同</p>
                  </div>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item color={payStepColor ? payStepColor : 'grey'}>
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
                  </div>
                  <div className='item-detail-box'>
                    <p>项目测试委托方交付汇款</p>
                  </div>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item color={fieldTestStepColor ? fieldTestStepColor : 'grey'}>
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
                  </div>
                  <div className='item-detail-box'>
                    <p>对委托方提供的软件进行测试</p>
                  </div>
                </div>
              </div>
            </Timeline.Item>
            <Timeline.Item color={testReportStepColor ? testReportStepColor : 'grey'}>
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
