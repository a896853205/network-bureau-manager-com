import React, { useState, useEffect } from 'react';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_REGISTRATION_CONTRACT,
  SET_REGISTRATION_DETAIL_STATUS
} from '@/constants/api-constants';

//样式
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
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [registrationContract, setRegistrationContract] = useState(null),
    [getDataLoading, setGetDataLoading] = useState(false),
    [statusLoading, setStatusLoading] = useState(false),
    [failText, setFailText] = useState(''),
    [status, setStatus] = useState(0),
    [statusText, setStatusText] = useState(''),
    history = useHistory();

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

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      await proxyFetch(SET_REGISTRATION_DETAIL_STATUS, {
        registrationUuid: enterpriseRegistrationUuid,
        type: 'contract',
        status: 3
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
          type: 'contract',
          status: 4,
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

        let registrationContract = await proxyFetch(
          SELECT_REGISTRATION_CONTRACT,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        if (registrationContract) {
          setStatus(registrationContract.status);
          setStatusText(registrationContract.statusText);
        }

        setRegistrationContract(registrationContract);
        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  return (
    <>
      <div className='subtitle-box'>
        <Link to={`${HOME_REGISTRATION_PROFILE.path}`}>
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
        {registrationContract ? (
          <div className='detail-contract-box'>
            <Descriptions bordered className='contract-description-box'>
              <Descriptions.Item label='数量'>
                {registrationContract.amount}
              </Descriptions.Item>
              <Descriptions.Item label='传真'>
                {registrationContract.fax}
              </Descriptions.Item>
              <Descriptions.Item label='邮政编码'>
                {registrationContract.postalCode}
              </Descriptions.Item>
              <Descriptions.Item label='主要功能' span={3}>
                {registrationContract.mainFunction}
              </Descriptions.Item>
              <Descriptions.Item label='技术指标' span={3}>
                {registrationContract.techIndex}
              </Descriptions.Item>
            </Descriptions>
            <div className='contract-button-box'>
              <Button
                disabled={!(status === 2)}
                type='primary'
                htmlType='submit'
                className={status === 2 ? 'fail-button' : ''}
                loading={statusLoading}
                onClick={handleSetFailStatus}
              >
                审核不通过
              </Button>
              <Button
                disabled={!(status === 2)}
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
              disabled={!(status === 2)}
              autoSize={{ minRows: 3, maxRows: 6 }}
              maxLength='800'
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
