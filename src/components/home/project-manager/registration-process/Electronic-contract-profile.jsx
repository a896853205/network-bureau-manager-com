import React, { useState, useEffect } from 'react';

// redux
import { useSelector } from 'react-redux';

// 路由
import { HOME_REGISTRATION_DETAIL } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// 请求
import {
  QUERY_SYS_REGISTRATION_STEP,
  SELECT_REGISTRATION_CONTRACT_MANAGER
} from '@/constants/api-constants';
import proxyFetch from '@/util/request';

import { Icon, Tag, Timeline, Skeleton, Button } from 'antd';
export default () => {
  const { steps, enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [sysRegistrationStepList, setSysRegistrationStepList] = useState([]),
    [managerStatus, setManagerStatus] = useState([]),
    [loading, setLoading] = useState(true);

  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setLoading(true);
        const res = await proxyFetch(
          SELECT_REGISTRATION_CONTRACT_MANAGER,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        setManagerStatus(res.managerStatus);
        setLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  const contractManagerStatusToColor = (step, managerStatus = 0) => {
    let color = '';

    if (managerStatus === step) {
      color = 'blue';
    } else if (managerStatus > step) {
      color = 'green';
    } else {
      color = 'grey';
    }

    return color;
  };

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
        type='profile'
        theme='twoTone'
        twoToneColor='#334454'
      />
      <Skeleton loading={loading}>
        {sysRegistrationStepList.length ? (
          <div className='item-text-box'>
            <div className='text-top-box'>
              {sysRegistrationStepList[1].name}
              <Tag className='title-tag' color={statusToColor(steps[1].status)}>
                {steps[1].statusText}
              </Tag>
            </div>
            <div className='item-detail-box'>
              <p className='text-subtitle'>甲乙双方电子签合同</p>
              <Timeline mode='left'>
                <Timeline.Item
                  color={contractManagerStatusToColor(1, managerStatus)}
                >
                  {managerStatus ? (
                    <Link
                      to={`${HOME_REGISTRATION_DETAIL.path}/contractManager`}
                    >
                      <span>填写经营管理部合同内容</span>
                    </Link>
                  ) : (
                    <span>填写经营管理部合同内容</span>
                  )}
                </Timeline.Item>
                <Timeline.Item
                  color={contractManagerStatusToColor(2, managerStatus)}
                >
                  {managerStatus >= 2 ? (
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
                  color={contractManagerStatusToColor(3, managerStatus)}
                >
                  等待企业上传合同pdf
                </Timeline.Item>
                <Timeline.Item
                  color={contractManagerStatusToColor(4, managerStatus)}
                >
                  {managerStatus >= 4 ? (
                    <Link
                      to={`${HOME_REGISTRATION_DETAIL.path}/contractExamine`}
                    >
                      <span>审查最终合同</span>
                    </Link>
                  ) : (
                    <span>审查最终合同</span>
                  )}
                </Timeline.Item>
              </Timeline>
            </div>
            <Button>电子签合同完成开始交付汇款</Button>
          </div>
        ) : null}
      </Skeleton>
    </div>
  );
};
