import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_PROJECT_REGISTRATION_TEST_APPLY,
  GET_PROJECT_REGISTRATION_TEST_SPECIMEN,
  GET_PROJECT_REGISTRATION_TEST_REPORT,
  GET_PROJECT_REGISTRATION_TEST_RECORD
} from '@/constants/api-constants';

// 样式
import { Timeline, Icon, Tag, Button, Skeleton } from 'antd';
import '@/style/home/project-manager/field-test-profile.styl';

// 路由
import { HOME_REGISTRATION_DETAIL } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

export default props => {
  const {
      enterpriseRegistrationUuid,
      steps,
      sysRegistrationStep
    } = useSelector(state => state.enterpriseStore),
    [getDataLoading, setGetDataLoading] = useState(false),
    [registrationApply, setRegistrationApply] = useState(null),
    [registrationSpecimen, setRegistrationSpecimen] = useState(null),
    [applyManagerStatus, setApplyManagerStatus] = useState(0),
    [specimenManagerStatus, setSpecimenManagerStatus] = useState(0),
    [registrationReport, setRegistrationReport] = useState(null),
    [registrationRecord, setRegistrationRecord] = useState(null),
    [registrationReportStatus, setRegistrationReportStatus] = useState(0),
    [registrationRecordStatus, setRegistrationRecordStatus] = useState(0);

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
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);
        const [
          registrationApply,
          registrationSpecimen,
          registrationReport,
          registrationRecord
        ] = await Promise.all([
          proxyFetch(
            GET_PROJECT_REGISTRATION_TEST_APPLY,
            { registrationUuid: enterpriseRegistrationUuid },
            'GET'
          ),
          proxyFetch(
            GET_PROJECT_REGISTRATION_TEST_SPECIMEN,
            { registrationUuid: enterpriseRegistrationUuid },
            'GET'
          ),
          proxyFetch(
            GET_PROJECT_REGISTRATION_TEST_REPORT,
            { registrationUuid: enterpriseRegistrationUuid },
            'GET'
          ),
          proxyFetch(
            GET_PROJECT_REGISTRATION_TEST_RECORD,
            { registrationUuid: enterpriseRegistrationUuid },
            'GET'
          )
        ]);

        setApplyManagerStatus(registrationApply?.managerStatus);
        setRegistrationApply(registrationApply);
        setSpecimenManagerStatus(registrationSpecimen?.managerStatus);
        setRegistrationSpecimen(registrationSpecimen);
        setRegistrationReport(registrationReport);
        setRegistrationRecord(registrationRecord);
        setRegistrationReportStatus(registrationReport?.status);
        setRegistrationRecordStatus(registrationRecord?.status);

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

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
          {sysRegistrationStep[3].name}
          <Tag className='title-tag' color={steps[3].color}>
            {steps[3].statusText}
          </Tag>
        </div>
        <div className='item-detail-box'>
          <p className='text-subtitle'>对委托方提供的软件进行测试</p>
          <Timeline mode='left'>
            <Timeline.Item color={fieldTestsStatusToColor(1, steps[3].status)}>
              {steps[3].status ? (
                <Link
                  to={`${HOME_REGISTRATION_DETAIL.path}/technicalManagerShow`}
                >
                  <span>选择技术负责人</span>
                </Link>
              ) : (
                <span>选择技术负责人</span>
              )}
            </Timeline.Item>
            <Timeline.Item color={fieldTestsStatusToColor(2, steps[3].status)}>
              技术负责人选择技术人员
            </Timeline.Item>
            <Timeline.Item color={fieldTestsStatusToColor(3, steps[3].status)}>
              <div className='inner-timeline-box'>
                <Skeleton loading={getDataLoading}>
                  {registrationSpecimen ? (
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
                        {specimenManagerStatus > 1 ||
                        specimenManagerStatus < -1 ? (
                          <Link
                            to={`${HOME_REGISTRATION_DETAIL.path}/testSpecimen`}
                          >
                            <Timeline.Item
                              color={fieldTestManagerStatusToColor(
                                2,
                                specimenManagerStatus
                              )}
                            >
                              项目管理员确认
                            </Timeline.Item>
                          </Link>
                        ) : (
                          <Timeline.Item
                            color={fieldTestManagerStatusToColor(
                              2,
                              specimenManagerStatus
                            )}
                          >
                            项目管理员确认
                          </Timeline.Item>
                        )}
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
                  ) : null}
                  {registrationApply ? (
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
                          技术人员确认
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            2,
                            applyManagerStatus
                          )}
                        >
                          技术负责人确认
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            3,
                            applyManagerStatus
                          )}
                        >
                          批准人确认
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            4,
                            applyManagerStatus
                          )}
                        >
                          完成
                        </Timeline.Item>
                      </Timeline>
                    </div>
                  ) : null}
                </Skeleton>
              </div>
            </Timeline.Item>
            <Timeline.Item color={fieldTestsStatusToColor(4, steps[3].status)}>
              <Skeleton loading={getDataLoading}>
                <div className='inner-timeline-box'>
                  {registrationReport ? (
                    <div className='left-timeline-box'>
                      <div className='timeline-top-box'>报告盖章</div>
                      <Timeline mode='left' className='timeline-box'>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            1,
                            registrationReportStatus
                          )}
                        >
                          <span>技术人员生成报告</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            2,
                            registrationReportStatus
                          )}
                        >
                          <span>技术负责人审查报告</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            3,
                            registrationReportStatus
                          )}
                        >
                          <span>批准人审查报告</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            4,
                            registrationReportStatus
                          )}
                        >
                          <Link to={`${HOME_REGISTRATION_DETAIL.path}/reportStamp`}>
                            <span>项目管理人报告盖章</span>
                          </Link>
                        </Timeline.Item>
                      </Timeline>
                    </div>
                  ) : null}
                  {registrationRecord ? (
                    <div className='right-timeline-box'>
                      <div className='timeline-top-box'>原始记录盖章</div>
                      <Timeline mode='left' className='timeline-box'>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            1,
                            registrationRecordStatus
                          )}
                        >
                          <span>技术人员生成原始记录</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            2,
                            registrationRecordStatus
                          )}
                        >
                          <span>技术负责人审查原始记录</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            3,
                            registrationRecordStatus
                          )}
                        >
                          <span>批准人审查原始记录</span>
                        </Timeline.Item>
                        <Timeline.Item
                          color={fieldTestManagerStatusToColor(
                            4,
                            registrationRecordStatus
                          )}
                        >
                          <Link to={`${HOME_REGISTRATION_DETAIL.path}/recordStamp`}>
                            <span>项目管理人原始记录盖章</span>
                          </Link>
                        </Timeline.Item>
                      </Timeline>
                    </div>
                  ) : null}
                </div>
              </Skeleton>
            </Timeline.Item>
          </Timeline>
        </div>
        <Button size='large'>现场测试完成开始接受原始记录和测试报告</Button>
      </div>
    </div>
  );
};
