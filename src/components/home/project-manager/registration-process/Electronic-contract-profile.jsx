import React, { useState } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 路由
import { HOME_REGISTRATION_DETAIL } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// 请求
import { PUSH_REGISTRATION_PROCESS } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

import { Icon, Tag, Timeline, Button } from 'antd';
export default () => {
  const {
      steps,
      enterpriseRegistrationUuid,
      sysRegistrationStep
    } = useSelector(state => state.enterpriseStore),
    dispatch = useDispatch(),
    [pushProcessLoading, setPushProcessLoading] = useState(false);

  const contractManagerStatusToColor = (step, status = 0) => {
    if (status === step) {
      return 'blue';
    } else if (status > step) {
      return 'green';
    } else {
      return 'grey';
    }
  };

  const handlePushProcess = () => {
    (async () => {
      setPushProcessLoading(true);
      await proxyFetch(PUSH_REGISTRATION_PROCESS, {
        registrationUuid: enterpriseRegistrationUuid
      });

      setPushProcessLoading(false);
      dispatch(enterpriseAction.asyncSetSteps(enterpriseRegistrationUuid));
    })();
  };

  return (
    <div className='left-item-box'>
      <Icon
        className='item-icon-box'
        type='profile'
        theme='twoTone'
        twoToneColor='#334454'
      />
      {sysRegistrationStep.length ? (
        <div className='item-text-box'>
          <div className='text-top-box'>
            {sysRegistrationStep[1].name}
            <Tag className='title-tag' color={steps[1].color}>
              {steps[1].statusText}
            </Tag>
          </div>
          <div className='item-detail-box'>
            <p className='text-subtitle'>甲乙双方电子签合同</p>
            <Timeline mode='left'>
              <Timeline.Item
                color={
                  steps[1].status === -1
                    ? 'green'
                    : contractManagerStatusToColor(1, steps[1].status)
                }
              >
                {steps[1].status ? (
                  <Link to={`${HOME_REGISTRATION_DETAIL.path}/contractManager`}>
                    <span>填写经营管理部合同内容</span>
                  </Link>
                ) : (
                  <span>填写经营管理部合同内容</span>
                )}
              </Timeline.Item>
              <Timeline.Item
                color={
                  steps[1].status === -1
                    ? 'green'
                    : contractManagerStatusToColor(2, steps[1].status)
                }
              >
                {steps[1].status >= 2 || steps[1].status === -1 ? (
                  <Link
                    to={`${HOME_REGISTRATION_DETAIL.path}/contractDownload`}
                  >
                    <span>管理员制定合同</span>
                  </Link>
                ) : (
                  <span>管理员制定合同</span>
                )}
              </Timeline.Item>
              <Timeline.Item
                color={
                  steps[1].status === -1
                    ? 'green'
                    : contractManagerStatusToColor(3, steps[1].status)
                }
              >
                等待企业上传合同pdf
              </Timeline.Item>
              <Timeline.Item
                color={
                  steps[1].status === -1
                    ? 'red'
                    : contractManagerStatusToColor(4, steps[1].status)
                }
              >
                {steps[1].status >= 4 || steps[1].status === -1 ? (
                  <Link to={`${HOME_REGISTRATION_DETAIL.path}/contractExamine`}>
                    <span>审查最终合同</span>
                  </Link>
                ) : (
                  <span>审查最终合同</span>
                )}
              </Timeline.Item>
            </Timeline>
          </div>
          <Button
            disabled={steps[1].status !== 100 || steps[2].status}
            size='large'
            onClick={handlePushProcess}
            loading={pushProcessLoading}
          >
            电子签合同完成开始交付汇款
          </Button>
        </div>
      ) : null}
    </div>
  );
};
