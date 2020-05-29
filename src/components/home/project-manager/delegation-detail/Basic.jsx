import React, { useState, useEffect } from 'react';

// 工具
import statusToColor from '@/components/home/project-manager/delegation-detail/util/status-to-color';
import moment from 'moment';

// 路由
import { HOME_DELEGATION_PROFILE } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_DELEGATION_BASIC,
  SET_DELEGATION_DETAIL_SUCCESS_STATUS,
  SET_DELEGATION_DETAIL_FAIL_STATUS
} from '@/constants/api-constants';

// 样式
import {
  Descriptions,
  Icon,
  Button,
  Input,
  Skeleton,
  Tag,
  message
} from 'antd';
import '@/style/home/project-manager/basic.styl';
const { TextArea } = Input;

export default props => {
  const { enterpriseDelegationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [delegationBasic, setDelegationBasic] = useState(null),
    [getDataLoading, setGetDataLoading] = useState(false),
    [statusLoading, setStatusLoading] = useState(false),
    [failText, setFailText] = useState(''),
    [status, setStatus] = useState(0),
    [statusText, setStatusText] = useState(''),
    dispatch = useDispatch(),
    history = useHistory();

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      await proxyFetch(SET_DELEGATION_DETAIL_SUCCESS_STATUS, {
        delegationUuid: enterpriseDelegationUuid,
        type: 'basic'
      });

      setStatusLoading(false);
      dispatch(enterpriseAction.asyncSetDelegationSteps(enterpriseDelegationUuid));
      history.push(HOME_DELEGATION_PROFILE.path);
    })();
  };

  const handleSetFailStatus = () => {
    if (failText) {
      (async () => {
        setStatusLoading(true);

        const res = await proxyFetch(SET_DELEGATION_DETAIL_FAIL_STATUS, {
          delegationUuid: enterpriseDelegationUuid,
          type: 'basic',
          failText
        });

        setStatusLoading(false);
        if (res) {
          history.push(HOME_DELEGATION_PROFILE.path);
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

        let delegationBasic = await proxyFetch(
          SELECT_DELEGATION_BASIC,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        if (delegationBasic) {
          setStatus(delegationBasic.status);
          setStatusText(delegationBasic.statusText);
        }

        setDelegationBasic(delegationBasic);
        setGetDataLoading(false);
      })();
    }
  }, [enterpriseDelegationUuid]);

  return (
    <>
      <div className='subtitle-box'>
        <Link to={HOME_DELEGATION_PROFILE.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>
          委托测试基本信息
          <Tag className='content-tag' color={statusToColor(status)}>
            {statusText}
          </Tag>
        </p>
      </div>
      <Skeleton loading={getDataLoading}>
        {delegationBasic ? (
          <div className='detail-basic-box'>
            <Descriptions bordered className='basic-description-box'>
              <Descriptions.Item label='版本'>
                {delegationBasic.version}
              </Descriptions.Item>
              <Descriptions.Item label='联系人' span={2}>
                {delegationBasic.linkman}
              </Descriptions.Item>
              <Descriptions.Item label='委托单位'>
                {delegationBasic.client}
              </Descriptions.Item>
              <Descriptions.Item label='手机' span={2}>
                {delegationBasic.phone}
              </Descriptions.Item>
              <Descriptions.Item label='注册地址' span={3}>
                {delegationBasic.address}
              </Descriptions.Item>
              <Descriptions.Item label='开发研发日期' span={3}>
                {delegationBasic.devStartTime
                  ? moment(delegationBasic.devStartTime).format('YYYY-MM-DD')
                  : ''}
              </Descriptions.Item>
              <Descriptions.Item label='开发单位' span={3}>
                {delegationBasic.enterpriseName}
              </Descriptions.Item>
            </Descriptions>
            <div className='basic-button-box'>
              <Button
                disabled={status !== 2}
                type='primary'
                htmlType='submit'
                className={status === 2 ? 'fail-button' : ''}
                loading={statusLoading}
                onClick={handleSetFailStatus}
              >
                审核不通过
              </Button>
              <Button
                disabled={status !== 2}
                type='primary'
                htmlType='submit'
                className={status === 2 ? 'success-button' : ''}
                loading={statusLoading}
                onClick={handleSetSuccessStatus}
              >
                审核通过
              </Button>
            </div>
            <TextArea
              disabled={status !== 2}
              autoSize={{ minRows: 3, maxRows: 6 }}
              maxLength='100'
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
