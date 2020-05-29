import React, { useState, useEffect } from 'react';

// 工具
import statusToColor from '@/components/home/project-manager/delegation-detail/util/status-to-color';

// 路由
import { HOME_DELEGATION_PROFILE } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_DELEGATION_SPECIMEN,
  SET_DELEGATION_DETAIL_SUCCESS_STATUS,
  SET_DELEGATION_DETAIL_FAIL_STATUS
} from '@/constants/api-constants';

// 样式
import {
  Descriptions,
  Icon,
  Button,
  Tag,
  Input,
  Skeleton,
  message
} from 'antd';
import '@/style/home/project-manager/specimen.styl';
const { TextArea } = Input;

export default props => {
  const { enterpriseDelegationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [delegationSpecimen, setDelegationSpecimen] = useState(null),
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
        type: 'specimen'
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
          type: 'specimen',
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

        let delegationSpecimen = await proxyFetch(
          SELECT_DELEGATION_SPECIMEN,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        if (delegationSpecimen) {
          setStatus(delegationSpecimen.status);
          setStatusText(delegationSpecimen.statusText);
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
    <>
      <div className='subtitle-box'>
        <Link to={`${HOME_DELEGATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>
          样品登记表
          <Tag className='content-tag' color={statusToColor(status)}>
            {statusText}
          </Tag>
        </p>
      </div>
      <Skeleton loading={getDataLoading}>
        {delegationSpecimen ? (
          <div className='detail-specimen-box'>
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
              className='specimen-textArea-box'
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
