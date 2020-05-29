import React, { useState, useEffect } from 'react';

// 样式
import { Icon, Tag, Timeline } from 'antd';

//路由
import { Link } from 'react-router-dom';
import { HOME_DELEGATION_DETAIL } from '@/constants/route-constants';

// redux
import { useSelector } from 'react-redux';

export default props => {
  const { delegationSteps, sysDelegationStep, delegation } = useSelector(
      state => state.enterpriseStore
    ),
    [isCurrentStep, setIsCurrentStep] = useState(false);

  useEffect(() => {
    if (delegation?.currentStep === 3) {
      setIsCurrentStep(true);
    }
  }, [delegation]);

  const contractManagerStatusToColor = (step, status = 0) => {
    let color = '';

    if (status === step) {
      color = 'blue';
    } else if (status > step) {
      color = 'green';
    } else {
      color = 'gray';
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
      {sysDelegationStep.length ? (
        <div className='item-text-box'>
          <div className='text-top-box'>
            {sysDelegationStep[2].name}
            <Tag className='title-tag' color={delegationSteps[2].color}>
              {delegationSteps[2].statusText}
            </Tag>
          </div>
          <div className='item-detail-box'>
            <p className='text-subtitle'>项目测试委托方交付汇款</p>
            <Timeline>
              <Timeline.Item
                color={contractManagerStatusToColor(1, delegationSteps[2].status)}
              >
                {delegationSteps[2].status ? (
                  <Link to={`${HOME_DELEGATION_DETAIL.path}/financeShow`} className={isCurrentStep ? '' : 'old-link'}>
                    <span>选择负责的财务人员</span>
                  </Link>
                ) : (
                  <span>选择负责的财务人员</span>
                )}
              </Timeline.Item>
              <Timeline.Item
                color={contractManagerStatusToColor(2, delegationSteps[2].status)}
              >
                <span>等待企业付款</span>
              </Timeline.Item>
              <Timeline.Item
                color={contractManagerStatusToColor(3, delegationSteps[2].status)}
              >
                <span>财务人员审核</span>
              </Timeline.Item>
            </Timeline>
          </div>
        </div>
      ) : null}
    </div>
  );
};
