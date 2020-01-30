import React, { useState, useEffect } from 'react';

import moment from 'moment';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_REGISTRATION_BASIC,
  SET_REGISTRATION_DETAIL_STATUS
} from '@/constants/api-constants';

// 样式
import { Descriptions, Icon, Button, Input, Skeleton, message } from 'antd';
import '@/style/home/project-manager/basic.styl';
const { TextArea } = Input;

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [registrationBasic, setRegistrationBasic] = useState(null),
    [getDataLoading, setGetDataLoading] = useState(false),
    [statusLoading, setStatusLoading] = useState(false),
    [failText, setFailText] = useState(''),
    history = useHistory();

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      await proxyFetch(SET_REGISTRATION_DETAIL_STATUS, {
        registrationUuid: enterpriseRegistrationUuid,
        type: 'basic',
        status: 2
      });

      setStatusLoading(false);
      history.push(HOME_REGISTRATION_PROFILE.path);
    })();
  };

  const handleSetFailStatus = () => {
    if (failText) {
      (async () => {
        setStatusLoading(true);

        await proxyFetch(SET_REGISTRATION_DETAIL_STATUS, {
          registrationUuid: enterpriseRegistrationUuid,
          type: 'basic',
          status: 3,
          failText
        });

        setStatusLoading(false);
        history.push(HOME_REGISTRATION_PROFILE.path);
      })();
    } else {
      message.error('请输入未通过审核理由!');
    }
  };

  // 将已有的数据回显
  useEffect(() => {
    if (enterpriseRegistrationUuid) {
      (async () => {
        setGetDataLoading(true);

        let registrationBasic = await proxyFetch(
          SELECT_REGISTRATION_BASIC,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        setRegistrationBasic(registrationBasic);
        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  return (
    <>
      <div className='subtitle-box'>
        <Link to={HOME_REGISTRATION_PROFILE.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>登记测试基本信息</p>
      </div>
      <Skeleton loading={getDataLoading}>
        {registrationBasic ? (
          <div className='detail-basic-box'>
            <Descriptions bordered className='basic-description-box'>
              <Descriptions.Item label='版本'>
                {registrationBasic.version}
              </Descriptions.Item>
              <Descriptions.Item label='联系人' span={2}>
                {registrationBasic.linkman}
              </Descriptions.Item>
              <Descriptions.Item label='委托单位(人)'>
                {registrationBasic.client}
              </Descriptions.Item>
              <Descriptions.Item label='电话(手机)' span={2}>
                {registrationBasic.phone}
              </Descriptions.Item>
              <Descriptions.Item label='注册地址' span={3}>
                {registrationBasic.address}
              </Descriptions.Item>
              <Descriptions.Item label='开发研发日期' span={3}>
                {moment(registrationBasic.devStartTime).format('YYYY-MM-DD')}
              </Descriptions.Item>
              <Descriptions.Item label='开发单位全称' span={3}>
                {registrationBasic.enterpriseName}
              </Descriptions.Item>
            </Descriptions>
            <div className='basic-button-box'>
              <Button
                type='primary'
                htmlType='submit'
                className='fail-button'
                loading={statusLoading}
                onClick={handleSetFailStatus}
              >
                审核不通过
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                className='success-button'
                loading={statusLoading}
                onClick={handleSetSuccessStatus}
              >
                审核通过
              </Button>
            </div>
            <TextArea
              autoSize={{ minRows: 3, maxRows: 6 }}
              maxLength='800'
              placeholder='请输入审核不通过理由'
              className='basic-textArea-box'
              onChange={e => {
                setFailText(e.target.value);
              }}
            />
          </div>
        ) : null}
      </Skeleton>
    </>
  );
};
