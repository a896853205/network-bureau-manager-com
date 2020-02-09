import React, { useEffect, useState } from 'react';

// 样式
import { Icon, Tag, Skeleton, Timeline, Button } from 'antd';

//路由
import { Link } from 'react-router-dom';
import { HOME_REGISTRATION_DETAIL } from '@/constants/route-constants';

// redux
import { useSelector } from 'react-redux';

// 请求
import { QUERY_SYS_REGISTRATION_STEP } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

export default props => {
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
    <div className='left-item-box'>
      <Icon
        className='item-icon-box'
        type='credit-card'
        theme='twoTone'
        twoToneColor='#334454'
      />
      <Skeleton loading={loading}>
        {sysRegistrationStepList.length ? (
          <div className='item-text-box'>
            <div className='text-top-box'>
              {sysRegistrationStepList[2].name}
              <Tag className='title-tag' color={statusToColor(steps[2].status)}>
                {steps[2].statusText}
              </Tag>
            </div>
            <div className='item-detail-box'>
              <p className='text-subtitle'>项目测试委托方交付汇款</p>
              <Timeline>
                <Timeline.Item>
                  <Link
                    to={`${HOME_REGISTRATION_DETAIL.path}/financeChief`}
                  >
                    <span>选择负责的财务人员</span>
                  </Link>
                </Timeline.Item>
                <Timeline.Item>
                  <span>等待企业付款</span>
                </Timeline.Item>
                <Timeline.Item>
                  <span>财务人员审核</span>
                </Timeline.Item>
              </Timeline>
            </div>
            <Button size='large'>交付汇款完成开始现场测试</Button>
          </div>
        ) : null}
      </Skeleton>
    </div>
  );
};
