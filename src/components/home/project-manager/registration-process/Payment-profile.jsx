import React, { useEffect, useState } from 'react';

// 样式
import { Icon, Tag, Skeleton } from 'antd';

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
            </div>
          </div>
        ) : null}
      </Skeleton>
    </div>
  );
};
