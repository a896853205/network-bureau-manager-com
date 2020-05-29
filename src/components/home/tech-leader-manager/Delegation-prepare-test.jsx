import React, { useState, useEffect } from 'react';

// 样式
import { Icon, Timeline, Skeleton } from 'antd';
import '@/style/home/tech-leader-manager/prepare-test.styl';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_TECH_LEADER_DELEGATION_TEST_APPLY,
  GET_TECH_LEADER_DELEGATION_TEST_SPECIMEN
} from '@/constants/api-constants';

// 路由
import { HOME_DELEGATION_TASK_DETAIL_APPLY } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

export default props => {
  const { enterpriseDelegationUuid, delegation } = useSelector(
      state => state.enterpriseStore
    ),
    [getDataLoading, setGetDataLoading] = useState(false),
    [applyManagerStatus, setApplyManagerStatus] = useState(0),
    [specimenManagerStatus, setSpecimenManagerStatus] = useState(0),
    [isCurrentStep, setIsCurrentStep] = useState(false);

  useEffect(() => {
    if (delegation?.currentStep === 4) {
      setIsCurrentStep(true);
    }
  }, [delegation]);
  const fieldTestManagerStatusToColor = (manager, managerStatus = 0) => {
    let color = '';

    if (managerStatus === -manager) {
      color = 'red';
    } else if (managerStatus === manager) {
      color = 'blue';
    } else if (managerStatus > manager || -managerStatus > manager) {
      color = 'green';
    } else {
      color = 'gray';
    }

    return color;
  };

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseDelegationUuid) {
      (async () => {
        setGetDataLoading(true);
        const [delegationApply, delegationSpecimen] = await Promise.all([
          proxyFetch(
            GET_TECH_LEADER_DELEGATION_TEST_APPLY,
            { delegationUuid: enterpriseDelegationUuid },
            'GET'
          ),
          proxyFetch(
            GET_TECH_LEADER_DELEGATION_TEST_SPECIMEN,
            { delegationUuid: enterpriseDelegationUuid },
            'GET'
          )
        ]);

        if (delegationApply) {
          setApplyManagerStatus(delegationApply.managerStatus);
        }

        if (delegationSpecimen) {
          setSpecimenManagerStatus(delegationSpecimen.managerStatus);
        }

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseDelegationUuid]);

  return (
    <div className='prepare-test-box'>
      <div className='timeline-item-box'>
        <Icon
          className='item-icon-box'
          type='snippets'
          theme='twoTone'
          twoToneColor='#334454'
        />
        <div className='item-text-box'>
          <div className='text-top-box'>管理员审核确认</div>
          <p className='text-subtitle'>
            管理员审核并确认软件评测样品登记表和现场测试表
          </p>
          <div className='inner-timeline-box'>
            <Skeleton loading={getDataLoading}>
              <div className='left-timeline-box'>
                <div className='timeline-top-box'>软件评测样品登记表</div>
                <Timeline mode='left' className='timeline-box'>
                  <Timeline.Item
                    color={fieldTestManagerStatusToColor(
                      1,
                      specimenManagerStatus
                    )}
                  >
                    技术人员确认
                  </Timeline.Item>
                  <Timeline.Item
                    color={fieldTestManagerStatusToColor(
                      2,
                      specimenManagerStatus
                    )}
                  >
                    项目管理员确认
                  </Timeline.Item>
                  <Timeline.Item
                    color={fieldTestManagerStatusToColor(
                      3,
                      specimenManagerStatus
                    )}
                  >
                    完成
                  </Timeline.Item>
                </Timeline>
              </div>
              <div className='right-timeline-box'>
                <div className='timeline-top-box'>软件评测现场测试申请表</div>
                <Timeline mode='left' className='timeline-box'>
                  <Timeline.Item
                    color={fieldTestManagerStatusToColor(1, applyManagerStatus)}
                  >
                    技术人员确认
                  </Timeline.Item>
                  {applyManagerStatus > 1 || applyManagerStatus < -1 ? (
                    <Link
                      to={HOME_DELEGATION_TASK_DETAIL_APPLY.path}
                      className={isCurrentStep ? '' : 'old-link'}
                    >
                      <Timeline.Item
                        color={fieldTestManagerStatusToColor(
                          2,
                          applyManagerStatus
                        )}
                      >
                        技术负责人确认
                      </Timeline.Item>
                    </Link>
                  ) : (
                    <Timeline.Item
                      color={fieldTestManagerStatusToColor(
                        2,
                        applyManagerStatus
                      )}
                    >
                      技术负责人确认
                    </Timeline.Item>
                  )}
                  <Timeline.Item
                    color={fieldTestManagerStatusToColor(3, applyManagerStatus)}
                  >
                    批准人确认
                  </Timeline.Item>
                  <Timeline.Item
                    color={fieldTestManagerStatusToColor(4, applyManagerStatus)}
                  >
                    完成
                  </Timeline.Item>
                </Timeline>
              </div>
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
};
