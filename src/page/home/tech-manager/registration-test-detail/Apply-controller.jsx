import React, { useState, useEffect } from 'react';

// 路由
import { HOME_REGISTRATION_TEST_PROFILE } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// 请求
import proxyFetch from '@/util/request';
import {
  GET_TECH_REGISTRATION_TEST_APPLY,
  SET_TECH_APPLY_MANAGER_STATUS,
  SET_TECH_APPLY_MANAGER_FAIL_STATUS
} from '@/constants/api-constants';

// 样式
import { Descriptions, Icon, Button, Input, Skeleton, message } from 'antd';
import '@/style/home/tech-manager/apply.styl';
const { TextArea } = Input;

export default props => {
  const { enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [registrationApply, setRegistrationApply] = useState(null),
    [getDataLoading, setGetDataLoading] = useState(false),
    [statusLoading, setStatusLoading] = useState(false),
    [failManagerText, setFailManagerText] = useState(''),
    [managerStatus, setManagerStatus] = useState(0),
    history = useHistory();

  const handleSetSuccessStatus = () => {
    (async () => {
      setStatusLoading(true);

      await proxyFetch(SET_TECH_APPLY_MANAGER_STATUS, {
        registrationUuid: enterpriseRegistrationUuid
      });

      setStatusLoading(false);
      history.push(HOME_REGISTRATION_TEST_PROFILE.path);
    })();
  };

  const handleSetFailStatus = () => {
    if (failManagerText) {
      (async () => {
        setStatusLoading(true);

        const res = await proxyFetch(SET_TECH_APPLY_MANAGER_FAIL_STATUS, {
          registrationUuid: enterpriseRegistrationUuid,
          failManagerText
        });

        setStatusLoading(false);
        if (res) {
          history.push(HOME_REGISTRATION_TEST_PROFILE.path);
        }
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
          GET_TECH_REGISTRATION_TEST_APPLY,
          { registrationUuid: enterpriseRegistrationUuid },
          'GET'
        );

        if (registrationApply) {
          setManagerStatus(registrationApply.managerStatus);
        }

        setRegistrationApply(registrationApply);
        setGetDataLoading(false);
      })();
    }
  }, [enterpriseRegistrationUuid]);

  return (
    <div className='item-box'>
      <p className='title-box'>
        <span>技术人员确认</span>
      </p>
      <div className='subtitle-box'>
        <Link to={`${HOME_REGISTRATION_TEST_PROFILE.path}`}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>现场测试申请表</p>
      </div>
      <Skeleton loading={getDataLoading}>
        {registrationApply ? (
          <div className='test-apply-box'>
            <Descriptions bordered className='apply-description-box'>
              <Descriptions.Item label='内容' span={3}>
                <div className='registration-apply-content'>
                  {registrationApply.content}
                </div>
              </Descriptions.Item>
            </Descriptions>
            <div className='apply-button-box'>
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
              maxLength='800'
              placeholder='请输入审核不通过理由'
              className='apply-textArea-box'
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
