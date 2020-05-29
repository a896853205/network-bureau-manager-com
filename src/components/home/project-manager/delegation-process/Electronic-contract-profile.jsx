import React, { useState, useEffect } from 'react';

// redux
import { useSelector } from 'react-redux';

// 路由
import { HOME_DELEGATION_DETAIL } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

import { Icon, Tag, Timeline } from 'antd';
export default () => {
  const { delegationSteps, sysDelegationStep, delegation } = useSelector(
      (state) => state.enterpriseStore
    ),
    [isCurrentStep, setIsCurrentStep] = useState(false);

  useEffect(() => {
    if (delegation?.currentStep === 2) {
      setIsCurrentStep(true);
    }
  }, [delegation]);

  const contractManagerStatusToColor = (step, status = 0) => {
    if (status === step) {
      return 'blue';
    } else if (status > step) {
      return 'green';
    } else {
      return 'gray';
    }
  };

  return (
    <div className='left-item-box'>
      <Icon
        className='item-icon-box'
        type='profile'
        theme='twoTone'
        twoToneColor='#334454'
      />
      {sysDelegationStep.length ? (
        <div className='item-text-box'>
          <div className='text-top-box'>
            {sysDelegationStep[1].name}
            <Tag className='title-tag' color={delegationSteps[1].color}>
              {delegationSteps[1].statusText}
            </Tag>
          </div>
          <div className='item-detail-box'>
            <p className='text-subtitle'>甲乙双方电子签合同</p>
            <Timeline mode='left'>
              <Timeline.Item
                color={
                  delegationSteps[1].status === -1
                    ? 'green'
                    : contractManagerStatusToColor(1, delegationSteps[1].status)
                }
              >
                {delegationSteps[1].status ? (
                  <Link
                    to={`${HOME_DELEGATION_DETAIL.path}/contractManager`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
                    <span>填写经营管理部合同内容</span>
                  </Link>
                ) : (
                  <span>填写经营管理部合同内容</span>
                )}
              </Timeline.Item>
              <Timeline.Item
                color={
                  delegationSteps[1].status === -1
                    ? 'green'
                    : contractManagerStatusToColor(2, delegationSteps[1].status)
                }
              >
                等待企业上传合同pdf
              </Timeline.Item>
              <Timeline.Item
                color={
                  delegationSteps[1].status === -1
                    ? 'red'
                    : contractManagerStatusToColor(3, delegationSteps[1].status)
                }
              >
                {delegationSteps[1].status >= 3 || delegationSteps[1].status === -1 ? (
                  <Link
                    to={`${HOME_DELEGATION_DETAIL.path}/contractExamine`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
                    <span>审核乙方合同</span>
                  </Link>
                ) : (
                  <span>审核乙方合同</span>
                )}
              </Timeline.Item>
              <Timeline.Item
                color={
                  delegationSteps[1].status === -1
                    ? 'gray'
                    : contractManagerStatusToColor(4, delegationSteps[1].status)
                }
              >
                {delegationSteps[1].status >= 4 ? (
                  <Link
                    to={`${HOME_DELEGATION_DETAIL.path}/contractDownload`}
                    className={isCurrentStep ? '' : 'old-link'}
                  >
                    <span>管理员合同盖章上传</span>
                  </Link>
                ) : (
                  <span>管理员合同盖章上传</span>
                )}
              </Timeline.Item>
            </Timeline>
          </div>
        </div>
      ) : null}
    </div>
  );
};
