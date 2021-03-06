import React, { useState, useEffect } from 'react';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_TECH_LEADER_REGISTRATION_REPORT_STATUS,
  GET_TECH_LEADER_REGISTRATION_RECORD_STATUS
} from '@/constants/api-constants';

// redux
import { useSelector } from 'react-redux';

// 路由
import {
  HOME_REGISTRATION_TASK_EXAMINE_REPORT,
  HOME_REGISTRATION_TASK_EXAMINE_ORIGINAL_RECORD
} from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// 样式
import { Icon, Timeline, Skeleton } from 'antd';
import '@/style/home/tech-leader-manager/generate-report.styl';

export default props => {
  const { enterpriseRegistrationUuid, registration } = useSelector(
      state => state.enterpriseStore
    ),
    [getDataLoading, setGetDataLoading] = useState(false),
    [registrationReport, setRegistrationReport] = useState(null),
    [registrationRecord, setRegistrationRecord] = useState(null),
    [reportStatus, setReportStatus] = useState(0),
    [recordStatus, setRecordStatus] = useState(0),
    [isCurrentStep, setIsCurrentStep] = useState(false);

  useEffect(() => {
    if (registration?.currentStep === 4) {
      setIsCurrentStep(true);
    }
  }, [registration]);

  const fieldTestStatusToColor = (manager, status = 0) => {
    if (status === -manager) {
      return 'red';
    } else if (status === manager) {
      return 'blue';
    } else if (status > manager || -status > manager) {
      return 'green';
    } else {
      return 'gray';
    }
  };

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);
        const [registrationReport, registrationRecord] = await Promise.all([
          proxyFetch(
            GET_TECH_LEADER_REGISTRATION_REPORT_STATUS,
            { registrationUuid: enterpriseRegistrationUuid },
            'GET'
          ),
          proxyFetch(
            GET_TECH_LEADER_REGISTRATION_RECORD_STATUS,
            { registrationUuid: enterpriseRegistrationUuid },
            'GET'
          )
        ]);

        setReportStatus(registrationReport?.status);
        setRegistrationReport(registrationReport);
        setRecordStatus(registrationRecord?.status);
        setRegistrationRecord(registrationRecord);

        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  return (
    <div className='generate-report-box'>
      <div className='timeline-item-box'>
        <Icon
          className='item-icon-box'
          type='file-text'
          theme='twoTone'
          twoToneColor='#334454'
        />
        <div className='item-text-box'>
          <div className='text-top-box'>生成报告和原始记录</div>
          <p className='text-subtitle'>技术人员生成报告和原始记录</p>
          <Skeleton loading={getDataLoading}>
            <div className='inner-timeline-box'>
              {registrationReport ? (
                <div className='left-timeline-box'>
                  <div className='timeline-top-box'>报告盖章</div>
                  <Timeline mode='left' className='timeline-box'>
                    <Timeline.Item
                      color={fieldTestStatusToColor(1, reportStatus)}
                    >
                      <span>技术人员生成报告</span>
                    </Timeline.Item>
                    <Timeline.Item
                      color={fieldTestStatusToColor(2, reportStatus)}
                    >
                      {reportStatus > 1 || reportStatus < -1 ? (
                        <Link
                          to={HOME_REGISTRATION_TASK_EXAMINE_REPORT.path}
                          className={isCurrentStep ? '' : 'old-link'}
                        >
                          <span>技术负责人审查报告</span>
                        </Link>
                      ) : (
                        <span>技术负责人审查报告</span>
                      )}
                    </Timeline.Item>
                    <Timeline.Item
                      color={fieldTestStatusToColor(3, reportStatus)}
                    >
                      <span>批准人审查报告</span>
                    </Timeline.Item>
                    <Timeline.Item
                      color={fieldTestStatusToColor(4, reportStatus)}
                    >
                      <span>项目管理人报告盖章</span>
                    </Timeline.Item>
                    <Timeline.Item
                      color={fieldTestStatusToColor(5, reportStatus)}
                    >
                      <span>完成</span>
                    </Timeline.Item>
                  </Timeline>
                </div>
              ) : null}
              {registrationRecord ? (
                <div className='right-timeline-box'>
                  <div className='timeline-top-box'>原始记录盖章</div>
                  <Timeline mode='left' className='timeline-box'>
                    <Timeline.Item
                      color={fieldTestStatusToColor(1, recordStatus)}
                    >
                      <span>技术人员生成原始记录</span>
                    </Timeline.Item>
                    <Timeline.Item
                      color={fieldTestStatusToColor(2, recordStatus)}
                    >
                      {recordStatus > 1 || recordStatus < -1 ? (
                        <Link
                          to={
                            HOME_REGISTRATION_TASK_EXAMINE_ORIGINAL_RECORD.path
                          }
                          className={isCurrentStep ? '' : 'old-link'}
                        >
                          <span>技术负责人审查原始记录</span>
                        </Link>
                      ) : (
                        <span>技术负责人审查原始记录</span>
                      )}
                    </Timeline.Item>
                    <Timeline.Item
                      color={fieldTestStatusToColor(3, recordStatus)}
                    >
                      <span>批准人审查原始记录</span>
                    </Timeline.Item>
                    <Timeline.Item
                      color={fieldTestStatusToColor(4, recordStatus)}
                    >
                      <span>项目管理人原始记录盖章</span>
                    </Timeline.Item>
                    <Timeline.Item
                      color={fieldTestStatusToColor(5, recordStatus)}
                    >
                      <span>完成</span>
                    </Timeline.Item>
                  </Timeline>
                </div>
              ) : null}
            </div>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
