import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_PROJECT_DELEGATION_TEST_APPLY,
  GET_PROJECT_DELEGATION_TEST_SPECIMEN,
  GET_PROJECT_DELEGATION_TEST_REPORT,
  GET_PROJECT_DELEGATION_TEST_RECORD
} from '@/constants/api-constants';

// 样式
import { Timeline, Icon, Tag, Skeleton } from 'antd';
import '@/style/home/project-manager/field-test-profile.styl';

// 路由
import { HOME_DELEGATION_DETAIL } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

export default props => {
  const {
      enterpriseDelegationUuid,
      delegationSteps,
      sysDelegationStep,
      delegation
    } = useSelector(state => state.enterpriseStore),
    [getDataLoading, setGetDataLoading] = useState(false),
    [delegationApply, setDelegationApply] = useState(null),
    [delegationSpecimen, setDelegationSpecimen] = useState(null),
    [applyManagerStatus, setApplyManagerStatus] = useState(0),
    [specimenManagerStatus, setSpecimenManagerStatus] = useState(0),
    [delegationReport, setDelegationReport] = useState(null),
    [delegationRecord, setDelegationRecord] = useState(null),
    [delegationReportStatus, setDelegationReportStatus] = useState(0),
    [delegationRecordStatus, setDelegationRecordStatus] = useState(0),
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
        const [
          delegationApply,
          delegationSpecimen,
          delegationReport,
          delegationRecord
        ] = await Promise.all([
          proxyFetch(
            GET_PROJECT_DELEGATION_TEST_APPLY,
            { delegationUuid: enterpriseDelegationUuid },
            'GET'
          ),
          proxyFetch(
            GET_PROJECT_DELEGATION_TEST_SPECIMEN,
            { delegationUuid: enterpriseDelegationUuid },
            'GET'
          ),
          proxyFetch(
            GET_PROJECT_DELEGATION_TEST_REPORT,
            { delegationUuid: enterpriseDelegationUuid },
            'GET'
          ),
          proxyFetch(
            GET_PROJECT_DELEGATION_TEST_RECORD,
            { delegationUuid: enterpriseDelegationUuid },
            'GET'
          )
        ]);

        setApplyManagerStatus(delegationApply?.managerStatus);
        setDelegationApply(delegationApply);
        setSpecimenManagerStatus(delegationSpecimen?.managerStatus);
        setDelegationSpecimen(delegationSpecimen);
        setDelegationReport(delegationReport);
        setDelegationRecord(delegationRecord);
        setDelegationReportStatus(delegationReport?.status);
        setDelegationRecordStatus(delegationRecord?.status);

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseDelegationUuid]);

  const fieldTestsStatusToColor = (step, status = 0) => {
    if (status === step) {
      return 'blue';
    } else if (status > step) {
      return 'green';
    } else {
      return 'gray';
    }
  };

  return (
    <div className='left-item-box field-test-profile-box'>
      <Icon
        className='item-icon-box'
        type='bug'
        theme='twoTone'
        twoToneColor='#334454'
      />
      <div className='item-text-box'>
        <div className='text-top-box'>
          {sysDelegationStep[3].name}
          <Tag className='title-tag' color={delegationSteps[3].color}>
            {delegationSteps[3].statusText}
          </Tag>
        </div>
        <div className='item-detail-box'>
          <p className='text-subtitle'>对委托方提供的软件进行测试</p>
          <Timeline mode='left'>
            <Timeline.Item color={fieldTestsStatusToColor(1, delegationSteps[3].status)}>
              {delegationSteps[3].status ? (
                <Link
                  to={`${HOME_DELEGATION_DETAIL.path}/technicalManagerShow`}
                  className={isCurrentStep ? '' : 'old-link'}
                >
                  <span>选择技术负责人</span>
                </Link>
              ) : (
                <span>选择技术负责人</span>
              )}
            </Timeline.Item>
            <Timeline.Item color={fieldTestsStatusToColor(2, delegationSteps[3].status)}>
              <span>技术负责人选择技术人员</span>
            </Timeline.Item>
            <Timeline.Item color={fieldTestsStatusToColor(3, delegationSteps[3].status)}>
              <div className='inner-timeline-box'>
                <Skeleton loading={getDataLoading}>
                  {delegationSpecimen ? (
                    <div className='left-timeline-box'>
                      <div className='timeline-top-box'>软件评测样品登记表</div>
                      <Timeline mode='left' className='timeline-box'>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            1,
                            specimenManagerStatus
                          )}
                        >
                          <span>技术人员确认</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            2,
                            specimenManagerStatus
                          )}
                        >
                          {specimenManagerStatus > 1 ||
                          specimenManagerStatus < -1 ? (
                            <Link
                              to={`${HOME_DELEGATION_DETAIL.path}/testSpecimen`}
                              className={isCurrentStep ? '' : 'old-link'}
                            >
                              <span>项目管理员确认</span>
                            </Link>
                          ) : (
                            <span>项目管理员确认</span>
                          )}
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            3,
                            specimenManagerStatus
                          )}
                        >
                          <span>完成</span>
                        </Timeline.Item>
                      </Timeline>
                    </div>
                  ) : null}
                  {delegationApply ? (
                    <div className='right-timeline-box'>
                      <div className='timeline-top-box'>
                        软件评测现场测试申请表
                      </div>
                      <Timeline mode='left' className='timeline-box'>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            1,
                            applyManagerStatus
                          )}
                        >
                          <span>技术人员确认</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            2,
                            applyManagerStatus
                          )}
                        >
                          <span>技术负责人确认</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            3,
                            applyManagerStatus
                          )}
                        >
                          <span>批准人确认</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            4,
                            applyManagerStatus
                          )}
                        >
                          <span>完成</span>
                        </Timeline.Item>
                      </Timeline>
                    </div>
                  ) : null}
                </Skeleton>
              </div>
            </Timeline.Item>
            <Timeline.Item color={fieldTestsStatusToColor(4, delegationSteps[3].status)}>
              <Skeleton loading={getDataLoading}>
                <div className='inner-timeline-box'>
                  {delegationReport ? (
                    <div className='left-timeline-box'>
                      <div className='timeline-top-box'>报告盖章</div>
                      <Timeline mode='left' className='timeline-box'>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            1,
                            delegationReportStatus
                          )}
                        >
                          <span>技术人员生成报告</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            2,
                            delegationReportStatus
                          )}
                        >
                          <span>技术负责人审查报告</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            3,
                            delegationReportStatus
                          )}
                        >
                          <span>批准人审查报告</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            4,
                            delegationReportStatus
                          )}
                        >
                          {delegationReportStatus >= 4 ? (
                            <Link
                              to={`${HOME_DELEGATION_DETAIL.path}/reportStamp`}
                              className={isCurrentStep ? '' : 'old-link'}
                            >
                              <span>项目管理人报告盖章</span>
                            </Link>
                          ) : (
                            <span>项目管理人报告盖章</span>
                          )}
                        </Timeline.Item>
                      </Timeline>
                    </div>
                  ) : null}
                  {delegationRecord ? (
                    <div className='right-timeline-box'>
                      <div className='timeline-top-box'>原始记录盖章</div>
                      <Timeline mode='left' className='timeline-box'>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            1,
                            delegationRecordStatus
                          )}
                        >
                          <span>技术人员生成原始记录</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            2,
                            delegationRecordStatus
                          )}
                        >
                          <span>技术负责人审查原始记录</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            3,
                            delegationRecordStatus
                          )}
                        >
                          <span>批准人审查原始记录</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            4,
                            delegationRecordStatus
                          )}
                        >
                          {delegationRecordStatus >= 4 ? (
                            <Link
                              to={`${HOME_DELEGATION_DETAIL.path}/recordStamp`}
                              className={isCurrentStep ? '' : 'old-link'}
                            >
                              <span>项目管理人原始记录盖章</span>
                            </Link>
                          ) : (
                            <span>项目管理人原始记录盖章</span>
                          )}
                        </Timeline.Item>
                      </Timeline>
                    </div>
                  ) : null}
                </div>
              </Skeleton>
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
    </div>
  );
};
