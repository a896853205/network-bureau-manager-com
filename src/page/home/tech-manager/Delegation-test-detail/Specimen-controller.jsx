import React, { useState, useEffect } from 'react';

// 路由
import { HOME_DELEGATION_TEST_PROFILE } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_TECH_DELEGATION_TEST_SPECIMEN,
  SET_DELEGATION_TECH_SPECIMEN_MANAGER_STATUS,
  SET_DELEGATION_TECH_SPECIMEN_MANAGER_FAIL_STATUS
} from '@/constants/api-constants';

// 样式
import { Descriptions, Icon, Button, Input, Skeleton, message } from 'antd';
import '@/style/home/tech-manager/specimen.styl';
const { TextArea } = Input;

export default props => {
  const { enterpriseDelegationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [delegationSpecimen, setDelegationSpecimen] = useState(null),
    [getDataLoading, setGetDataLoading] = useState(false),
    [statusLoading, setStatusLoading] = useState(false),
    [failManagerText, setFailManagerText] = useState(''),
    [managerStatus, setManagerStatus] = useState(0),
    history = useHistory();

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      await proxyFetch(SET_DELEGATION_TECH_SPECIMEN_MANAGER_STATUS, {
        delegationUuid: enterpriseDelegationUuid
      });

      setStatusLoading(false);
      history.push(HOME_DELEGATION_TEST_PROFILE.path);
    })();
  };

  const handleSetFailStatus = () => {
    if (failManagerText) {
      (async () => {
        setStatusLoading(true);

        const res = await proxyFetch(SET_DELEGATION_TECH_SPECIMEN_MANAGER_FAIL_STATUS, {
          delegationUuid: enterpriseDelegationUuid,
          failManagerText
        });

        setStatusLoading(false);
        if (res) {
          history.push(HOME_DELEGATION_TEST_PROFILE.path);
        }
      })();
    } else {
      message.error('请输入未通过审核理由!');
    }
  };

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseDelegationUuid) {
      (async () => {
        setGetDataLoading(true);

        let delegationSpecimen = await proxyFetch(
          GET_TECH_DELEGATION_TEST_SPECIMEN,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        if (delegationSpecimen) {
          setManagerStatus(delegationSpecimen.managerStatus);
        }

        setDelegationSpecimen(delegationSpecimen);
        setGetDataLoading(false);
      })();
    }
  }, [enterpriseDelegationUuid]);

  const securityClassificationToText = securityClassification => {
    switch (securityClassification) {
      case 0:
        return '无';
      case 1:
        return '涉密';
      default:
        return '';
    }
  };

  return (
    <div className='item-box'>
      <p className='title-box'>
        <span>技术人员确认</span>
      </p>
      <div className='subtitle-box'>
        <Link to={`${HOME_DELEGATION_TEST_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>样品登记表</p>
      </div>
      <Skeleton loading={getDataLoading}>
        {delegationSpecimen ? (
          <div className='test-specimen-box'>
            <Descriptions bordered className='specimen-description-box'>
              <Descriptions.Item label='注册商标' span={3}>
                {delegationSpecimen.trademark}
              </Descriptions.Item>
              <Descriptions.Item label='开发工具' span={3}>
                {delegationSpecimen.developmentTool}
              </Descriptions.Item>
              <Descriptions.Item label='产品密级'>
                {securityClassificationToText(
                  delegationSpecimen.securityClassification
                )}
              </Descriptions.Item>
              <Descriptions.Item label='单位属性' span={2}>
                {delegationSpecimen.unit}
              </Descriptions.Item>
              <Descriptions.Item label='邮箱' span={3}>
                {delegationSpecimen.email}
              </Descriptions.Item>
            </Descriptions>
            <div className='specimen-button-box'>
              <Button
                disabled={managerStatus !== 1}
                type='danger'
                htmlType='submit'
                className={managerStatus === 1 ? 'fail-button' : ''}
                loading={statusLoading}
                onClick={handleSetFailStatus}
              >
                审核不通过
              </Button>
              <Button
                disabled={managerStatus !== 1}
                type='primary'
                htmlType='submit'
                className={managerStatus === 1 ? 'success-button' : ''}
                loading={statusLoading}
                onClick={handleSetSuccessStatus}
              >
                审核通过
              </Button>
            </div>
            <TextArea
              disabled={managerStatus !== 1}
              autoSize={{ minRows: 3, maxRows: 6 }}
              maxLength='100'
              placeholder='请输入审核不通过理由'
              className='specimen-textArea-box'
              onChange={e => {
                setFailManagerText(e.target.value);
              }}
            />
          </div>
        ) : null}
      </Skeleton>
    </div>
  );
};
