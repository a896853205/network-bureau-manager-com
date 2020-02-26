import React, { useState, useEffect } from 'react';

// 工具
import statusToColor from '@/components/home/project-manager/registration-detail/util/status-to-color';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 请求
import proxyFetch from '@/util/request';
import {
  SELECT_REGISTRATION_APPLY,
  SET_REGISTRATION_DETAIL_SUCCESS_STATUS,
  SET_REGISTRATION_DETAIL_FAIL_STATUS
} from '@/constants/api-constants';

// 样式
import {
  Descriptions,
  Tag,
  Icon,
  Button,
  Input,
  Skeleton,
  message
} from 'antd';
import '@/style/home/project-manager/apply.styl';
const { TextArea } = Input;

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [registrationApply, setRegistrationApply] = useState(null),
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

      await proxyFetch(SET_REGISTRATION_DETAIL_SUCCESS_STATUS, {
        registrationUuid: enterpriseRegistrationUuid,
        type: 'apply',
        status: 100
      });

      setStatusLoading(false);
      dispatch(enterpriseAction.asyncSetSteps(enterpriseRegistrationUuid));
      history.push(HOME_REGISTRATION_PROFILE.path);
    })();
  };

  const handleSetFailStatus = () => {
    if (failText) {
      (async () => {
        setStatusLoading(true);

        await proxyFetch(SET_REGISTRATION_DETAIL_FAIL_STATUS, {
          registrationUuid: enterpriseRegistrationUuid,
          type: 'apply',
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

        let registrationApply = await proxyFetch(
          SELECT_REGISTRATION_APPLY,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        if (registrationApply) {
          setStatus(registrationApply.status);
          setStatusText(registrationApply.statusText);
        }

        setRegistrationApply(registrationApply);
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
          现场测试申请表
          <Tag className='content-tag' color={statusToColor(status)}>
            {statusText}
          </Tag>
        </p>
      </div>
      <Skeleton loading={getDataLoading}>
        {registrationApply ? (
          <div className='detail-apply-box'>
            <Descriptions bordered className='apply-description-box'>
              <Descriptions.Item label='内容' span={3}>
                <div className='registration-apply-content'>
                  {registrationApply.content}
                </div>
              </Descriptions.Item>
            </Descriptions>
            <div className='apply-button-box'>
              <Button
                disabled={!(status === 1)}
                type='danger'
                htmlType='submit'
                className={status === 1 ? 'fail-button' : ''}
                loading={statusLoading}
                onClick={handleSetFailStatus}
              >
                审核不通过
              </Button>
              <Button
                disabled={!(status === 1)}
                type='primary'
                htmlType='submit'
                className={status === 1 ? 'success-button' : ''}
                loading={statusLoading}
                onClick={handleSetSuccessStatus}
              >
                审核通过
              </Button>
            </div>
            <TextArea
              disabled={!(status === 1)}
              autoSize={{ minRows: 3, maxRows: 6 }}
              maxLength='800'
              placeholder='请输入审核不通过理由'
              className='apply-textArea-box'
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
