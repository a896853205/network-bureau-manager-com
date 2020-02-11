import React, { useState } from 'react';

// 样式
import { Icon, Tag, Timeline, Button } from 'antd';

//路由
import { Link } from 'react-router-dom';
import { HOME_REGISTRATION_DETAIL } from '@/constants/route-constants';

// 请求
import { PUSH_REGISTRATION_PROCESS } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// redux
import { useSelector } from 'react-redux';

export default props => {
  const {
      steps,
      sysRegistrationStep,
      enterpriseRegistrationUuid
    } = useSelector(state => state.enterpriseStore),
    [pushProcessLoading, setPushProcessLoading] = useState(false);

  const contractManagerStatusToColor = (step, status = 0) => {
    let color = '';

    if (status === step) {
      color = 'blue';
    } else if (status > step) {
      color = 'green';
    } else {
      color = 'grey';
    }

    return color;
  };

  const handlePushProcess = () => {
    (async () => {
      setPushProcessLoading(true);
      await proxyFetch(PUSH_REGISTRATION_PROCESS, {
        registrationUuid: enterpriseRegistrationUuid
      });

      setPushProcessLoading(false);
    })();
  };

  return (
    <div className='left-item-box'>
      <Icon
        className='item-icon-box'
        type='credit-card'
        theme='twoTone'
        twoToneColor='#334454'
      />
      {sysRegistrationStep.length ? (
        <div className='item-text-box'>
          <div className='text-top-box'>
            {sysRegistrationStep[2].name}
            <Tag className='title-tag' color={steps[2].color}>
              {steps[2].statusText}
            </Tag>
          </div>
          <div className='item-detail-box'>
            <p className='text-subtitle'>项目测试委托方交付汇款</p>
            <Timeline>
              <Timeline.Item
                color={contractManagerStatusToColor(1, steps[2].status)}
              >
                <Link to={`${HOME_REGISTRATION_DETAIL.path}/financeShow`}>
                  <span>选择负责的财务人员</span>
                </Link>
              </Timeline.Item>
              <Timeline.Item
                color={contractManagerStatusToColor(2, steps[2].status)}
              >
                <span>等待企业付款</span>
              </Timeline.Item>
              <Timeline.Item
                color={contractManagerStatusToColor(3, steps[2].status)}
              >
                <span>财务人员审核</span>
              </Timeline.Item>
            </Timeline>
          </div>
          <Button
            size='large'
            disabled={steps[2].status !== 4}
            onClick={handlePushProcess}
            loading={pushProcessLoading}
          >
            交付汇款完成开始现场测试
          </Button>
        </div>
      ) : null}
    </div>
  );
};
