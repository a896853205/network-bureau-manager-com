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
  SELECT_DELEGATION_CONTRACT,
  SET_DELEGATION_DETAIL_SUCCESS_STATUS,
  SET_DELEGATION_DETAIL_FAIL_STATUS
} from '@/constants/api-constants';

// 样式
import {
  Descriptions,
  Icon,
  Tag,
  Button,
  Input,
  Skeleton,
  message
} from 'antd';
import '@/style/home/project-manager/contract.styl';
const { TextArea } = Input;

export default props => {
  const { enterpriseDelegationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [delegationContract, setDelegationContract] = useState(null),
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
        type: 'contract'
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
          type: 'contract',
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

        let delegationContract = await proxyFetch(
          SELECT_DELEGATION_CONTRACT,
          { delegationUuid: enterpriseDelegationUuid },
          'GET'
        );

        if (delegationContract) {
          setStatus(delegationContract.status);
          setStatusText(delegationContract.statusText);
        }

        setDelegationContract(delegationContract);
        setGetDataLoading(false);
      })();
    }
  }, [enterpriseDelegationUuid]);

  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${HOME_DELEGATION_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>
          评测合同
          <Tag className='content-tag' color={statusToColor(status)}>
            {statusText}
          </Tag>
        </p>
      </div>
      <Skeleton loading={getDataLoading}>
        {delegationContract ? (
          <div className='detail-contract-box'>
            <Descriptions bordered className='contract-description-box'>
              <Descriptions.Item label='数量'>
                {delegationContract.amount}
              </Descriptions.Item>
              <Descriptions.Item label='邮政编码'>
                {delegationContract.postalCode}
              </Descriptions.Item>
              <Descriptions.Item label='主要功能' span={3}>
                {delegationContract.mainFunction}
              </Descriptions.Item>
              <Descriptions.Item label='技术指标' span={3}>
                {delegationContract.techIndex}
              </Descriptions.Item>
            </Descriptions>
            <div className='contract-button-box'>
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
              className='contract-textArea-box'
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
